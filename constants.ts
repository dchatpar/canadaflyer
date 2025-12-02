
import { Area, Order, Driver, ChatMessage, Notification, Customer, Invoice, MediaItem, Report, AIInsight, ReportSchedule, Transaction, TeamMember, ExceptionReport, AIModuleConfig, AIDecisionLog, AutomationRule, ShiftHistoryItem } from './types';

export const FLYER_SIZES = ['Rack Card', 'A5', 'A4', 'Door Hanger', 'Postcard', 'Brochure', 'Custom'];
export const DISTRIBUTION_TYPES = ['Door-to-Door', 'Mailbox', 'Handout', 'Canada Post'];
export const FINISH_TYPES = ['Standard', 'Glossy', 'Matte', 'UV Coated', 'Recycled'];

export const PRICING = {
  baseRatePerFlyer: 0.15,
  printingBaseRate: 0.08, // Cost to print one flyer
  fuelSurchargePercent: 0.05,
  taxRate: 0.13, // HST default
  finishMultipliers: {
    'Standard': 1,
    'Recycled': 1.1,
    'Glossy': 1.2,
    'Matte': 1.2,
    'UV Coated': 1.5
  },
  slaMultipliers: {
    'STANDARD': 1,
    'EXPRESS': 1.5, // 50% markup
    'PRIORITY_SAME_DAY': 2.5 // 150% markup
  }
};

export const MOCK_AREAS: Area[] = [
  {
    id: 'area-1',
    name: 'Downtown Core',
    postalCodePrefix: 'M5V',
    households: 12500,
    baseCost: 0.20,
    coordinates: "M10,10 L90,10 L90,90 L10,90 Z",
    center: { lat: 43.6532, lng: -79.3832 },
    density: 'High',
    householdIncome: '$95,000'
  },
  {
    id: 'area-2',
    name: 'West End / High Park',
    postalCodePrefix: 'M6P',
    households: 8200,
    baseCost: 0.18,
    coordinates: "M100,10 L180,10 L180,90 L100,90 Z",
    center: { lat: 43.6532, lng: -79.4832 },
    density: 'Medium',
    householdIncome: '$110,000'
  },
  {
    id: 'area-3',
    name: 'North York',
    postalCodePrefix: 'M2N',
    households: 15400,
    baseCost: 0.16,
    coordinates: "M10,100 L90,100 L90,180 L10,180 Z",
    center: { lat: 43.7615, lng: -79.4111 },
    density: 'High',
    householdIncome: '$85,000'
  },
  {
    id: 'area-4',
    name: 'Scarborough',
    postalCodePrefix: 'M1B',
    households: 11000,
    baseCost: 0.15,
    coordinates: "M100,100 L180,100 L180,180 L100,180 Z",
    center: { lat: 43.7764, lng: -79.2318 },
    density: 'Medium',
    householdIncome: '$72,000'
  },
  {
    id: 'area-5',
    name: 'Etobicoke',
    postalCodePrefix: 'M9C',
    households: 9500,
    baseCost: 0.17,
    coordinates: "M190,10 L270,10 L270,90 L190,90 Z",
    center: { lat: 43.6205, lng: -79.5132 },
    density: 'Low',
    householdIncome: '$98,000'
  }
];

