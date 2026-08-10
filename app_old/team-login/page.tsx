"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeamLoginPage() {
  const router = useRouter();

  const [memberId, setMemberId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

 const handleMemberLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch(
      "/api/team/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          memberId,
          password,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {

      localStorage.setItem(
        "teamMember",
        JSON.stringify(data.member)
      );

      router.push("/team-dashboard");

    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#0b0b0b] border border-zinc-800 rounded-xl p-8">

        <p className="text-xs tracking-[6px] text-zinc-500 mb-8">
          PRIMORDIAL
        </p>

        <div className="flex gap-6 border-b border-zinc-800 pb-3 mb-8">

          <a
            href="/login"
            className="text-zinc-500 hover:text-white"
          >
            SIGN IN
          </a>

          <a
            href="/register"
            className="text-zinc-500 hover:text-white"
          >
            REGISTER
          </a>

          <span className="text-white border-b border-white pb-2">
            MEMBER LOGIN
          </span>

        </div>

        <h1 className="text-white text-4xl font-serif mb-2">
          Team Access
        </h1>

        <p className="text-zinc-400 mb-8">
          Login using your Member ID.
        </p>

        <form
          onSubmit={
            handleMemberLogin
          }
          className="space-y-5"
        >

          <div>
            <label className="text-xs text-zinc-400">
              MEMBER ID
            </label>

            <input
              type="text"
              required
              value={memberId}
              onChange={(e) =>
                setMemberId(
                  e.target.value
                )
              }
              className="w-full mt-2 p-3 bg-transparent border border-zinc-700 rounded-md text-white"
              placeholder="MEM-1001"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">
              PASSWORD
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full mt-2 p-3 bg-transparent border border-zinc-700 rounded-md text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            {loading
              ? "Signing In..."
              : "Enter Team Workspace"}
          </button>

        </form>

      </div>

    </main>
  );
}