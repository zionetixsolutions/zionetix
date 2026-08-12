"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * NotificationsPageStandalone
 * Self-contained preview version of NotificationsPage — same content, but
 * injects the real Tailwind CDN + this page's OWN tailwind.config (its
 * colors/spacing/fonts differ from your other pages' config — primary
 * #7a3000, margin-page 64px, etc.) + Google Fonts at runtime, so it
 * renders correctly even outside your app (no layout.tsx, no theme, no
 * fonts loaded).
 *
 * For your real app, use NotificationsPage.tsx (page-content only, relies
 * on your layout.tsx + global tailwind.config). Use this file only for
 * standalone previews/demos/sharing.
 */

declare global {
  interface Window {
    tailwind?: {
      config?: unknown;
    };
  }
}

const TAILWIND_CONFIG = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#fbf9f4",
        "on-tertiary-fixed-variant": "#5a4136",
        "secondary-container": "#deddd8",
        "surface-container-low": "#f5f3ee",
        "error-container": "#ffdad6",
        "ai-grey": "#757575",
        "on-error": "#ffffff",
        "on-secondary": "#ffffff",
        "accent-mint": "#00ff88",
        "on-primary-container": "#ffceb8",
        "on-tertiary-container": "#f5d1c1",
        surface: "#fbf9f4",
        "on-secondary-container": "#61615d",
        "on-primary-fixed": "#351000",
        "border-muted": "#e7e2da",
        "surface-variant": "#e4e2dd",
        "secondary-fixed-dim": "#c7c6c2",
        "inverse-on-surface": "#f2f1ec",
        "inverse-surface": "#30312e",
        "on-secondary-fixed-variant": "#464743",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#ddc1b4",
        "on-primary": "#ffffff",
        "on-tertiary-fixed": "#2a170e",
        "surface-container-highest": "#e4e2dd",
        "on-tertiary": "#ffffff",
        error: "#ba1a1a",
        "surface-dim": "#dbdad5",
        "secondary-fixed": "#e4e2dd",
        "on-surface-variant": "#574239",
        tertiary: "#5a4136",
        "on-background": "#1b1c19",
        "tertiary-fixed": "#ffdbcc",
        "tertiary-fixed-dim": "#e3bfb0",
        "on-secondary-fixed": "#1b1c19",
        "primary-fixed-dim": "#ffb693",
        "tertiary-container": "#74584c",
        "on-surface": "#1b1c19",
        primary: "#7a3000",
        outline: "#8a7267",
        "surface-container": "#f0eee9",
        "success-green": "#2d7a4d",
        "success-bg": "#ebf7f0",
        "surface-cream": "#fbf9f4",
        secondary: "#5e5f5b",
        background: "#fbf9f4",
      },
      spacing: {
        gutter: "32px",
        "stack-lg": "24px",
        "card-padding": "40px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "margin-page": "64px",
        "section-gap": "160px",
        "container-max": "1280px",
      },
      fontFamily: {
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "body-md": ["Hanken Grotesk"],
        "mono-label": ["JetBrains Mono"],
        "label-caps": ["Hanken Grotesk"],
        "headline-lg": ["Hanken Grotesk"],
      },
    },
  },
};

const GlobalFontStyles: React.FC = () => (
  <style>{`
    body {
      background-color: #fbf9f4;
      color: #1b1c19;
      font-family: 'Hanken Grotesk', sans-serif;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
      font-size: 20px;
    }
  `}</style>
);

type Priority = "urgent" | "normal" | "low";

