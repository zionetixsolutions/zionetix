"use client"
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import VentureOverview from "@/components/dashboard/VentureOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DecisionInbox from "@/components/dashboard/DecisionInbox";
import RecentDocuments from "@/components/dashboard/RecentDocuments";

import { motion } from "framer-motion";
export default function FounderDashboard() {
  return (
    <div
  className="min-h-screen bg-gradient-to-br from-white  via-zinc-50 to-zinc-100 space-y-8">

      {/* Welcome Section */}

      <section>

  <motion.div

    initial={{
      opacity: 0,
      y: 30,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 0.4,
    }}

  >

    <h1
      className="
      text-6xl
      font-light
      tracking-tight
      leading-tight
      "
    >
      Welcome Back,
      <br />
      John Founder
    </h1>

    <p
      className="
      mt-4
      text-lg
      italic
      text-zinc-500
      "
    >
      One Venture. One Workspace.
      One Source of Truth.
    </p>

  </motion.div>

</section>

      {/* Stats */}

      <DashboardStats />

      {/* Row 1 */}

      <div
        className="
        grid
        grid-cols-2
        gap-6
        "
      >
        <QuickActions />

        <VentureOverview />
      </div>

      {/* Row 2 */}

      <div
        className="
        grid
        grid-cols-2
        gap-6
        "
      >
        <RecentActivity />

        <DecisionInbox />
      </div>

      {/* Documents */}

      <RecentDocuments />

    </div>
  );
}