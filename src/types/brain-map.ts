export interface BrainMapNode {
  id: string;
  title: string;
  status: string;
  parentNode: string;
  createdBy: string;
  updatedAt: string;

  connectedNodes: string[];

  activeTasks: number;

  description: string;
}
export interface BrainMap {
  id: string;
  name: string;
  description: string;

  category: string;

  status: string;

  visibility:
    | "venture"
    | "private";
}