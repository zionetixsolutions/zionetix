import { Log } from "@/types/log";

export const logs: Log[] = [
  {
    id: "LOG-2026-001",

    date: "Today",
    time: "14:22:05",

    user: {
      id: "USR-001",
      name: "Alex Rivera",
      email: "alex@primordial.ai",
      avatar:
        "https://i.pravatar.cc/150?img=11",
      role: "Founder",
    },

    module: "Documents",

    action: "Modified 'Seed_Deck_Final.pdf'",

    severity: "Info",

    status: "Success",

    description:
      "Alex Rivera updated the Seed Deck after board review.",

    workspace: "Startup Alpha",

    resource: "Seed_Deck_Final.pdf",

    resourceType: "Document",

    ip: "192.168.1.10",

    browser: "Chrome 138",

    os: "Windows 11",

    device: "Desktop",

    requestId: "REQ-82938192",

    metadata: {
      version: "2.4.1",
      checksum: "a8f29cb",
    },
  },

  {
    id: "LOG-2026-002",

    date: "Today",
    time: "14:15:32",

    user: {
      id: "AI-001",
      name: "AI Advisor",
      email: "advisor@primordial.ai",
      avatar:
        "https://i.pravatar.cc/150?img=13",
      role: "AI",
    },

    module: "AI",

    action: "Automatically approved Expense #442",

    severity: "Info",

    status: "Success",

    description:
      "AI Advisor automatically approved an expense according to company policy.",

    workspace: "Startup Alpha",

    resource: "Expense #442",

    resourceType: "Expense",

    ip: "Internal",

    browser: "System",

    os: "Linux",

    device: "Cloud",

    requestId: "REQ-82938193",

    metadata: {
      policy: "Expense Auto Approval",
      confidence: "98%",
    },
  },

  {
    id: "LOG-2026-003",

    date: "Today",
    time: "13:42:11",

    user: {
      id: "SYS-001",
      name: "System Guard",
      email: "system@primordial.ai",
      avatar:
        "https://i.pravatar.cc/150?img=8",
      role: "System",
    },

    module: "Authentication",

    action: "Multiple failed login attempts detected",

    severity: "Critical",

    status: "Failed",

    description:
      "Security service detected repeated login failures from a single IP address.",

    workspace: "Startup Alpha",

    resource: "Authentication",

    resourceType: "Security",

    ip: "103.54.18.91",

    browser: "Unknown",

    os: "Unknown",

    device: "Unknown",

    requestId: "REQ-82938194",

    metadata: {
      attempts: 8,
      blocked: true,
    },
  },

  {
    id: "LOG-2026-004",

    date: "Today",
    time: "12:10:04",

    user: {
      id: "USR-002",
      name: "John Founder",
      email: "john@primordial.ai",
      avatar:
        "https://i.pravatar.cc/150?img=4",
      role: "Founder",
    },

    module: "Decision Inbox",

    action: "Initiated board resolution voting",

    severity: "Warning",

    status: "Pending",

    description:
      "Board resolution voting has been initiated and is awaiting responses.",

    workspace: "Startup Alpha",

    resource: "Board Resolution",

    resourceType: "Decision",

    ip: "192.168.1.22",

    browser: "Edge",

    os: "Windows 11",

    device: "Desktop",

    requestId: "REQ-82938195",

    metadata: {
      votesRequired: 5,
      votesReceived: 2,
    },
  },

  {
    id: "LOG-2026-005",

    date: "Yesterday",
    time: "23:59:59",

    user: {
      id: "SYS-002",
      name: "Auto Backup",
      email: "backup@primordial.ai",
      avatar:
        "https://i.pravatar.cc/150?img=18",
      role: "System",
    },

    module: "Workspace",

    action: "Nightly venture snapshot successfully created",

    severity: "Info",

    status: "Success",

    description:
      "Nightly backup completed successfully without errors.",

    workspace: "Startup Alpha",

    resource: "Workspace Backup",

    resourceType: "Backup",

    ip: "Internal",

    browser: "System",

    os: "Linux",

    device: "Cloud",

    requestId: "REQ-82938196",

    metadata: {
      size: "1.2 GB",
      duration: "4 min",
    },
  },
];