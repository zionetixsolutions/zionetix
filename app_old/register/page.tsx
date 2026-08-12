"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [ventureName, setVentureName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            ventureName,
          }),
        }
      );

      const result =
        await response.json();

      if (result.success) {
        alert(
          "Registration Successful"
        );

        router.push("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
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
          <a
            href="/login"
            className="text-zinc-500"
          >
            SIGN IN
          </a>

          <span className="text-white border-b border-white pb-2">
            REGISTER
          </span>
        </div>

        <h1 className="text-white text-4xl font-serif mb-2">
          Create Account.
        </h1>

        <p className="text-zinc-400 mb-8">
          Begin your journey.
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full p-3 bg-transparent border border-zinc-700 rounded-md text-white"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 bg-transparent border border-zinc-700 rounded-md text-white"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 bg-transparent border border-zinc-700 rounded-md text-white"
          />

          <input
            type="text"
            placeholder="Venture Name"
            required
            value={ventureName}
            onChange={(e) =>
              setVentureName(e.target.value)
            }
            className="w-full p-3 bg-transparent border border-zinc-700 rounded-md text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-md font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>
      </div>
    </main>
  );
}