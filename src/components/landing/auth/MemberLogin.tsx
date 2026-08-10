"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberLogin() {
  const router = useRouter();
  const [memberId, setMemberId] =
  useState("");

const [password, setPassword] =
  useState("");

const [error, setError] =
  useState("");

  const handleLogin = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  console.log(
    "LOGIN BUTTON CLICKED"
  );
  e.preventDefault();

  const response =
    await fetch(
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
console.log(
  "Status:",
  response.status
);
  const data =
    await response.json();
if (data.success) {

  localStorage.setItem(
    "member",
    JSON.stringify(
      data.member
    )
  );

  router.push(
    "/team/dashboard"
  );

}
  if (!data.success) {

    setError(
      data.message
    );

    return;
  }



  localStorage.setItem(
    "member",
    JSON.stringify(
      data.member
    )
  );

  router.push(
    "/team/dashboard"
  );
};

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-[36px] font-medium">
          Team Member Login
        </h2>

        <p className="text-sm text-black/50 mt-2">
          Access your assigned workspace
          and modules.
        </p>

      </div>

      <form onSubmit={handleLogin}className="space-y-5">
{
  error && (
    <p
      className="
      text-red-500
      text-sm
    "
    >
      {error}
    </p>
  )
}
        <input
  value={memberId}
  onChange={(e) =>
    setMemberId(
      e.target.value
    )
  }
  placeholder="MEM-0001"
  className="
  w-full
  bg-[#F9F9F9]
  border
  border-[#E8E8E8]
  rounded-lg
  px-4
  py-3
"
/>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="••••••••"
          className="
          w-full
          bg-[#F9F9F9]
          border
          border-[#E8E8E8]
          rounded-lg
          px-4
          py-3
        "
        />

        <button
  type="submit"
  className="
  w-full
  bg-black
  text-white
  py-4
  rounded-lg
  text-[11px]
  uppercase
  tracking-[0.2em]
  font-bold
"
>
  Enter Workspace
</button>

      </form>

    </div>
  );
}