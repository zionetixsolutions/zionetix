"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PublicCTA() {
  return (
    <section className="bg-white">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-32">

        <div className="max-w-'1000px' mx-auto border border-neutral-200 rounded-'32px' bg-white p-16 text-center">

          <h2 className="text-[44px] md:text-[64px] leading-none font-medium text-black mb-6">
            Want to be on this page?
          </h2>

          <p className="text-neutral-500 mb-10">
            Get early access. Build with the team.
            Ship in public.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-xl"
          >
            Get early access

            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </section>
  );
}