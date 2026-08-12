import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LogsHeader() {
  return (
    <section className="space-y-6">

      {/* Breadcrumb */}

      <div className="space-y-3">

        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">

          <span>Dashboard</span>

          <span>›</span>

          <span>Logs</span>

        </div>

        <Link
          href="/founder/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-black"
        >
          <ArrowLeft size={16} />

          Back to Dashboard

        </Link>

      </div>

      {/* Title */}

      <div>

        <h1 className="font-serif text-5xl leading-none tracking-tight text-black">
          System Logs
        </h1>

        <p className="mt-3 max-w-3xl text-lg italic text-zinc-500">
          Comprehensive audit trail of platform events,
          security actions and user activity across your
          workspace.
        </p>

      </div>

    </section>
  );
}