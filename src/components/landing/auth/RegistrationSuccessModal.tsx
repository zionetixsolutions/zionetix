"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationSuccessModal({
  isOpen,
  onClose,
}: Props) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-'100' flex items-center justify-center p-6">

      <div
        className="absolute inset-0 bg-white/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className="
        relative
        w-full
        max-w-md
        bg-white
        border
        border-[#E8E8E8]
        rounded-2xl
        p-12
        text-center
        shadow-2xl
      "
      >

        <div
          className="
          w-16
          h-16
          mx-auto
          mb-6
          rounded-full
          bg-[#F9F9F9]
          border
          border-[#E8E8E8]
          flex
          items-center
          justify-center
        "
        >

          <CheckCircle2
            size={28}
            className="text-black/40"
          />

        </div>

        <h3 className="text-2xl font-medium mb-4">
          Venture Initiated
        </h3>

        <p className="text-sm text-black/50 leading-relaxed mb-8">
          Your account has been created.
          Your Venture ID has been sent
          to your inbox.
          You can now login and begin building.
        </p>

        <button
          onClick={onClose}
          className="
          w-full
          bg-black
          text-white
          py-4
          rounded-lg
          text-[11px]
          uppercase
          tracking-widest
          font-bold
        "
        >
          Proceed To Login
        </button>

      </div>

    </div>
  );
}