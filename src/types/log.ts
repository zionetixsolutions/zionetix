export type LogSeverity =
  | "Info"
  | "Warning"
  | "Critical";

export type LogStatus =
  | "Success"
  | "Pending"
  | "Failed";

export interface LogUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Log {
  id: string;

  date: string;
  time: string;

  user: LogUser;

  module: string;

  action: string;

  severity: LogSeverity;

  status: LogStatus;

  description: string;

  workspace: string;

  resource: string;

  resourceType: string;

  ip: string;

  browser: string;

  os: string;

  device: string;

  requestId: string;

  metadata: Record<string, unknown>;
}