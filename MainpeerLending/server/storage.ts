import { 
  users, type User, type InsertUser,
  businesses, type Business, type InsertBusiness,
  loanOpportunities, type LoanOpportunity, type InsertLoanOpportunity,
  loans, type Loan, type InsertLoan,
  communityActivities, type CommunityActivity, type InsertCommunityActivity,
  educationalResources, type EducationalResource, type InsertEducationalResource 
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Business methods
  getBusiness(id: number): Promise<Business | undefined>;
  getBusinessByUserId(userId: number): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(id: number, data: Partial<InsertBusiness>): Promise<Business | undefined>;
  
  // Loan Opportunity methods
  getLoanOpportunity(id: number): Promise<LoanOpportunity | undefined>;
  getLoanOpportunities(): Promise<LoanOpportunity[]>;
  getLoanOpportunitiesByBusinessId(businessId: number): Promise<LoanOpportunity[]>;
  createLoanOpportunity(opportunity: InsertLoanOpportunity): Promise<LoanOpportunity>;
  updateLoanOpportunity(id: number, data: Partial<InsertLoanOpportunity>): Promise<LoanOpportunity | undefined>;
  
  // Loan methods
  getLoan(id: number): Promise<Loan | undefined>;
  getLoansByLenderId(lenderId: number): Promise<Loan[]>;
  getLoansByOpportunityId(opportunityId: number): Promise<Loan[]>;
  createLoan(loan: InsertLoan): Promise<Loan>;
  updateLoan(id: number, data: Partial<InsertLoan>): Promise<Loan | undefined>;
  
  // Community Activity methods
  getCommunityActivities(): Promise<CommunityActivity[]>;
  createCommunityActivity(activity: InsertCommunityActivity): Promise<CommunityActivity>;
  
  // Educational Resource methods
  getEducationalResources(): Promise<EducationalResource[]>;
  createEducationalResource(resource: InsertEducationalResource): Promise<EducationalResource>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private businesses: Map<number, Business>;
  private loanOpportunities: Map<number, LoanOpportunity>;
  private loans: Map<number, Loan>;
  private communityActivities: Map<number, CommunityActivity>;
  private educationalResources: Map<number, EducationalResource>;
  
  currentUserId: number;
  currentBusinessId: number;
  currentOpportunityId: number;
  currentLoanId: number;
  currentActivityId: number;
  currentResourceId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.businesses = new Map();
    this.loanOpportunities = new Map();
    this.loans = new Map();
    this.communityActivities = new Map();
    this.educationalResources = new Map();
    
    this.currentUserId = 1;
    this.currentBusinessId = 1;
    this.currentOpportunityId = 1;
    this.currentLoanId = 1;
    this.currentActivityId = 1;
    this.currentResourceId = 1;
    
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize with sample educational resources
    this.initializeEducationalResources();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Business methods
  async getBusiness(id: number): Promise<Business | undefined> {
    return this.businesses.get(id);
  }
  
  async getBusinessByUserId(userId: number): Promise<Business | undefined> {
    return Array.from(this.businesses.values()).find(
      (business) => business.userId === userId,
    );
  }
  
  async createBusiness(insertBusiness: InsertBusiness): Promise<Business> {
    const id = this.currentBusinessId++;
    const business: Business = { ...insertBusiness, id };
    this.businesses.set(id, business);
    return business;
  }
  
  async updateBusiness(id: number, data: Partial<InsertBusiness>): Promise<Business | undefined> {
    const business = this.businesses.get(id);
    if (!business) return undefined;
    
    const updated = { ...business, ...data };
    this.businesses.set(id, updated);
    return updated;
  }
  
  // Loan Opportunity methods
  async getLoanOpportunity(id: number): Promise<LoanOpportunity | undefined> {
    return this.loanOpportunities.get(id);
  }
  
  async getLoanOpportunities(): Promise<LoanOpportunity[]> {
    return Array.from(this.loanOpportunities.values());
  }
  
  async getLoanOpportunitiesByBusinessId(businessId: number): Promise<LoanOpportunity[]> {
    return Array.from(this.loanOpportunities.values()).filter(
      (opportunity) => opportunity.businessId === businessId,
    );
  }
  
  async createLoanOpportunity(insertOpportunity: InsertLoanOpportunity): Promise<LoanOpportunity> {
    const id = this.currentOpportunityId++;
    const opportunity: LoanOpportunity = { 
      ...insertOpportunity, 
      id, 
      progressAmount: "0", 
      createdAt: new Date() 
    };
    this.loanOpportunities.set(id, opportunity);
    return opportunity;
  }
  
  async updateLoanOpportunity(id: number, data: Partial<InsertLoanOpportunity>): Promise<LoanOpportunity | undefined> {
    const opportunity = this.loanOpportunities.get(id);
    if (!opportunity) return undefined;
    
    const updated = { ...opportunity, ...data };
    this.loanOpportunities.set(id, updated);
    return updated;
  }
  
  // Loan methods
  async getLoan(id: number): Promise<Loan | undefined> {
    return this.loans.get(id);
  }
  
  async getLoansByLenderId(lenderId: number): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.lenderId === lenderId,
    );
  }
  
  async getLoansByOpportunityId(opportunityId: number): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.opportunityId === opportunityId,
    );
  }
  
  async createLoan(insertLoan: InsertLoan): Promise<Loan> {
    const id = this.currentLoanId++;
    const loan: Loan = { ...insertLoan, id, createdAt: new Date() };
    this.loans.set(id, loan);
    
    // Update loan opportunity progress amount
    const opportunity = this.loanOpportunities.get(insertLoan.opportunityId);
    if (opportunity) {
      const currentProgress = parseFloat(opportunity.progressAmount.toString());
      const newAmount = parseFloat(insertLoan.amount.toString());
      const updatedProgress = (currentProgress + newAmount).toString();
      
      opportunity.progressAmount = updatedProgress;
      
      // Check if fully funded
      const totalAmount = parseFloat(opportunity.amount.toString());
      if (parseFloat(updatedProgress) >= totalAmount) {
        opportunity.status = "funded";
      }
      
      this.loanOpportunities.set(opportunity.id, opportunity);
    }
    
    return loan;
  }
  
  async updateLoan(id: number, data: Partial<InsertLoan>): Promise<Loan | undefined> {
    const loan = this.loans.get(id);
    if (!loan) return undefined;
    
    const updated = { ...loan, ...data };
    this.loans.set(id, updated);
    return updated;
  }
  
  // Community Activity methods
  async getCommunityActivities(): Promise<CommunityActivity[]> {
    return Array.from(this.communityActivities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createCommunityActivity(insertActivity: InsertCommunityActivity): Promise<CommunityActivity> {
    const id = this.currentActivityId++;
    const activity: CommunityActivity = { ...insertActivity, id, createdAt: new Date() };
    this.communityActivities.set(id, activity);
    return activity;
  }
  
  // Educational Resource methods
  async getEducationalResources(): Promise<EducationalResource[]> {
    return Array.from(this.educationalResources.values());
  }
  
  async createEducationalResource(insertResource: InsertEducationalResource): Promise<EducationalResource> {
    const id = this.currentResourceId++;
    const resource: EducationalResource = { ...insertResource, id };
    this.educationalResources.set(id, resource);
    return resource;
  }
  
  // Initialize sample educational resources
  private initializeEducationalResources() {
    const resources: InsertEducationalResource[] = [
      {
        title: "Understanding P2P Lending Risks",
        description: "Learn about the potential risks of peer-to-peer lending and how to mitigate them.",
        resourceType: "guide",
        imageUrl: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "/learn/p2p-lending-risks",
      },
      {
        title: "How to Evaluate Business Opportunities",
        description: "Our 10-minute video guide to assessing small business lending opportunities.",
        resourceType: "video",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "/learn/evaluate-opportunities",
      },
      {
        title: "Success Story: Main Street Revival",
        description: "How community lending helped revitalize a small town's business district.",
        resourceType: "case_study",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        link: "/learn/success-stories/main-street-revival",
      }
    ];
    
    resources.forEach(resource => {
      this.createEducationalResource(resource);
    });
  }
}

export const storage = new MemStorage();
