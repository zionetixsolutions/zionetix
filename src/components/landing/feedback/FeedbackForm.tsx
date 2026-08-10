"use client";

import { motion } from "framer-motion";

export default function FeedbackForm() {
  return (
    <section className="bg-white">

      <div className="max-w-'700px' mx-auto px-6 py-20">

        <motion.form
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="space-y-14"
        >

          {/* Name */}

          <div>

            <label className="block text-sm font-medium text-black mb-6">
              Name
            </label>

            <input
              type="text"
              className="w-full border-0 border-b border-neutral-200 bg-transparent pb-4 outline-none text-black"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-medium text-black mb-6">
              Email
            </label>

            <input
              type="email"
              className="w-full border-0 border-b border-neutral-200 bg-transparent pb-4 outline-none text-black"
            />

          </div>

          {/* Message */}

          <div>

            <label className="block text-sm font-medium text-black mb-6">
              Message
            </label>

            <textarea
              rows={4}
              placeholder="Tell us what you think..."
              className="w-full border-0 border-b border-neutral-200 bg-transparent pb-4 outline-none resize-none text-black placeholder:text-neutral-500"
            />

          </div>

          {/* Button */}

          <div className="pt-8 flex justify-center">

            <button
              type="submit"
              className="w-full md:w-'560px' bg-[#171717] text-white py-5 rounded-full font-medium hover:opacity-90 transition-all"
            >
              Send Feedback
            </button>

          </div>

        </motion.form>

      </div>

    </section>
  );
}