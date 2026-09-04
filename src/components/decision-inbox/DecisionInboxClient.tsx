"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Download,
  Plus,
  Search,
  XCircle,
} from "lucide-react";

import type {
  Decision,
  DecisionStats,
} from "@/types/decision";

import CreateDecisionModal from "./CreateDecisionModal";

const emptyStats: DecisionStats = {
  total: 0,
  pending: 0,
  accepted: 0,
  rejected: 0,
  pushback: 0,
};

export default function DecisionInboxClient() {
  const router = useRouter();

  const [decisions, setDecisions] =
    useState<Decision[]>([]);

  const [stats, setStats] =
    useState<DecisionStats>(emptyStats);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [category, setCategory] =
    useState("ALL");

  const [priority, setPriority] =
    useState("ALL");

  const [updating, setUpdating] =
    useState<string | null>(null);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load decisions
  |--------------------------------------------------------------------------
  */

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/decisions",
        {
          cache: "no-store",
        }
      );

      const raw = await response.text();

      let result: {
        success?: boolean;
        message?: string;
        data?: Decision[];
        stats?: DecisionStats;
      } = {};

      if (raw.trim()) {
        try {
          result = JSON.parse(raw);
        } catch {
          throw new Error(
            `Invalid API response (${response.status})`
          );
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            `Unable to load decisions (${response.status})`
        );
      }

      setDecisions(result.data ?? []);
      setStats(result.stats ?? emptyStats);
    } catch (loadError) {
      console.error(
        "Decision Inbox load error:",
        loadError
      );

      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load decisions"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    void load();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  const categories = useMemo(
    () =>
      [
        ...new Set(
          decisions.map(
            (item) => item.category
          )
        ),
      ],
    [decisions]
  );

  /*
  |--------------------------------------------------------------------------
  | Filtered decisions
  |--------------------------------------------------------------------------
  */

  const visible = useMemo(
    () =>
      decisions.filter(
        (item) =>
          (status === "ALL" ||
            item.status === status) &&
          (category === "ALL" ||
            item.category === category) &&
          (priority === "ALL" ||
            item.priority === priority) &&
          `${item.title} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      ),
    [
      decisions,
      status,
      category,
      priority,
      search,
    ]
  );

  /*
  |--------------------------------------------------------------------------
  | Update decision
  |--------------------------------------------------------------------------
  */

  const update = async (
    id: string,
    nextStatus:
      | "ACCEPTED"
      | "REJECTED"
  ) => {
    setUpdating(id);
    setError("");

    try {
      const response = await fetch(
        `/api/decisions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const raw = await response.text();

      let result: {
        success?: boolean;
        message?: string;
      } = {};

      if (raw.trim()) {
        try {
          result = JSON.parse(raw);
        } catch {
          throw new Error(
            `Invalid API response (${response.status})`
          );
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            `Unable to update decision (${response.status})`
        );
      }

      await load();
    } catch (updateError) {
      console.error(
        "Decision update error:",
        updateError
      );

      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update decision"
      );
    } finally {
      setUpdating(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Export CSV
  |--------------------------------------------------------------------------
  */

  const exportCsv = () => {
    const rows = [
      [
        "Title",
        "Category",
        "Priority",
        "Status",
        "Created",
      ],

      ...visible.map((item) => [
        item.title,
        item.category,
        item.priority,
        item.status,
        new Date(
          item.createdAt
        ).toLocaleDateString(),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) =>
            `"${cell.replaceAll(
              '"',
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "decision-inbox.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  /*
  |--------------------------------------------------------------------------
  | Stats cards
  |--------------------------------------------------------------------------
  */

  const cards = [
    {
      icon: ClipboardList,
      number: stats.pending,
      title: "Pending Decisions",
      extra: stats.pending
        ? `${stats.pending} Awaiting review`
        : undefined,
    },

    {
      icon: CheckCircle2,
      number: stats.accepted,
      title: "Accepted",
    },

    {
      icon: XCircle,
      number: stats.rejected,
      title: "Rejected",
    },

    {
      icon: AlertTriangle,
      number: stats.pushback,
      title: "Pushback",
      extra: stats.pushback
        ? "Action needed"
        : undefined,
    },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[64px] leading-none">
              Decision Inbox
            </h1>

            <p className="mt-4 text-xl text-zinc-500">
              Review, track and manage all business
              decisions from one place.
            </p>
          </div>

          <div className="flex gap-4">
            {/* Export */}

            <button
              type="button"
              onClick={exportCsv}
              className="flex h-14 items-center gap-3 rounded-2xl border px-8 transition hover:bg-zinc-50"
            >
              Export

              <Download size={18} />
            </button>

            {/* Create Decision */}

            <button
              type="button"
              onClick={() =>
                setCreateModalOpen(true)
              }
              className="flex h-14 items-center gap-3 rounded-2xl bg-black px-8 text-white transition hover:opacity-90"
            >
              <Plus size={18} />

              New Decision
            </button>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6">
          {cards.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={item.title}
                  className="h-[190px] rounded-[28px] border bg-white p-8"
                >
                  <div className="flex justify-between">
                    <Icon size={26} />

                    <span className="text-xl">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-12">
                    <p className="uppercase text-zinc-500">
                      {item.title}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-4xl font-semibold">
                        {item.number}
                      </span>

                      {item.extra && (
                        <span className="text-sm font-medium text-emerald-600">
                          {item.extra}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Filters */}

        <div className="flex gap-4 rounded-[28px] border bg-white p-6">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search decisions..."
              className="h-14 w-full rounded-xl border pl-12 outline-none focus:border-black"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
            className="h-14 rounded-xl border px-5 outline-none focus:border-black"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="ACCEPTED">
              Accepted
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="PUSHBACK">
              Pushback
            </option>
          </select>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
            className="h-14 rounded-xl border px-5 outline-none focus:border-black"
          >
            <option value="ALL">
              All Categories
            </option>

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value
              )
            }
            className="h-14 rounded-xl border px-5 outline-none focus:border-black"
          >
            <option value="ALL">
              Priority: All
            </option>

            <option value="High Priority">
              High Priority
            </option>

            <option value="Standard Priority">
              Standard Priority
            </option>
          </select>
        </div>

        {/* Error */}

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700"
          >
            {error}
          </div>
        )}

        {/* Decision list */}

        <div className="space-y-6">
          {loading ? (
            <div className="rounded-[32px] border bg-white p-10 text-zinc-500">
              Loading decisions...
            </div>
          ) : visible.length ===
            0 ? (
            <div className="rounded-[32px] border bg-white p-10 text-zinc-500">
              No decisions match
              these filters.
            </div>
          ) : (
            visible.map(
              (item) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-[32px] border bg-white p-10"
                >
                  {/* Decision information */}

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/founder/decision-inbox/${item.id}`
                      )
                    }
                    className="max-w-[70%] text-left"
                  >
                    <div className="flex gap-3">
                      <span className="rounded-lg bg-black px-4 py-1 text-sm text-white">
                        {item.category}
                      </span>

                      <span className="rounded-lg bg-red-100 px-4 py-1 text-sm text-red-600">
                        {item.priority}
                      </span>

                      <span className="rounded-lg bg-zinc-100 px-4 py-1 text-sm">
                        {item.status.replaceAll(
                          "_",
                          " "
                        )}
                      </span>
                    </div>

                    <h3 className="mt-6 text-3xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-5 leading-8 text-zinc-600">
                      {item.description}
                    </p>
                  </button>

                  {/* Actions */}

                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      disabled={
                        updating ===
                          item.id ||
                        item.status ===
                          "ACCEPTED"
                      }
                      onClick={() =>
                        void update(
                          item.id,
                          "ACCEPTED"
                        )
                      }
                      className="h-14 w-[170px] rounded-2xl bg-black text-white disabled:opacity-50"
                    >
                      {updating ===
                      item.id
                        ? "Saving..."
                        : "Approve"}
                    </button>

                    <button
                      type="button"
                      disabled={
                        updating ===
                          item.id ||
                        item.status ===
                          "REJECTED"
                      }
                      onClick={() =>
                        void update(
                          item.id,
                          "REJECTED"
                        )
                      }
                      className="h-14 w-[170px] rounded-2xl border disabled:opacity-50"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/founder/decision-inbox/${item.id}`
                        )
                      }
                      className="h-14 w-[170px] rounded-2xl border transition hover:bg-zinc-50"
                    >
                      Details
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* Create Decision Modal */}

      <CreateDecisionModal
        open={createModalOpen}
        onClose={() =>
          setCreateModalOpen(false)
        }
        onCreated={() => {
          void load();
        }}
      />
    </>
  );
}