/**
 * PrahariAI — Mock Data Service
 * Provides all synthetic data for the frontend prototype.
 * This data mirrors the backend API responses.
 */

const now = new Date();
const fmt = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

// ─── Dashboard Stats ────────────────────────────────────

export const dashboardStats = {
  totalAssets: 1247,
  activeAlerts: 12,
  avgDetectionTime: 4.2,
  falsePositiveRate: 3.2,
  examCountdown: 3,
  examName: "State Board Physics",
  monitoringStatus: "active",
};

// ─── Timeline Events ────────────────────────────────────

export const timelineEvents = [
  { id: "EVT-001", timestamp: "11:45 PM", title: "Badge Scan Near Route Point", subtitle: "Employee_4521 badge detected near BOX-7789 transit route", channel: "offline", severity: "medium", source: "Access-control log" },
  { id: "EVT-002", timestamp: "11:47 PM", title: "Box Opened Off-Route", subtitle: "BOX-7789 opened 40km off planned route · Open for 6 min", channel: "offline", severity: "critical", source: "Tamper sensor + GPS" },
  { id: "EVT-003", timestamp: "11:53 PM", title: "Off-Hours Login", subtitle: "Employee_4521 first off-hours login this month", channel: "online", severity: "high", source: "Auth log" },
  { id: "EVT-004", timestamp: "11:53 PM", title: "Wrong Subject Access", subtitle: "Chemistry reviewer opened Physics_Paper_Final_v3.pdf", channel: "online", severity: "high", source: "Document log" },
  { id: "EVT-005", timestamp: "11:54 PM", title: "File Downloaded", subtitle: "Physics_Paper_Final_v3.pdf downloaded (normally view-only)", channel: "online", severity: "critical", source: "Document log" },
  { id: "EVT-006", timestamp: "11:55 PM", title: "Screenshot Detected", subtitle: "Screenshot activity on document view for Employee_4521", channel: "online", severity: "critical", source: "Endpoint agent" },
];

// ─── Custody Smart Boxes ────────────────────────────────

export const custodyBoxes = [
  {
    id: "BOX-7789",
    paperName: "Physics_Paper_Final_v3.pdf",
    status: "BREACH_ALERT",
    location: "Sector 14 Waypoint (Off-route +4.2km)",
    battery: 84,
    signalStrength: "Strong 5G",
    temperature: 24.5,
    humidity: 45,
    tamperState: "BREACH",
    speedKmH: 0,
    courier: "Express Secure Logistics",
    vehicleId: "KA-01-EA-8842",
    eta: "10:30 AM Oct 06",
    lastUpdate: "11:47 PM",
  },
  {
    id: "BOX-6612",
    paperName: "Chemistry_Paper_v2.pdf",
    status: "IN_TRANSIT",
    location: "NH-48 Highway Km 142",
    battery: 92,
    signalStrength: "5G",
    temperature: 22.1,
    humidity: 48,
    tamperState: "SEALED",
    speedKmH: 65,
    courier: "Vigilant Guard Services",
    vehicleId: "DL-03-CV-1102",
    eta: "11:15 AM Oct 08",
    lastUpdate: "11:50 PM",
  },
  {
    id: "BOX-5041",
    paperName: "Mathematics_Paper_v1.pdf",
    status: "STORAGE",
    location: "Central Printing Vault A-4",
    battery: 99,
    signalStrength: "Ethernet Dock",
    temperature: 20.0,
    humidity: 40,
    tamperState: "LOCKED",
    speedKmH: 0,
    courier: "Internal Custody Vault",
    vehicleId: "N/A (Vault)",
    eta: "Storage",
    lastUpdate: "11:55 PM",
  },
  {
    id: "BOX-3309",
    paperName: "Biology_Paper_v2.pdf",
    status: "IN_TRANSIT",
    location: "Hub 3 Transit Facility",
    battery: 78,
    signalStrength: "4G LTE",
    temperature: 23.8,
    humidity: 50,
    tamperState: "SEALED",
    speedKmH: 0,
    courier: "Vigilant Guard Services",
    vehicleId: "MH-12-PQ-9001",
    eta: "02:00 PM Oct 15",
    lastUpdate: "11:40 PM",
  },
];

// ─── Alerts ─────────────────────────────────────────────

