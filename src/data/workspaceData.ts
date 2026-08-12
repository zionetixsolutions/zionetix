export interface Workspace {
  id: string;
  name: string;
  status: "Active" | "Planning" | "Archived";
  notes: number;
  files: number;
  updated: string;
}

export const workspaces: Workspace[] = [
  {
    id: "product-dev",
    name: "Product Dev",
    status: "Active",
    notes: 12,
    files: 8,
    updated: "Updated Today",
  },
  {
    id: "fundraising",
    name: "Fundraising",
    status: "Active",
    notes: 45,
    files: 24,
    updated: "Updated 2h ago",
  },
  {
    id: "marketing",
    name: "Marketing",
    status: "Planning",
    notes: 5,
    files: 12,
    updated: "Updated Yesterday",
  },
  {
    id: "legal-docs",
    name: "Legal Docs",
    status: "Active",
    notes: 18,
    files: 32,
    updated: "Updated 3 days ago",
  },
  {
    id: "research",
    name: "Research",
    status: "Planning",
    notes: 2,
    files: 4,
    updated: "Updated 1 week ago",
  },
  {
    id: "investor-room",
    name: "Investor Room",
    status: "Archived",
    notes: 88,
    files: 156,
    updated: "Updated 1 month ago",
  },
];