"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyUsCTA() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-40">

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
          className="flex flex-col items-center text-center"
        >

          <div className="flex items-center gap-2 mb-8">

            <div className="w-2 h-2 rounded-full bg-emerald-500" />

            <p className="text-[12px] text-neutral-500">
              100% off for the first 100 founders
            </p>

          </div>

          <h2 className="max-w-'720px' text-[42px] md:text-[64px] leading-[1.05] font-medium text-black mb-8">
            The team you couldnt hire yet.
            Hire it now.
          </h2>

          <p className="text-[15px] text-neutral-500 mb-12 max-w-'520px'">
            Early access is free for the first 100 founders.
            No credit card. No catch.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">

            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-7 py-3 rounded-xl text-sm hover:opacity-90 transition-all"
            >
              Get early access

              <ArrowRight size={15} />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-7 py-3 rounded-xl text-sm hover:bg-neutral-50 transition-all"
            >
              See how it works

              <ArrowRight size={15} />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}