export const alerts = [
  {
    id: "ALT-001",
    title: "Cross-Channel Anomaly: Physics Paper",
    description: "Physical custody breach followed by unauthorized digital access within 6 minutes.",
    paperName: "Physics_Paper_Final_v3.pdf",
    riskScore: 90,
    severity: "critical",
    channelType: "HYBRID",
    timeAgo: "14 min ago",
    isNew: true,
    examCountdown: 3,
    targetLocations: ["Dist 4 Transit", "Vault B"],
    aiExplanation: "Physical custody breach of BOX-7789 at 11:47 PM was followed 6 minutes later by off-hours access, download and screenshot of the same paper by Employee_4521, a Chemistry reviewer whose badge was scanned near the breach location at 11:45 PM.",
    scoreBreakdown: [
      { component: "Online anomaly", points: 30, color: "#7C5CFC", reason: "Off-hours login + wrong subject + download + screenshot" },
      { component: "Offline anomaly", points: 27, color: "#00E5FF", reason: "Off-route box opening, 6 minutes open duration" },
      { component: "Cross-channel correlation", points: 25, color: "#FF4757", reason: "Physical breach → digital access within 6 min, badge nearby" },
      { component: "Baseline risk", points: 8, color: "#5A6478", reason: "Normal starting level for this user profile" },
    ],
    actions: [
      { id: "ACT-01", label: "Review Immediately", description: "Open full evidence chain and sensor data", priority: "high" },
      { id: "ACT-02", label: "Activate Backup Paper Set", description: "Switch to reserve Physics paper immediately", priority: "critical" },
      { id: "ACT-03", label: "Temporary Access Suspension", description: "Revoke Employee_4521 document access pending review", priority: "high" },
    ],
    dualApproval: {
      required: true,
      reviewer1: { name: "Investigator A", status: "approved", timeAgo: "2 min ago" },
      reviewer2: { name: null, status: "pending", timeAgo: null },
    },
  },
  {
    id: "ALT-002",
    title: "Unusual Access Pattern: Chemistry Paper",
    description: "Employee_1092 accessed Chemistry paper 4 times in 20 minutes during off-hours.",
    paperName: "Chemistry_Paper_v2.pdf",
    riskScore: 62,
    severity: "high",
    channelType: "ONLINE",
    timeAgo: "1h 23m ago",
    isNew: true,
    examCountdown: 5,
    targetLocations: ["Central Server"],
    aiExplanation: "Repeated access pattern detected outside normal work hours for a Data Entry role.",
    scoreBreakdown: [
      { component: "Online anomaly", points: 35, color: "#7C5CFC", reason: "Repeated access in short window + off-hours" },
      { component: "Temporal", points: 15, color: "#FFD93D", reason: "Exam proximity escalation" },
      { component: "Baseline risk", points: 12, color: "#5A6478", reason: "Role baseline for Data Entry" },
    ],
    actions: [{ id: "ACT-04", label: "Flag for Review", description: "Add to investigation queue", priority: "medium" }],
    dualApproval: { required: false, reviewer1: null, reviewer2: null },
  },
  {
    id: "ALT-003",
    title: "Route Deviation: BOX-6612",
    description: "English paper transport stopped for 45 minutes.",
    paperName: "English_Paper_v1.pdf",
    riskScore: 45,
    severity: "medium",
    channelType: "OFFLINE",
    timeAgo: "45 min ago",
    isNew: false,
    examCountdown: 7,
    targetLocations: ["NH-48 Transit"],
    aiExplanation: "Transport vehicle stopped for extended period. No tamper event detected.",
    scoreBreakdown: [
      { component: "Offline anomaly", points: 25, color: "#00E5FF", reason: "Extended stop outside planned schedule" },
      { component: "Temporal", points: 15, color: "#FFD93D", reason: "Exam proximity factor" },
      { component: "Baseline risk", points: 5, color: "#5A6478", reason: "Normal starting level" },
    ],
    actions: [{ id: "ACT-05", label: "Monitor", description: "Continue tracking", priority: "medium" }],
    dualApproval: { required: false, reviewer1: null, reviewer2: null },
  },
  {
    id: "ALT-004",
    title: "New Device Login",
    description: "Employee_7320 logged in from unrecognized device.",
    paperName: "N/A",
    riskScore: 28,
    severity: "low",
    channelType: "ONLINE",
    timeAgo: "4h ago",
    isNew: false,
    examCountdown: 3,
    targetLocations: ["Remote IP"],
    aiExplanation: "New device detected for routine login. No document access anomaly found.",
    scoreBreakdown: [
      { component: "Online anomaly", points: 15, color: "#7C5CFC", reason: "New device fingerprint" },
      { component: "Temporal", points: 9, color: "#FFD93D", reason: "Exam proximity minor factor" },
      { component: "Baseline risk", points: 4, color: "#5A6478", reason: "Normal starting level" },
    ],
    actions: [],
    dualApproval: { required: false, reviewer1: null, reviewer2: null },
  },
];

