"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
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
        p-10
        shadow-2xl
      "
      >

        <h3 className="text-2xl font-medium mb-4">
          Reset Password
        </h3>

        <p className="text-sm text-black/50 mb-8">
          We will send a secure reset link
          to your registered email address.
        </p>

        <form className="space-y-6">

          <div>

            <label
              className="
              block
              text-[10px]
              uppercase
              tracking-widest
              font-bold
              text-black/40
              mb-2
            "
            >
              Registered Email
            </label>

            <input
              type="email"
              placeholder="name@venture.com"
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
            tracking-widest
            font-bold
          "
          >
            Send Link
          </button>

        </form>

      </div>

    </div>
  );
}