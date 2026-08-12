"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import VentureOverview from "@/components/dashboard/VentureOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DecisionInbox from "@/components/dashboard/DecisionInbox";
import RecentDocuments from "@/components/dashboard/RecentDocuments";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Profile {
  full_name: string;
  email: string;
  profile_image: string | null;
}

export default function FounderDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        console.log("DASHBOARD PROFILE:", data);

        if (data.success) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="space-y-10">

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

            {loading
              ? "Loading..."
              : profile?.full_name || "Founder"}
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