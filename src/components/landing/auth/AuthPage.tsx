"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import AuthLeftPanel from "./AuthLeftPanel";
import FounderLogin from "./FounderLogin";
import FounderRegister from "./FounderRegister";
import MemberLogin from "./MemberLogin";

export default function AuthPage() {
  const searchParams = useSearchParams();

  const initialTab =
    searchParams.get("tab") === "register"
      ? "register"
      : "login";

  const [activeTab, setActiveTab] =
    useState(initialTab);

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT PANEL */}
      <AuthLeftPanel />

      {/* RIGHT PANEL */}
      <main className="relative w-full lg:w-[60%] flex items-center justify-center px-8 py-12">

        <Link
          href="/"
          className="absolute top-8 right-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400 hover:text-black transition"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <div className="w-full max-w-[650px] bg-white border border-zinc-200 rounded-2xl p-10 shadow-sm">

          <div className="flex gap-6 border-b border-zinc-200 mb-10">

            <button
              type="button"
              onClick={() => setActiveTab("login")}
            >
              Founder Login
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("register")
              }
            >
              Founder Registration
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("member")
              }
            >
              Member Login
            </button>

          </div>

          {activeTab === "login" && (
            <FounderLogin />
          )}

          {activeTab === "register" && (
            <FounderRegister />
          )}

          {activeTab === "member" && (
            <MemberLogin />
          )}

        </div>

      </main>

    </div>
  );
}