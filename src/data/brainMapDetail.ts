import { BrainMapDetail } from "@/types/brainmap";

export const brainMapDetail: BrainMapDetail = {
  id: "1",

  title: "Strategic Overview",

  workspace: "Startup Alpha",

  status: "Active",

  createdBy: "John Founder",

  totalNodes: 12,

  updated: "2h ago",

  nodes: [
    {
      id: "1",
      title: "Product",
      tasks: 3,
      x: 30,
      y: 18,
    },
    {
      id: "2",
      title: "Market",
      tasks: 5,
      x: 62,
      y: 18,
    },
    {
      id: "3",
      title: "Business",
      tasks: 2,
      x: 30,
      y: 62,
    },
    {
      id: "4",
      title: "Financial",
      tasks: 1,
      x: 62,
      y: 62,
    },
  ],

  recentNodes: [
    {
      id: "1",
      title: "Product Roadmap",
      parent: "Product",
      updated: "1 hour ago",
    },
    {
      id: "2",
      title: "Tech Stack",
      parent: "Technology",
      updated: "3 hours ago",
    },
    {
      id: "3",
      title: "Market Analysis",
      parent: "Market",
      updated: "Yesterday",
    },
  ],
};