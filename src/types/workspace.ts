export interface Workspace {
  id: string;
  name: string;
  status: string;
  notes: number;
  files: number;
  updated: string;
}

export interface WorkspaceDetail {
  id: string;
  name: string;
  status: string;
  description: string;

  owner: string;
  created: string;
  updated: string;

  documents: number;
  notes: number;
  members: number;
  advisors: number;
}