type Notification = {
  id: string;
  icon: string;
  iconFilled?: boolean;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  priority: Priority;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    icon: "psychology",
    iconFilled: true,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "AI Specialist: Strategy Update",
    description:
      'The Market Analyst specialist has refined the GTM strategy based on recent Q3 data.',
    tag: "AI ADVISOR",
    tagBg: "bg-ai-bg",
    tagColor: "text-ai-grey",
    priority: "urgent",
    time: "2 MIN AGO",
    read: false,
  },
  {
    id: "2",
    icon: "description",
    iconBg: "bg-success-bg",
    iconColor: "text-success-green",
    title: "Legal: Patent Filing Draft Ready",
    description:
      'The intellectual property documents for "Primordial Core" are ready for your review.',
    tag: "DOCUMENTS",
    tagBg: "bg-surface-container",
    tagColor: "text-on-surface-variant",
    priority: "normal",
    time: "45 MIN AGO",
    read: false,
  },
  {
    id: "3",
    icon: "group",
    iconBg: "bg-surface-container",
    iconColor: "text-secondary",
    title: "Team Member: Sarah Chen Joined",
    description:
      "Sarah Chen has accepted the invitation to the Engineering Workspace.",
    tag: "TEAM",
    tagBg: "bg-surface-container",
    tagColor: "text-on-surface-variant",
    priority: "low",
    time: "2H AGO",
    read: true,
  },
  {
    id: "4",
    icon: "settings",
    iconBg: "bg-surface-container",
    iconColor: "text-secondary",
    title: "System: Scheduled Maintenance",
    description:
      "The Primordial platform will be offline for 15 minutes this Sunday at 02:00 UTC.",
    tag: "SYSTEM",
    tagBg: "bg-surface-container",
    tagColor: "text-on-surface-variant",
    priority: "normal",
    time: "YESTERDAY",
    read: true,
  },
  {
    id: "5",
    icon: "payments",
    iconBg: "bg-surface-container",
    iconColor: "text-secondary",
    title: "Billing: Invoice Generated",
    description: "Your monthly subscription invoice for August 2024 is now available.",
    tag: "FINANCE",
    tagBg: "bg-surface-container",
    tagColor: "text-on-surface-variant",
    priority: "low",
    time: "AUG 12",
    read: true,
  },
];

const priorityStyles: Record<Priority, { dot: string; text: string; label: string }> = {
  urgent: { dot: "bg-error", text: "text-error", label: "Urgent" },
  normal: { dot: "bg-secondary opacity-30", text: "text-secondary", label: "Normal" },
  low: { dot: "bg-secondary opacity-30", text: "text-secondary", label: "Low" },
};

