"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsCTA() {
  return (
    <section className="bg-white border-b border-neutral-200">

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
          className="text-center"
        >

          <h2 className="max-w-'800px' mx-auto text-[42px] md:text-[72px] leading-'1' font-medium text-black mb-8">
            Want to be the next voice on this page?
          </h2>

          <p className="max-w-'600px' mx-auto text-[16px] leading-8 text-neutral-500 mb-12">
            Get early access. Build with the team.
            Tell the story when you ship.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-all"
          >
            Get early access

            <ArrowRight size={16} />
          </Link>

        </motion.div>

      </div>

    </section>
  );
}