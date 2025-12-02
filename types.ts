
export type UserRole = 'CUSTOMER' | 'ADMIN' | 'DRIVER';

export type DeliveryStatus = 'DRAFT' | 'PENDING_PAYMENT' | 'PROCESSING' | 'PRINTING' | 'AT_DEPOT' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ISSUE_REPORTED';

export type SLATier = 'STANDARD' | 'EXPRESS' | 'PRIORITY_SAME_DAY';
export type ServiceType = 'DISTRIBUTION_ONLY' | 'PRINT_AND_DISTRIBUTE';

export interface FlyerDetails {
  size: 'Rack Card' | 'A5' | 'A4' | 'Door Hanger' | 'Custom' | 'Postcard' | 'Brochure';
  finish: 'Standard' | 'Glossy' | 'Matte' | 'UV Coated' | 'Recycled';
  quantity: number;
  type: 'Door-to-Door' | 'Mailbox' | 'Handout' | 'Canada Post';
  distributionDate: string;
  uploadedFile?: string;
  targetAudience?: 'Residential' | 'Commercial' | 'Mixed';
  serviceType: ServiceType;
  slaTier: SLATier;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Area {
  id: string;
  name: string;
  postalCodePrefix: string;
  households: number;
  baseCost: number;
  coordinates: string; // SVG path data
  center: GeoPoint;
  density: 'High' | 'Medium' | 'Low';
  householdIncome?: string; // Demographic data for enterprise
}

export interface Driver {
  id: string;
  name: string;
  status: 'IDLE' | 'BUSY' | 'OFFLINE';
  currentLocation: GeoPoint;
  assignedOrderId?: string;
  rating: number;
  phone: string;
  vehicleType?: 'Van' | 'Car' | 'Bike' | 'Walker';
  onboardingStatus?: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  completedJobs?: number;
  slaScore?: number;
}

export interface OrderTimelineEvent {
  status: DeliveryStatus;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  flyerDetails: FlyerDetails;
  selectedAreas: string[];
  costBreakdown: {
    distribution: number;
    printing: number;
    rushFee: number;
    fuelSurcharge: number;
    tax: number;
    total: number;
  };
  status: DeliveryStatus;
  createdAt: string;
  assignedDriverId?: string;
  progress: number; // 0-100
  timeline: OrderTimelineEvent[];
  proofOfDelivery?: {
    images: string[];
    timestamp: string;
    completionPercentage: number;
    deliveredCount: number;
    verifiedByAI: boolean;
  };
}

export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_KYC';
  creditLimit: number;
  currentBalance: number;
  totalOrders: number;
  rating: number; // 1-5
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';
  issueDate: string;
  dueDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'VIEWER';
  status: 'ACTIVE' | 'INVITED';
}

export interface ExceptionReport {
  id: string;
  orderId: string;
  driverId: string;
  type: 'ACCESS_DENIED' | 'BAD_ADDRESS' | 'WEATHER' | 'SAFETY_HAZARD' | 'OTHER';
  description: string;
  location: GeoPoint;
  timestamp: string;
  status: 'OPEN' | 'RESOLVED' | 'INVESTIGATING';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'POD' | 'INCIDENT' | 'RECEIPT';
  timestamp: string;
  location: GeoPoint;
  driverId: string;
  orderId: string;
  aiFlagged: boolean; // Fraud detection
  aiReason?: string;
}

export interface AIInsight {
  title: string;
  content: string;
  recommendationLevel: 'High' | 'Medium' | 'Low';
  timestamp?: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'FINANCIAL' | 'OPERATIONAL' | 'SLA';
  generatedAt: string;
  format: 'PDF' | 'CSV';
}

export interface ReportSchedule {
  id: string;
  reportType: 'FINANCIAL' | 'OPERATIONAL' | 'SLA';
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  recipients: string[];
  nextRun: string;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'SUPPORT' | 'SYSTEM';
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  timestamp: string;
  read: boolean;
}

export interface AIModuleConfig {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'TRAINING';
  confidenceThreshold: number;
  lastActive: string;
  description: string;
}

export interface AIDecisionLog {
  id: string;
  moduleId: string;
  action: string;
  reason: string;
  timestamp: string;
  outcome: 'SUCCESS' | 'FAILURE' | 'OVERRIDDEN';
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: string;
  action: string;
}

export interface ShiftHistoryItem {
  id: string;
  date: string;
  duration: string;
  flyersDelivered: number;
  earnings: number;
  rating: number;
}
