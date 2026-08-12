"use client";

import { useState } from "react";
import Image from "next/image";
import RegistrationSuccessModal
  from "./RegistrationSuccessModal";

  
export default function FounderRegister() {

  const [fullName, setFullName] =
    useState("");

  const [ventureName, setVentureName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

    const [profileImage, setProfileImage] =
  useState<File | null>(null);

const [previewUrl, setPreviewUrl] =
  useState("");

  const [loading,setLoading] =
  useState(false);

  const [error,setError] =
  useState("");  

   const [showSuccessModal,
  setShowSuccessModal] =
  useState(false); 

  const handleProfileImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  setProfileImage(file);

  setPreviewUrl(
    URL.createObjectURL(file)
  );

};

  const handleRegister = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setError("");

  setLoading(true);
  
  if (
  password !==
  confirmPassword
) {

  setError(
    "Passwords do not match"
  );

  return;

}

  try {

  const formData = new FormData();

  formData.append("fullName", fullName);
  formData.append("ventureName", ventureName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPassword", confirmPassword);

  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    setError(data.message);
    return;
  }

  setShowSuccessModal(true);

} catch (error) {

  console.error(error);

  setError("Something went wrong");

} finally {

  setLoading(false);

}

};
  return (
    <>
    <div className="space-y-8">

      <div>

        <h2 className="text-[36px] font-medium">
          Create Your Venture.
        </h2>

        <p className="text-sm text-black/50 mt-2">
          Start building your vision
          with integrated AI guidance.
        </p>

      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
  
        <div className="flex flex-col items-center pb-4">

  <label
    htmlFor="profile-upload"
    className="cursor-pointer"
  >

    <div
      className="
      w-28
      h-28
      rounded-full
      border-2
      border-dashed
      border-[#E8E8E8]
      overflow-hidden
      bg-[#F9F9F9]
      flex
      items-center
      justify-center
      hover:border-black
      transition
    "
    >

      {
        previewUrl ?

        (

         <Image
  src={previewUrl}
  alt="Profile Preview"
  width={112}
  height={112}
  className="w-full h-full object-cover"
/>

        )

        :

        (

          <div className="text-center">

            <div className="text-3xl">
              +
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Upload
            </p>

          </div>

        )

      }

    </div>

  </label>

  <input
    id="profile-upload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleProfileImage}
  />

  <p className="text-xs text-gray-400 mt-3">
    Profile Picture (Optional)
  </p>

</div>
        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
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
            placeholder="Venture Name"
            value={ventureName}
            onChange={(e) =>
              setVentureName(
                e.target.value
              )
            }
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

        </div>

        <input
          placeholder="Work Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
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

        <div className="grid grid-cols-2 gap-4">

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
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
            placeholder="Confirm"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
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
        text-red-600
        text-sm
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
  disabled:opacity-60
  disabled:cursor-not-allowed
"
>
  {
    loading
      ? "CREATING..."
      : "CREATE VENTURE"
  }
</button>

      </form>

    </div>
    <RegistrationSuccessModal
  isOpen={showSuccessModal}
  onClose={() =>
    setShowSuccessModal(false)
  }
/>
</>
  );
}