import type { Document } from "@/types/document";

export const documents: Document[] = [
  {
    id: "1",

    title: "Market Analysis",

    description:
      "Competitive landscape and Q4 market analysis.",

    type: "Market Analysis",

    status: "In Progress",

    version: "v2.4",

    owner: {
      id: "owner-1",
      name: "John Founder",
      role: "CEO",
      avatar: "/avatars/john.png",
    },

    completion: 65,

    wordCount: 1240,

    createdAt: "2024-10-12",

    updatedAt: "2 hours ago",

    lastSaved: "2 minutes ago",

    sections: [],
  },
];