export const MOCK_DRIVERS: Driver[] = [
  { id: 'dr-1', name: 'Mike D.', status: 'BUSY', currentLocation: { lat: 43.65, lng: -79.38 }, assignedOrderId: 'ORD-2023-002', rating: 4.8, phone: '416-555-0101', vehicleType: 'Van', onboardingStatus: 'ACTIVE', completedJobs: 142, slaScore: 98 },
  { id: 'dr-2', name: 'Sarah J.', status: 'IDLE', currentLocation: { lat: 43.70, lng: -79.40 }, rating: 4.9, phone: '647-555-0123', vehicleType: 'Car', onboardingStatus: 'ACTIVE', completedJobs: 89, slaScore: 99 },
  { id: 'dr-3', name: 'Ahmed K.', status: 'OFFLINE', currentLocation: { lat: 43.75, lng: -79.35 }, rating: 4.7, phone: '905-555-0199', vehicleType: 'Bike', onboardingStatus: 'ACTIVE', completedJobs: 210, slaScore: 95 },
  { id: 'dr-4', name: 'Jenny L.', status: 'IDLE', currentLocation: { lat: 43.62, lng: -79.51 }, rating: 4.2, phone: '416-555-9988', vehicleType: 'Walker', onboardingStatus: 'PENDING', completedJobs: 5, slaScore: 80 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cust-1', companyName: 'Pizza Nova', contactName: 'Mario Rossi', email: 'mario@pizzanova.com', phone: '416-555-1111', status: 'ACTIVE', creditLimit: 10000, currentBalance: 1008.53, totalOrders: 12, rating: 5 },
  { id: 'cust-2', companyName: 'Real Estate Pros', contactName: 'Linda Smith', email: 'linda@remax.com', phone: '647-555-2222', status: 'ACTIVE', creditLimit: 25000, currentBalance: 2135.70, totalOrders: 45, rating: 4.8 },
  { id: 'cust-3', companyName: 'City Council', contactName: 'Admin Dept', email: 'admin@toronto.ca', phone: '416-338-0000', status: 'ACTIVE', creditLimit: 100000, currentBalance: 0, totalOrders: 3, rating: 5 },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-9921', customerId: 'cust-1', customerName: 'Pizza Nova', amount: 1008.53, status: 'PAID', issueDate: '2023-10-20', dueDate: '2023-11-20' },
  { id: 'INV-9922', customerId: 'cust-2', customerName: 'Real Estate Pros', amount: 2135.70, status: 'PENDING', issueDate: '2023-10-22', dueDate: '2023-11-22' },
  { id: 'INV-9923', customerId: 'cust-1', customerName: 'Pizza Nova', amount: 540.00, status: 'OVERDUE', issueDate: '2023-09-15', dueDate: '2023-10-15' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX-1001', date: '2023-10-22', description: 'Campaign Payment - ORD-2023-001', amount: 1008.53, type: 'DEBIT', status: 'COMPLETED' },
  { id: 'TX-1002', date: '2023-10-15', description: 'Wallet Top-up', amount: 5000.00, type: 'CREDIT', status: 'COMPLETED' },
  { id: 'TX-1003', date: '2023-10-01', description: 'Monthly Subscription', amount: 49.99, type: 'DEBIT', status: 'COMPLETED' },
];

export const MOCK_TEAM: TeamMember[] = [
  { id: 'tm-1', name: 'Mario Rossi', email: 'mario@pizzanova.com', role: 'ADMIN', status: 'ACTIVE' },
  { id: 'tm-2', name: 'Luigi Verde', email: 'luigi@pizzanova.com', role: 'VIEWER', status: 'INVITED' },
];

export const MOCK_MEDIA: MediaItem[] = [
  { id: 'media-1', url: 'https://picsum.photos/400/300?random=1', type: 'POD', timestamp: '2023-10-25T14:30:00Z', location: { lat: 43.65, lng: -79.38 }, driverId: 'dr-1', orderId: 'ORD-2023-001', aiFlagged: false },
  { id: 'media-2', url: 'https://picsum.photos/400/300?random=2', type: 'POD', timestamp: '2023-10-25T14:35:00Z', location: { lat: 43.651, lng: -79.381 }, driverId: 'dr-1', orderId: 'ORD-2023-001', aiFlagged: false },
  { id: 'media-3', url: 'https://picsum.photos/400/300?random=10', type: 'POD', timestamp: '2023-10-28T09:15:00Z', location: { lat: 43.70, lng: -79.40 }, driverId: 'dr-2', orderId: 'ORD-2023-002', aiFlagged: true, aiReason: 'Image too dark' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'rep-1', title: 'October Revenue Summary', type: 'FINANCIAL', generatedAt: '2023-11-01', format: 'PDF' },
  { id: 'rep-2', title: 'Driver SLA Performance Q3', type: 'SLA', generatedAt: '2023-10-01', format: 'CSV' },
  { id: 'rep-3', title: 'Coverage Heatmap Analysis', type: 'OPERATIONAL', generatedAt: '2023-10-15', format: 'PDF' },
];

export const MOCK_REPORT_SCHEDULES: ReportSchedule[] = [
  { id: 'sch-1', reportType: 'FINANCIAL', frequency: 'MONTHLY', recipients: ['finance@canflyer.com'], nextRun: '2023-12-01', active: true },
  { id: 'sch-2', reportType: 'SLA', frequency: 'WEEKLY', recipients: ['ops@canflyer.com', 'admin@canflyer.com'], nextRun: '2023-11-06', active: true },
];

export const MOCK_EXCEPTIONS: ExceptionReport[] = [
  { id: 'EX-1', orderId: 'ORD-2023-002', driverId: 'dr-2', type: 'ACCESS_DENIED', description: 'Gated community code changed. Cannot enter.', location: { lat: 43.70, lng: -79.40 }, timestamp: '2023-10-28T09:30:00Z', status: 'OPEN', severity: 'HIGH' },
  { id: 'EX-2', orderId: 'ORD-2023-001', driverId: 'dr-1', type: 'WEATHER', description: 'Heavy rain, pausing distribution for 30 mins.', location: { lat: 43.65, lng: -79.38 }, timestamp: '2023-10-25T11:00:00Z', status: 'RESOLVED', severity: 'MEDIUM' },
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  { title: 'High Demand Zone Detected', content: 'Postal Code M5V shows 20% increase in flyer engagement.', recommendationLevel: 'High', timestamp: '2h ago' },
  { title: 'Driver Efficiency', content: 'Driver Mike D. is completing routes 15% faster than average.', recommendationLevel: 'Medium', timestamp: '5h ago' },
  { title: 'Retention Risk', content: 'Customer "Local Gym" hasn\'t ordered in 60 days.', recommendationLevel: 'High', timestamp: '1d ago' },
];

export const MOCK_AI_MODULES: AIModuleConfig[] = [
  { id: 'mod-1', name: 'Route Optimizer', status: 'ACTIVE', confidenceThreshold: 0.95, lastActive: '1m ago', description: 'Real-time traffic rerouting and density clustering.' },
  { id: 'mod-2', name: 'Fraud Detection', status: 'ACTIVE', confidenceThreshold: 0.88, lastActive: '30s ago', description: 'Analyzes POD images for anomalies and GPS mismatches.' },
  { id: 'mod-3', name: 'Demand Forecasting', status: 'TRAINING', confidenceThreshold: 0.70, lastActive: '12h ago', description: 'Predicts future order volumes per zone.' },
];

export const MOCK_DECISION_LOGS: AIDecisionLog[] = [
  { id: 'log-1', moduleId: 'mod-1', action: 'Reroute Driver', reason: 'Traffic jam detected on Hwy 401', timestamp: '2023-10-28T09:12:00Z', outcome: 'SUCCESS' },
  { id: 'log-2', moduleId: 'mod-2', action: 'Flag POD', reason: 'Image too dark, GPS variance > 20m', timestamp: '2023-10-28T09:15:00Z', outcome: 'SUCCESS' },
  { id: 'log-3', moduleId: 'mod-1', action: 'Assign Job', reason: 'Driver closest to depot', timestamp: '2023-10-28T08:30:00Z', outcome: 'OVERRIDDEN' },
];

export const MOCK_RULES: AutomationRule[] = [
  { id: 'rule-1', name: 'Auto-Assign High Priority', description: 'Automatically assign Rush orders to drivers with >98% SLA score.', enabled: true, trigger: 'New Order (Express)', action: 'Assign Driver' },
  { id: 'rule-2', name: 'Weather Pause', description: 'Suspend routing if local precipitation > 10mm/h.', enabled: false, trigger: 'Weather API Alert', action: 'Pause Campaign' },
];

export const MOCK_SHIFT_HISTORY: ShiftHistoryItem[] = [
  { id: 'shift-1', date: 'Oct 28, 2023', duration: '6.5 Hours', flyersDelivered: 1200, earnings: 145.00, rating: 5 },
  { id: 'shift-2', date: 'Oct 27, 2023', duration: '5.0 Hours', flyersDelivered: 950, earnings: 112.50, rating: 4.8 },
  { id: 'shift-3', date: 'Oct 25, 2023', duration: '7.2 Hours', flyersDelivered: 1500, earnings: 180.00, rating: 4.9 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2023-001',
    customerName: 'Pizza Nova',
    flyerDetails: {
      size: 'A5',
      finish: 'Glossy',
      quantity: 5000,
      type: 'Door-to-Door',
      distributionDate: '2023-10-25',
      targetAudience: 'Residential',
      serviceType: 'PRINT_AND_DISTRIBUTE',
      slaTier: 'STANDARD'
    },
    selectedAreas: ['area-1'],
    costBreakdown: {
      distribution: 600,
      printing: 250,
      rushFee: 0,
      fuelSurcharge: 42.50,
      tax: 116.03,
      total: 1008.53
    },
    status: 'COMPLETED',
    createdAt: '2023-10-20',
    progress: 100,
    assignedDriverId: 'dr-1',
    timeline: [
      { status: 'PENDING_PAYMENT', timestamp: '2023-10-20T10:00:00Z', description: 'Order created', completed: true },
      { status: 'PRINTING', timestamp: '2023-10-21T09:00:00Z', description: 'Flyers sent to print shop', completed: true },
      { status: 'DISPATCHED', timestamp: '2023-10-25T08:00:00Z', description: 'Driver Mike D. assigned', completed: true },
      { status: 'COMPLETED', timestamp: '2023-10-25T16:00:00Z', description: 'Delivery verified', completed: true },
    ],
    proofOfDelivery: {
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2'
      ],
      timestamp: '2023-10-25T14:30:00Z',
      completionPercentage: 100,
      deliveredCount: 5000,
      verifiedByAI: true
    }
  },
  {
    id: 'ORD-2023-002',
    customerName: 'Real Estate Pros',
    flyerDetails: {
      size: 'Rack Card',
      finish: 'Matte',
      quantity: 10000,
      type: 'Mailbox',
      distributionDate: '2023-10-28',
      serviceType: 'DISTRIBUTION_ONLY',
      slaTier: 'EXPRESS'
    },
    selectedAreas: ['area-2', 'area-5'],
    costBreakdown: {
      distribution: 1600,
      printing: 0,
      rushFee: 200,
      fuelSurcharge: 90,
      tax: 245.7,
      total: 2135.70
    },
    status: 'IN_PROGRESS',
    createdAt: '2023-10-22',
    progress: 45,
    assignedDriverId: 'dr-2',
    timeline: [
      { status: 'PENDING_PAYMENT', timestamp: '2023-10-22T14:00:00Z', description: 'Order created', completed: true },
      { status: 'AT_DEPOT', timestamp: '2023-10-27T10:00:00Z', description: 'Flyers received at depot', completed: true },
      { status: 'IN_PROGRESS', timestamp: '2023-10-28T09:00:00Z', description: 'Distribution started', completed: true },
    ],
    proofOfDelivery: {
      images: [
        'https://picsum.photos/400/300?random=3'
      ],
      timestamp: '2023-10-28T09:15:00Z',
      completionPercentage: 45,
      deliveredCount: 4500,
      verifiedByAI: true
    }
  }
];

export const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'm1', sender: 'SUPPORT', text: 'Hello! How can I help you with your campaign today?', timestamp: '2023-10-27T10:00:00' },
  { id: 'm2', sender: 'USER', text: 'I need to check if my order ORD-2023-002 is on track.', timestamp: '2023-10-27T10:05:00' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Delivery Started', message: 'Driver Mike D. has started your campaign.', type: 'INFO', timestamp: '2023-10-28T09:00:00', read: false },
  { id: 'n2', title: 'Payment Successful', message: 'Receipt #9928 generated.', type: 'SUCCESS', timestamp: '2023-10-22T15:30:00', read: true },
];
