"use client";

import {
  MoreHorizontal,
} from "lucide-react";

export default function BrainMapTable() {
  return (
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-3xl
      overflow-hidden
      "
    >
      <div className="p-6 border-b">
        <h3 className="font-semibold text-xl">
          Recent Brain Maps
        </h3>
      </div>

      <table className="w-full">

        <thead>
          <tr
            className="
            border-b
            text-xs
            text-zinc-500
            "
          >
            <th className="p-5 text-left">
              BRAIN MAP
            </th>

            <th className="p-5 text-left">
              WORKSPACE
            </th>

            <th className="p-5 text-left">
              NODES
            </th>

            <th className="p-5 text-left">
              UPDATED
            </th>

            <th className="p-5 text-left">
              STATUS
            </th>

            <th />
          </tr>
        </thead>

        <tbody>

          <tr className="border-b">
            <td className="p-5">
              Technology Architecture
            </td>

            <td className="p-5">
              Engineering
            </td>

            <td className="p-5">
              112
            </td>

            <td className="p-5">
              3h ago
            </td>

            <td className="p-5">
              <span
                className="
                bg-emerald-50
                text-emerald-600
                px-3
                py-1
                rounded-lg
                text-xs
                "
              >
                ACTIVE
              </span>
            </td>

            <td className="p-5">
              <MoreHorizontal size={18} />
            </td>
          </tr>

          <tr className="border-b">
            <td className="p-5">
              Go-To-Market Strategy
            </td>

            <td className="p-5">
              Sales
            </td>

            <td className="p-5">
              65
            </td>

            <td className="p-5">
              Yesterday
            </td>

            <td className="p-5">
              <span
                className="
                bg-emerald-50
                text-emerald-600
                px-3
                py-1
                rounded-lg
                text-xs
                "
              >
                ACTIVE
              </span>
            </td>

            <td className="p-5">
              <MoreHorizontal size={18} />
            </td>
          </tr>

          <tr>
            <td className="p-5">
              Fundraising Roadmap
            </td>

            <td className="p-5">
              Finance
            </td>

            <td className="p-5">
              28
            </td>

            <td className="p-5">
              2d ago
            </td>

            <td className="p-5">
              <span
                className="
                bg-zinc-100
                text-zinc-600
                px-3
                py-1
                rounded-lg
                text-xs
                "
              >
                ARCHIVED
              </span>
            </td>

            <td className="p-5">
              <MoreHorizontal size={18} />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}