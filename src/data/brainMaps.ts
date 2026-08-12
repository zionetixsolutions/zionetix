import { BrainMap } from "@/types/brainmap";

export const brainMaps: BrainMap[] = [
  {
    id: "1",
    name: "Company Strategy",
    workspace: "Executive Suite",
    description:
      "Core strategic pillars and long-term objectives for the company.",
    nodes: 84,
    status: "ACTIVE",
    updated: "2h ago",
  },

  {
    id: "2",
    name: "Product Development",
    workspace: "Engineering",
    description:
      "Technical roadmap and dependency planning.",
    nodes: 156,
    status: "ACTIVE",
    updated: "5h ago",
  },

  {
    id: "3",
    name: "Customer Journey",
    workspace: "Marketing",
    description:
      "Customer touchpoints and conversion funnel planning.",
    nodes: 42,
    status: "DRAFT",
    updated: "1d ago",
  },
];