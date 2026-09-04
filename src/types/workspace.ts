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

export interface WorkspaceDocument {
  id: string;
  workspace_id: string;
  file_name?: string;
  filename?: string;
  name?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface WorkspaceNote {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface WorkspaceActivityItem {
  id: string;
  workspace_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  performed_by: string | null;
  metadata: {
    title?: string;
    fileName?: string;
  } | null;
  created_at: string;
}