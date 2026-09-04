export type DecisionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "PUSHBACK";

export type DecisionPriority =
  | "High Priority"
  | "Standard Priority";

export interface DecisionReasoningItem {
  point: string;
  explanation: string;
}
export interface DecisionListItem {
  id: string;

  category: string;
  title: string;

  situation: string | null;
  recommendation: string | null;

  reasoning: DecisionReasoningItem[];

  riskIfIgnored: string | null;

  confidenceScore: number | null;

  priority: DecisionPriority;

  status: DecisionStatus;

  createdBy: string | null;

  createdAt: string;
  updatedAt: string;
}
export interface Decision {
  id: string;
  category: string;
  priority: string;
  status: DecisionStatus;
  title: string;
  description: string;

  situation?: string | null;
  recommendation?: string | null;
  reasoning?: unknown[];
  riskIfIgnored?: string | null;

  confidenceScore: number | null;

  createdBy?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface DecisionStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  pushback: number;
}

export interface DecisionsResponse {
  success: boolean;

  data: Decision[];

  stats: DecisionStats;

  message?: string;
}

export interface DecisionResponse {
  success: boolean;

  data?: Decision;

  message?: string;
}

export interface CreateDecisionPayload {
  category: string;
  title: string;

  situation?: string | null;

  recommendation?: string | null;

  reasoning?: DecisionReasoningItem[];

  riskIfIgnored?: string | null;

  confidenceScore?: number | null;

  createdBy?: string;
}

export interface UpdateDecisionPayload {
  status: DecisionStatus;
}