// ─── Collusion Graph ────────────────────────────────────

export const collusionGraph = {
  nodes: [
    { id: "EMP_4521", label: "Employee_4521", type: "employee", riskScore: 90, suspicious: true, dept: "Chemistry" },
    { id: "EMP_4393", label: "Employee_4393", type: "employee", riskScore: 45, suspicious: true, dept: "Physics" },
    { id: "MGR_1092", label: "Manager_1092", type: "employee", riskScore: 55, suspicious: true, dept: "Admin" },
    { id: "EMP_3892", label: "Employee_3892", type: "employee", riskScore: 12, suspicious: false, dept: "Physics" },
    { id: "EMP_1093", label: "Employee_1093", type: "employee", riskScore: 8, suspicious: false, dept: "Maths" },
    { id: "EMP_7320", label: "Employee_7320", type: "employee", riskScore: 22, suspicious: false, dept: "Admin" },
    { id: "ANL_8830", label: "Analyst_8830", type: "employee", riskScore: 18, suspicious: false, dept: "IT Sec" },
    { id: "DOC_PHYS", label: "Physics Paper", type: "document", riskScore: 95, suspicious: true, dept: null },
  ],
  edges: [
    { source: "EMP_4521", target: "DOC_PHYS", suspicious: true, label: "Downloaded + Screenshot" },
    { source: "EMP_4393", target: "DOC_PHYS", suspicious: true, label: "Accessed within window" },
    { source: "MGR_1092", target: "DOC_PHYS", suspicious: true, label: "Shared access link" },
    { source: "EMP_4521", target: "EMP_4393", suspicious: true, label: "Badge proximity" },
    { source: "EMP_4521", target: "MGR_1092", suspicious: true, label: "Sequential access" },
    { source: "EMP_4393", target: "MGR_1092", suspicious: true, label: "Co-located off-hours" },
    { source: "EMP_3892", target: "DOC_PHYS", suspicious: false, label: "Assigned reviewer" },
    { source: "EMP_7320", target: "MGR_1092", suspicious: false, label: "Reports to" },
    { source: "ANL_8830", target: "EMP_4521", suspicious: false, label: "Investigating" },
    { source: "EMP_1093", target: "EMP_3892", suspicious: false, label: "Same floor" },
  ],
  patterns: [
    { id: "PAT-01", description: "3 users accessed Physics paper within 12-minute window", confidence: "high", nodes: ["EMP_4521", "EMP_4393", "MGR_1092"] },
    { id: "PAT-02", description: "2 users from non-Physics department", confidence: "high", nodes: ["EMP_4521", "MGR_1092"] },
    { id: "PAT-03", description: "Badge proximity detected at same location", confidence: "high", nodes: ["EMP_4521"] },
    { id: "PAT-04", description: "Coordinated document downloads", confidence: "medium", nodes: ["EMP_4521", "EMP_4393"] },
  ],
};

// ─── Analytics ──────────────────────────────────────────

