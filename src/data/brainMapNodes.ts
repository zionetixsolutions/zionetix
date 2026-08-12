import { BrainMapNode } from "@/types/brain-map";

export const brainMapNodes: Record<
  string,
  BrainMapNode
> = {

  product: {
    id: "product",
    title: "PRODUCT",
    status: "Validated",
    parentNode: "Company",
    createdBy: "John Founder",
    updatedAt: "2h ago",
    activeTasks: 2,
    description:
      "Core product development roadmap and feature prioritization.",
    connectedNodes: [
    "Market",
    "Business",
    "Financial"
  ],
  },

  market: {
    id: "market",
    title: "MARKET",
    status: "Active",
    parentNode: "Company",
    createdBy: "John Founder",
    updatedAt: "1h ago",
    activeTasks: 5,
    description:
      "Research and market validation strategy.",
    connectedNodes: [
    "Product",
    "Business"
  ],
  },

  business: {
    id: "business",
    title: "BUSINESS",
    status: "Planning",
    parentNode: "Company",
    createdBy: "Jane Strategy",
    updatedAt: "5h ago",
    activeTasks: 2,
    description:
      "Operational structure and GTM planning.",
    connectedNodes: [
    "Product",
    "Financial"
  ],
  },

  financial: {
    id: "financial",
    title: "FINANCIAL",
    status: "At Risk",
    parentNode: "Company",
    createdBy: "Sarah Finance",
    updatedAt: "1d ago",
    activeTasks: 1,
    description:
      "Cash flow forecasting and runway management.",
    connectedNodes: [
    "Business"
  ],  
  },

};