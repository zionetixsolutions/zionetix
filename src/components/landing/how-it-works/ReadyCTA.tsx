"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ReadyCTA() {
  return (
    <section className="bg-[#f7f7f3]">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-32">

        <motion.div
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
          transition={{
            duration: 0.6,
          }}
          className="bg-white border border-neutral-200 rounded-[36px] p-10 md:p-16 text-center"
        >

          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
            Early Access
          </p>

          <h2 className="max-w-'850px' mx-auto text-[42px] md:text-[72px] leading-'1' font-medium text-black mb-8">
            Ready to meet the team?
          </h2>

          <p className="max-w-'560px' mx-auto text-[16px] leading-8 text-neutral-600 mb-12">
            Reserve your seat in early access.
            Free while we are rolling out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-all"
            >
              Get early access

              <ArrowRight size={16} />
            </Link>

            <Link
              href="/public"
              className="inline-flex items-center gap-2 border border-neutral-300 px-8 py-4 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-all"
            >
              Read the case

              <ArrowRight size={16} />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}