import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  userType: text("user_type").notNull(), // "lender" or "business"
  createdAt: timestamp("created_at").defaultNow(),
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
  yearFounded: integer("year_founded"),
  employeeCount: integer("employee_count"),
  ownerName: text("owner_name"),
  ownerRole: text("owner_role"),
});

export const loanOpportunities = pgTable("loan_opportunities", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  term: integer("term").notNull(), // in months
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }).notNull(), // percentage
  purpose: text("purpose").notNull(),
  riskLevel: text("risk_level").notNull(),
  status: text("status").notNull().default("active"), // "active", "funded", "closed"
  progressAmount: decimal("progress_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  lenderId: integer("lender_id").notNull().references(() => users.id),
  opportunityId: integer("opportunity_id").notNull().references(() => loanOpportunities.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("active"), // "active", "repaid", "late", "defaulted"
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityActivities = pgTable("community_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  opportunityId: integer("opportunity_id").references(() => loanOpportunities.id),
  activityType: text("activity_type").notNull(), // "funded", "funded_complete", "repaid", etc.
  amount: decimal("amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const educationalResources = pgTable("educational_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  resourceType: text("resource_type").notNull(), // "guide", "video", "case_study"
  imageUrl: text("image_url"),
  link: text("link").notNull(),
});

// Insert schemas and types
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  userType: true,
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
});

export const insertLoanOpportunitySchema = createInsertSchema(loanOpportunities).omit({
  id: true,
  progressAmount: true,
  createdAt: true,
});

export const insertLoanSchema = createInsertSchema(loans).omit({
  id: true,
  createdAt: true,
});

export const insertCommunityActivitySchema = createInsertSchema(communityActivities).omit({
  id: true,
  createdAt: true,
});

export const insertEducationalResourceSchema = createInsertSchema(educationalResources).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;

export type InsertLoanOpportunity = z.infer<typeof insertLoanOpportunitySchema>;
export type LoanOpportunity = typeof loanOpportunities.$inferSelect;

export type InsertLoan = z.infer<typeof insertLoanSchema>;
export type Loan = typeof loans.$inferSelect;

export type InsertCommunityActivity = z.infer<typeof insertCommunityActivitySchema>;
export type CommunityActivity = typeof communityActivities.$inferSelect;

export type InsertEducationalResource = z.infer<typeof insertEducationalResourceSchema>;
export type EducationalResource = typeof educationalResources.$inferSelect;
