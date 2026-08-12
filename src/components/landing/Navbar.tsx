"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="bg-black text-white text-xs text-center py-2">
        • Early access offer - 100% off for the first 100 founders
      </div>

      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="text-sm tracking-[0.3em] font-semibold">
            PRIMORDIAL
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            <button><Link href="/"className="text-sm text-black">Home</Link></button>
            <button><Link href="/how-it-works">How It Works</Link></button>
            <button><Link href="/why-us">Why Us</Link></button>
            <button><Link href="/public">Public</Link></button>
            <button><Link href="/testimonials">Testimonials</Link></button>
            <button><Link href="/feedback">Feedback</Link></button>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-sm">
                <Link href="/auth?tab=login">
                   Sign in
                </Link>
            </button>

            <button className="bg-zinc-200 px-5 py-2 rounded-full text-sm">
              <Link href="/auth?tab=register">
                Get early access →
             </Link>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}