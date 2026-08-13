"use client";
import { useRouter } from "next/navigation";


import { Decision } from "@/types/decision";

interface Props {
  decision: Decision;
}

export default function DecisionCard({
  decision,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="
      bg-white
      border
      rounded-[32px]
      p-10
      flex
      justify-between
      "
    >
      <div className="max-w-[70%]" onClick={() => {
  router.push(`/founder/decision-inbox/${decision.id}`);
}}>

        <div className="flex gap-3">

          <span className="bg-black text-white px-4 py-1 rounded-lg text-sm">
            {decision.category}
          </span>

          <span className="bg-red-100 text-red-600 px-4 py-1 rounded-lg text-sm">
            {decision.priority}
          </span>

          <span className="bg-zinc-100 px-4 py-1 rounded-lg text-sm">
            {decision.status}
          </span>

        </div>

        <h3 className="text-3xl font-semibold mt-6">
          {decision.title}
        </h3>

        <p className="text-zinc-600 mt-5 leading-8">
          {decision.description}
        </p>

      </div>

      <div className="flex flex-col gap-4">
        <button className="h-14 w-[170px] bg-black text-white rounded-2xl">
          Approve
        </button>

        <button className="h-14 w-[170px] border rounded-2xl">
          Reject
        </button>

        <button className="h-14 w-[170px] border rounded-2xl">
          Details
        </button>
      </div>
    </div>
  );
}