/* =========================================================
   DOCUMENT STATUS
========================================================= */

export type DocumentStatus =
  | "Draft"
  | "In Progress"
  | "Review"
  | "Approved"
  | "Archived";

/* =========================================================
   DOCUMENT CATEGORY
========================================================= */

export type DocumentType =
  | "Market Analysis"
  | "Business Plan"
  | "Financial Report"
  | "Product Strategy"
  | "Legal"
  | "Research"
  | "Pitch Deck"
  | "Other";

/* =========================================================
   DOCUMENT SECTION
========================================================= */

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  expanded: boolean;
}

/* =========================================================
   DOCUMENT OWNER
========================================================= */

export interface DocumentOwner {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

/* =========================================================
   DOCUMENT INFORMATION
========================================================= */

export interface Document {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  status: DocumentStatus;
  version: string;
  owner: DocumentOwner;
  completion: number;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  lastSaved: string;
  sections: DocumentSection[];
}

/* =========================================================
   AI INSIGHT
========================================================= */

export interface AIInsight {
  id: string;

  title: string;

  summary: string;

  suggestions: string[];
}

/* =========================================================
   ACTIVITY
========================================================= */

export interface Activity {
  id: string;

  user: string;

  action: string;

  time: string;

  icon: string;
}

/* =========================================================
   VERSION
========================================================= */

export interface DocumentVersion {
  id: string;

  version: string;

  title: string;

  description: string;

  createdAt: string;

  createdBy: string;

  current: boolean;
}

/* =========================================================
   SHARE PERMISSION
========================================================= */

export interface SharePermission {
  id: string;

  email: string;

  role: "Viewer" | "Editor" | "Admin";
}

/* =========================================================
   EXPORT FORMAT
========================================================= */

export type ExportFormat =
  | "PDF"
  | "DOCX"
  | "Markdown"
  | "HTML";

/* =========================================================
   SETTINGS
========================================================= */

export interface DocumentSettings {
  autoSave: boolean;

  publicAccess: boolean;

  allowComments: boolean;

  versionControl: boolean;

  AIEnabled: boolean;
}