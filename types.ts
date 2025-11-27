
export enum WorkspaceMode {
  QUEUE = 'QUEUE',
  TICKET = 'TICKET',
  ANALYTICS = 'ANALYTICS',
  KNOWLEDGE = 'KNOWLEDGE',
  ESCALATION = 'ESCALATION'
}

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  sentimentScore: number; // -1.0 to 1.0
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'new' | 'open' | 'pending' | 'resolved';
  channel: 'email' | 'chat' | 'phone';
  lastUpdated: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  arr: number; // Annual Recurring Revenue
  csat: number; // 1-5
  ltv: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface AgentContext {
  mode: WorkspaceMode;
  currentTicketId?: string;
  customerContext?: CustomerProfile;
  metrics?: any;
}

// Props for workspaces that need navigation
export interface WorkspaceProps {
  onNavigate: (mode: WorkspaceMode) => void;
}
