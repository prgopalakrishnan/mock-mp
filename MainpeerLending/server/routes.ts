import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBusinessSchema, insertLoanOpportunitySchema, insertLoanSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Business API routes
  app.post("/api/businesses", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.userType !== "business") return res.status(403).json({ message: "Only business users can create a business profile" });

    try {
      const data = insertBusinessSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const existingBusiness = await storage.getBusinessByUserId(req.user.id);
      if (existingBusiness) {
        return res.status(400).json({ message: "Business profile already exists" });
      }
      
      const business = await storage.createBusiness(data);
      return res.status(201).json(business);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid business data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create business profile" });
    }
  });

  app.get("/api/businesses/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid business ID" });
    
    try {
      const business = await storage.getBusiness(id);
      if (!business) return res.status(404).json({ message: "Business not found" });
      
      return res.json(business);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve business" });
    }
  });

  app.get("/api/users/:userId/business", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });
    
    try {
      const business = await storage.getBusinessByUserId(userId);
      if (!business) return res.status(404).json({ message: "Business not found" });
      
      return res.json(business);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve business" });
    }
  });

  // Loan Opportunities API routes
  app.get("/api/loan-opportunities", async (req, res) => {
    try {
      const opportunities = await storage.getLoanOpportunities();
      return res.json(opportunities);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve loan opportunities" });
    }
  });

  app.get("/api/loan-opportunities/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid opportunity ID" });
    
    try {
      const opportunity = await storage.getLoanOpportunity(id);
      if (!opportunity) return res.status(404).json({ message: "Loan opportunity not found" });
      
      return res.json(opportunity);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve loan opportunity" });
    }
  });

  app.post("/api/loan-opportunities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.userType !== "business") return res.status(403).json({ message: "Only business users can create loan opportunities" });
    
    try {
      const business = await storage.getBusinessByUserId(req.user.id);
      if (!business) return res.status(404).json({ message: "Business profile not found" });
      
      const data = insertLoanOpportunitySchema.parse({
        ...req.body,
        businessId: business.id
      });
      
      const opportunity = await storage.createLoanOpportunity(data);
      return res.status(201).json(opportunity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid loan opportunity data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create loan opportunity" });
    }
  });

  // Loans API routes
  app.get("/api/users/:userId/loans", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const userId = parseInt(req.params.userId);
    if (isNaN(userId) || userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });
    
    try {
      const loans = await storage.getLoansByLenderId(userId);
      return res.json(loans);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve loans" });
    }
  });

  app.post("/api/loans", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.userType !== "lender") return res.status(403).json({ message: "Only lenders can create loans" });
    
    try {
      const data = insertLoanSchema.parse({
        ...req.body,
        lenderId: req.user.id
      });
      
      // Check if opportunity exists and is still active
      const opportunity = await storage.getLoanOpportunity(data.opportunityId);
      if (!opportunity) return res.status(404).json({ message: "Loan opportunity not found" });
      if (opportunity.status !== "active") return res.status(400).json({ message: "This opportunity is no longer accepting loans" });
      
      // Check if amount is available in the opportunity
      const progressAmount = parseFloat(opportunity.progressAmount.toString());
      const totalAmount = parseFloat(opportunity.amount.toString());
      const loanAmount = parseFloat(data.amount.toString());
      
      if (progressAmount + loanAmount > totalAmount) {
        return res.status(400).json({ message: "Loan amount exceeds remaining available amount" });
      }
      
      const loan = await storage.createLoan(data);
      
      // Create community activity for this loan
      await storage.createCommunityActivity({
        userId: req.user.id,
        opportunityId: data.opportunityId,
        activityType: "funded",
        amount: data.amount
      });
      
      // Check if opportunity is now fully funded
      const updatedOpportunity = await storage.getLoanOpportunity(data.opportunityId);
      if (updatedOpportunity?.status === "funded") {
        // Create a funded_complete activity
        await storage.createCommunityActivity({
          opportunityId: data.opportunityId,
          activityType: "funded_complete",
          amount: updatedOpportunity.amount
        });
      }
      
      return res.status(201).json(loan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid loan data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create loan" });
    }
  });

  // Community Activities API route
  app.get("/api/community-activities", async (req, res) => {
    try {
      const activities = await storage.getCommunityActivities();
      return res.json(activities);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve community activities" });
    }
  });

  // Educational Resources API route
  app.get("/api/educational-resources", async (req, res) => {
    try {
      const resources = await storage.getEducationalResources();
      return res.json(resources);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve educational resources" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
