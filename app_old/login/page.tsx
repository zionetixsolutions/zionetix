"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
  "/api/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
);

      const result = await response.json();

      if (result.success) {
        localStorage.setItem(
            "ventureId",
             result.venture.id
        );

        localStorage.setItem(
            "ventureName",
             result.venture.venture_name
        );
        localStorage.setItem(
          "accessToken",
          result.accessToken
        );

        router.push("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#0b0b0b] border border-zinc-800 rounded-xl p-8">

        <p className="text-xs tracking-[6px] text-zinc-500 mb-8">
          PRIMORDIAL
        </p>

        <div className="flex gap-6 border-b border-zinc-800 pb-3 mb-8">

  <span className="text-white border-b border-white pb-2">
    SIGN IN
  </span>

  <a
    href="/register"
    className="text-zinc-500 hover:text-white"
  >
    REGISTER
  </a>

  <a
    href="/team-login"
    className="text-zinc-500 hover:text-white"
  >
    MEMBER LOGIN
  </a>

</div>

        <h1 className="text-white text-4xl font-serif mb-2">
          Welcome back.
        </h1>

        <p className="text-zinc-400 mb-8">
          Sign in to your workspace.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="text-xs text-zinc-400">
              EMAIL
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-2 p-3 bg-transparent border border-zinc-700 rounded-md text-white"
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
                setPassword(e.target.value)
              }
              className="w-full mt-2 p-3 bg-transparent border border-zinc-700 rounded-md text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-md font-semibold"
          >
            {loading
              ? "Signing In..."
              : "Enter Workspace"}
          </button>
        </form>
      </div>
    </main>
  );
}