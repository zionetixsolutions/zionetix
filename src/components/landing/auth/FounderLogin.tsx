"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotVentureModal from "./ForgotVentureModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function FounderLogin() {
  const router = useRouter();

  const [error, setError] = useState("");

  const [loading, setLoading] =useState(false);

  const [email, setEmail] =
    useState("");

  const [ventureId, setVentureId] =
    useState("");

  const [password, setPassword] =
    useState("");
  
  const [showVentureModal,setShowVentureModal] =
    useState(false);

  const [showPasswordModal,setShowPasswordModal] =
    useState(false);  

const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

setError("");

setLoading(true);

try {

  const response =
    await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          venture_id: ventureId,
          password,
        }),
      }
    );

  const data =
    await response.json();

  if (!data.success) {

    setError(
      data.message
    );

    return;
  }
localStorage.setItem(
    "accessToken",
    data.accessToken
  );

  router.push("/founder");

} catch (error) {

  console.error(error);

  setError(
    "Something went wrong"
  );

} finally {

  setLoading(false);

}

};

  return (
    <>
    <div className="space-y-8">

      <div className="space-y-2">

        <h2
          className="
          text-[36px]
          font-medium
          text-[#0A0A0A]
        "
        >
          Welcome back.
        </h2>

        <p
          className="
          text-sm
          text-black/50
        "
        >
          Enter your credentials to
          access your venture.
        </p>

      </div>

      <form  onSubmit={handleLogin}
        className="space-y-5"
      >

        <div>

          <label
            className="
            block
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-bold
            text-black/40
            mb-2
          "
          >
            Founder Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="name@venture.com"
            className="
            w-full
            bg-[#F9F9F9]
            border
            border-[#E8E8E8]
            rounded-lg
            px-4
            py-3
            text-sm
            focus:border-black
            focus:outline-none
          "
          />

        </div>

        <div>

          <label
            className="
            block
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-bold
            text-black/40
            mb-2
          "
          >
            Venture ID
          </label>

          <input
            type="text"
            value={ventureId}
            onChange={(e) =>
              setVentureId(
                e.target.value
              )
            }
            placeholder="VNT-XXXX"
            className="
            w-full
            bg-[#F9F9F9]
            border
            border-[#E8E8E8]
            rounded-lg
            px-4
            py-3
            text-sm
            focus:border-black
            focus:outline-none
          "
          />

          <button
              type="button"
              onClick={() =>
            setShowVentureModal(true)
            }
              className="
              mt-2
              text-[10px]
              uppercase
              tracking-widest
              font-bold
              text-black/40
              hover:text-black
               transition-all"
              >
                 Forgot Venture ID?
          </button>

        </div>

        <div>

          <label
            className="
            block
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-bold
            text-black/40
            mb-2
          "
          >
            Password
          </label>

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
            text-sm
            focus:border-black
            focus:outline-none
          "
          />

         <button
  type="button"
  onClick={() =>
    setShowPasswordModal(true)
  }
  className="
  mt-2
  text-[10px]
  uppercase
  tracking-widest
  font-bold
  text-black/40
  hover:text-black
  transition-all
"
>
  Forgot Password?
</button>

        </div>

{
  error && (

    <div
      className="
      bg-red-50
      border
      border-red-200
      rounded-lg
      px-4
      py-3
    "
    >
      <p
        className="
        text-sm
        text-red-600
      "
      >
        {error}
      </p>
    </div>

  )
}

       <button
  type="submit"
  disabled={loading}
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
    hover:bg-zinc-800
    transition-all
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {
    loading
      ? "AUTHORIZING..."
      : "AUTHORIZE LOGIN"
  }
</button>

      </form>

    </div>
    <ForgotVentureModal
  isOpen={showVentureModal}
  onClose={() =>
    setShowVentureModal(false)
  }
/>

<ForgotPasswordModal
  isOpen={showPasswordModal}
  onClose={() =>
    setShowPasswordModal(false)
  }
/>
</>
  );
}