export const riskTrend = Array.from({ length: 24 }, (_, h) => {
  let score = 2 + Math.random() * 1.5;
  if (h === 3 || h === 4) score = 6 + Math.random() * 3;
  if (h === 23) score = 8 + Math.random() * 2;
  return { hour: `${String(h).padStart(2, '0')}:00`, score: +score.toFixed(1), hasAlert: h === 3 || h === 23 };
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const activityHeatmap = days.flatMap(day =>
  Array.from({ length: 24 }, (_, hour) => {
    const isWork = hour >= 9 && hour <= 18 && !["Sat", "Sun"].includes(day);
    let count = isWork ? 15 + Math.floor(Math.random() * 30) : Math.floor(Math.random() * 8);
    const isAnomalous = (day === "Wed" && [2, 3, 23].includes(hour)) || (day === "Sat" && [22, 23].includes(hour));
    if (isAnomalous) count = 20 + Math.floor(Math.random() * 15);
    return { day, hour, count, isAnomalous };
  })
);

export const modelPerformance = {
  recall: 96.8, precision: 95.1, f1Score: 95.9,
  confusionMatrix: { tp: 968, fp: 32, fn: 49, tn: 195 },
  lastRetrained: "2 hours ago", version: "v2.4",
};

export const upcomingExams = [
  { id: "EX-001", name: "State Board Physics", date: "Oct 06, 10:00 AM", countdown: "3 days 0 hrs" },
  { id: "EX-002", name: "State Board Chemistry", date: "Oct 08, 10:00 AM", countdown: "5 days 2 hrs" },
  { id: "EX-003", name: "State Board Mathematics", date: "Oct 11, 10:00 AM", countdown: "8 days 14 hrs" },
  { id: "EX-004", name: "State Board Biology", date: "Oct 15, 10:00 AM", countdown: "12 days 6 hrs" },
];

// ─── Audit Log ──────────────────────────────────────────

export const auditLog = [
  { id: "AUD-001", timestamp: "11:47 PM", action: "Alert Generated", channel: "HYBRID", user: "System Sentinel", details: "Critical alert ALT-001 generated for Physics_Paper_Final_v3.pdf — Score 90/100", severity: "critical", hash: "a4f8c2d91e3b7a12", verified: true },
  { id: "AUD-002", timestamp: "11:49 PM", action: "Push Alert Sent", channel: "SYSTEM", user: "Notification Engine", details: "Push notification sent to 3 investigators for ALT-001", severity: "critical", hash: "b7e3f1a8c4d92e56", verified: true },
  { id: "AUD-003", timestamp: "11:51 PM", action: "Investigation Opened", channel: "ONLINE", user: "Investigator_A", details: "Investigator_A opened and reviewed alert ALT-001", severity: "critical", hash: "c9d4e2f7a1b83c67", verified: true },
  { id: "AUD-004", timestamp: "11:53 PM", action: "Action Approved (1/2)", channel: "ONLINE", user: "Investigator_A", details: "Investigator_A approved actions for ALT-001 (1st approval)", severity: "critical", hash: "d1a5f3c8e2b94d78", verified: true },
  { id: "AUD-005", timestamp: "11:56 PM", action: "Identity Revealed", channel: "SYSTEM", user: "Privacy Vault", details: "Identity of Employee_4521 revealed — threshold crossed", severity: "high", hash: "e2b6g4d9f3ca5e89", verified: true },
  { id: "AUD-006", timestamp: "10:38 PM", action: "Alert Generated", channel: "ONLINE", user: "System Sentinel", details: "High alert ALT-002 generated for Chemistry_Paper_v2.pdf — Score 62/100", severity: "high", hash: "f3c7h5ea41db6f90", verified: true },
  { id: "AUD-007", timestamp: "09:00 PM", action: "Model Retrained", channel: "SYSTEM", user: "MLOps Pipeline", details: "Model v2.4 automatic retraining completed with 96.8% recall", severity: "low", hash: "14d8i6fb52ec71a1", verified: true },
  { id: "AUD-008", timestamp: "07:00 PM", actor: "Admin Login", channel: "ONLINE", user: "Admin_001", action: "User Session", details: "Admin_001 logged in from authorized device", severity: "low", hash: "25e9j72c63fd82b2", verified: true },
  { id: "AUD-009", timestamp: "05:00 PM", action: "Integrity Audit", channel: "OFFLINE", user: "Custody Engine", details: "Daily integrity verification — 14,847 events verified, 0 tampering", severity: "low", hash: "36fa83d74ge93c3", verified: true },
  { id: "AUD-010", timestamp: "03:00 PM", action: "Alert Dismissed", channel: "ONLINE", user: "Investigator_B", details: "Alert ALT-004 dismissed as benign — authorized laptop replacement", severity: "low", hash: "47gb94e85hfa4d4", verified: true },
];