const NotificationRowItem: React.FC<{
  notification: Notification;
  onMarkRead: (id: string) => void;
}> = ({ notification, onMarkRead }) => {
  const p = priorityStyles[notification.priority];
  return (
    <div
      onClick={() => onMarkRead(notification.id)}
      className={`notification-row flex items-center gap-6 px-8 py-5 border-b border-border-muted transition-colors group cursor-pointer ${
        notification.read
          ? "hover:bg-surface-container-lowest"
          : "bg-surface-container-low"
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.iconBg} ${notification.iconColor}`}>
        <span
          className="material-symbols-outlined"
          style={notification.iconFilled ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {notification.icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`${notification.read ? "font-semibold" : "font-bold"} text-on-surface truncate`}>
          {notification.title}
        </p>
        <p className="text-secondary text-sm truncate">{notification.description}</p>
      </div>
      <div className="w-32">
        <span
          className={`${notification.tagBg} ${notification.tagColor} font-label-caps text-[10px] px-2 py-1 rounded uppercase tracking-wider`}
        >
          {notification.tag}
        </span>
      </div>
      <div className="w-32 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${p.dot}`}></span>
        <span className={`text-xs font-mono-label ${p.text} uppercase`}>{p.label}</span>
      </div>
      <div className="w-24 text-right">
        <span className="text-xs text-secondary opacity-60 font-mono-label">{notification.time}</span>
      </div>
      <div className="w-10 flex justify-end">
        <button
          onClick={(e) => e.stopPropagation()}
          className="more-btn material-symbols-outlined text-secondary hover:text-on-surface"
        >
          more_vert
        </button>
      </div>
    </div>
  );
};

export default function NotificationsPageStandalone() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    if (!window.tailwind) {
      const tailwindScript = document.createElement("script");
      tailwindScript.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
      tailwindScript.onload = () => {
        if (window.tailwind) {
          window.tailwind.config = TAILWIND_CONFIG;
        }
      };
      document.head.appendChild(tailwindScript);
    } else {
      window.tailwind.config = TAILWIND_CONFIG;
    }

    const fontLink1 = document.createElement("link");
    fontLink1.rel = "stylesheet";
    fontLink1.href =
      "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement("link");
    fontLink2.rel = "stylesheet";
    fontLink2.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    document.head.appendChild(fontLink2);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-8 lg:px-margin-page py-stack-lg">
      <GlobalFontStyles />
      <style>{`
        .notification-row:hover .more-btn { opacity: 1; }
        .more-btn { opacity: 0; transition: opacity 0.2s ease; }
      `}</style>

      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Notifications
          </h2>
          <p className="font-body-lg text-secondary max-w-xl">
            Stay informed about workspace activity, AI updates and important system events.
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          <button className="bg-surface-container-lowest border border-border-muted text-on-surface px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-surface-container-low transition-all whitespace-nowrap">
            Notification Settings
          </button>
          <button
            onClick={markAllRead}
            className="bg-on-background text-surface-bright px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <span>Mark All as Read</span>
            <span className="material-symbols-outlined text-[18px]">done_all</span>
          </button>
        </div>
      </section>

      {/* Summary Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
        <div className="bg-surface-container-lowest p-card-padding border border-border-muted rounded-none relative">
          <div className="absolute top-4 left-4 font-mono-label text-[10px] text-secondary opacity-40">01</div>
          <p className="font-label-caps text-label-caps text-secondary mb-4">TOTAL NOTIFICATIONS</p>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-[48px] leading-none font-bold">124</span>
            <span className="text-success-green font-mono-label text-xs mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12% THIS WEEK
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-card-padding border border-border-muted rounded-none relative">
          <div className="absolute top-4 left-4 font-mono-label text-[10px] text-secondary opacity-40">02</div>
          <p className="font-label-caps text-label-caps text-secondary mb-4">UNREAD</p>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-[48px] leading-none font-bold">
              {String(notifications.filter((n) => !n.read).length).padStart(2, "0")}
            </span>
            <span className="text-secondary opacity-60 font-mono-label text-xs mb-2 uppercase">
              LAST CHECKED 2H AGO
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-card-padding border border-border-muted rounded-none relative">
          <div className="absolute top-4 left-4 font-mono-label text-[10px] text-secondary opacity-40">03</div>
          <p className="font-label-caps text-label-caps text-secondary mb-4">HIGH PRIORITY</p>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-[48px] leading-none font-bold text-primary">03</span>
            <span className="text-primary font-mono-label text-xs mb-2 uppercase animate-pulse">
              ACTION REQUIRED
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-card-padding border border-border-muted rounded-none relative">
          <div className="absolute top-4 left-4 font-mono-label text-[10px] text-secondary opacity-40">04</div>
          <p className="font-label-caps text-label-caps text-secondary mb-4">TODAY</p>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-[48px] leading-none font-bold">12</span>
            <span className="text-secondary opacity-60 font-mono-label text-xs mb-2 uppercase">
              NEW RECENT ACTIVITY
            </span>
          </div>
        </div>
      </section>

      {/* List Controls */}
      <section className="bg-surface-container-low/50 border border-border-muted p-6 mb-stack-sm flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary opacity-40">
            search
          </span>
          <input
            ref={searchInputRef}
            className="bg-surface-container-lowest border border-border-muted rounded-lg py-2 pl-10 pr-4 text-sm w-full lg:w-80 focus:ring-1 focus:ring-outline outline-none"
            placeholder="Search notifications..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Type:</span>
            <select className="bg-transparent border-none font-semibold text-sm focus:ring-0 cursor-pointer">
              <option>All</option>
              <option>System</option>
              <option>Team</option>
              <option>AI Advisor</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Status:</span>
            <select className="bg-transparent border-none font-semibold text-sm focus:ring-0 cursor-pointer">
              <option>Unread</option>
              <option>Read</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Date:</span>
            <select className="bg-transparent border-none font-semibold text-sm focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notification Feed */}
      <div className="bg-surface-container-lowest border border-border-muted overflow-x-auto">
        <div className="min-w-[760px]">
          {notifications.map((n) => (
            <NotificationRowItem key={n.id} notification={n} onMarkRead={handleMarkRead} />
          ))}
        </div>
      </div>

      {/* Footer Pagination Placeholder */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-xs font-mono-label text-secondary opacity-60">
        <span>SHOWING 1-5 OF 124 NOTIFICATIONS</span>
        <div className="flex gap-4">
          <button className="hover:text-on-surface transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">chevron_left</span> PREVIOUS
          </button>
          <div className="flex gap-2">
            <span className="text-on-surface font-bold">1</span>
            <span>2</span>
            <span>3</span>
            <span>...</span>
            <span>25</span>
          </div>
          <button className="hover:text-on-surface transition-colors flex items-center gap-1">
            NEXT <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
