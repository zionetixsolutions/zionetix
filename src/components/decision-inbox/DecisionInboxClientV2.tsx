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
  DecisionsResponse,
  DecisionStats,
  DecisionStatus,
} from "@/types/decision";

import CreateDecisionModal from "./CreateDecisionModal";

/*
|--------------------------------------------------------------------------
| Empty statistics
|--------------------------------------------------------------------------
*/

const emptyStats: DecisionStats = {
  total: 0,
  pending: 0,
  accepted: 0,
  rejected: 0,
  pushback: 0,
};

/*
|--------------------------------------------------------------------------
| Decision Inbox Client V2
|--------------------------------------------------------------------------
*/

export default function DecisionInboxClientV2() {
  const router = useRouter();

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

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
    useState<"ALL" | DecisionStatus>("ALL");

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

      let result: DecisionsResponse | null =
        null;

      /*
      |----------------------------------------------------------------------
      | Safely parse API response
      |----------------------------------------------------------------------
      */

      if (raw.trim()) {
        try {
          result =
            JSON.parse(raw) as DecisionsResponse;
        } catch {
          throw new Error(
            `Invalid API response (${response.status})`
          );
        }
      }

      /*
      |----------------------------------------------------------------------
      | Handle failed response
      |----------------------------------------------------------------------
      */

      if (
        !response.ok ||
        !result ||
        !result.success
      ) {
        throw new Error(
          result?.message ||
            `Unable to load decisions (${response.status})`
        );
      }

      /*
      |----------------------------------------------------------------------
      | Store data
      |----------------------------------------------------------------------
      */

      setDecisions(
        result.data ?? []
      );

      setStats(
        result.stats ?? emptyStats
      );
    } catch (cause) {
      console.error(
        "Decision Inbox load error:",
        cause
      );

      setError(
        cause instanceof Error
          ? cause.message
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
    const timer =
      window.setTimeout(() => {
        void load();
      });

    return () => {
      window.clearTimeout(timer);
    };
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
        (item) => {
          const matchesStatus =
            status === "ALL" ||
            item.status === status;

          const matchesCategory =
            category === "ALL" ||
            item.category === category;

          const matchesPriority =
            priority === "ALL" ||
            item.priority === priority;

          const searchText = `
            ${item.title}
            ${item.situation ?? ""}
            ${item.recommendation ?? ""}
            ${item.category}
          `
            .toLowerCase()
            .trim();

          const matchesSearch =
            searchText.includes(
              search.toLowerCase().trim()
            );

          return (
            matchesStatus &&
            matchesCategory &&
            matchesPriority &&
            matchesSearch
          );
        }
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
  | Update decision status
  |--------------------------------------------------------------------------
  */

  const update = async (
    id: string,
    nextStatus: DecisionStatus
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
          result = JSON.parse(raw) as {
            success?: boolean;
            message?: string;
          };
        } catch {
          throw new Error(
            `Invalid API response (${response.status})`
          );
        }
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            `Unable to update decision (${response.status})`
        );
      }

      /*
      |----------------------------------------------------------------------
      | Reload inbox so status + statistics stay synchronized
      |----------------------------------------------------------------------
      */

      await load();
    } catch (cause) {
      console.error(
        "Decision update error:",
        cause
      );

      setError(
        cause instanceof Error
          ? cause.message
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
          .map(
            (cell) =>
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
  | Statistics cards
  |--------------------------------------------------------------------------
  */

  const cards = [
    {
      icon: ClipboardList,
      number: stats.pending,
      title: "Pending Decisions",
    },

    {
      icon: CheckCircle2,
      number: stats.accepted,
      title: "Approved",
    },

    {
      icon: XCircle,
      number: stats.rejected,
      title: "Rejected",
    },

    {
      icon: AlertTriangle,
      number: stats.pushback,
      title: "Needs Review",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <div className="space-y-8">

        {/* ---------------------------------------------------------------
            Header
        ---------------------------------------------------------------- */}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[64px] leading-none font-serif">
              Decision Inbox
            </h1>

            <p className="mt-4 text-zinc-500 text-xl">
              Review, track and manage all business
              decisions from one place.
            </p>
          </div>

          <div className="flex gap-4">

            {/* Export */}

            <button
              type="button"
              onClick={exportCsv}
              className="h-14 px-8 border rounded-2xl flex items-center gap-3 transition hover:bg-zinc-50"
            >
              Export

              <Download size={18} />
            </button>

            {/* New Decision */}

            <button
              type="button"
              onClick={() =>
                setCreateModalOpen(true)
              }
              className="h-14 px-8 bg-black text-white rounded-2xl flex items-center gap-3 transition hover:opacity-90"
            >
              <Plus size={18} />

              New Decision
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            Statistics
        ---------------------------------------------------------------- */}

        <div className="grid grid-cols-4 gap-6">
          {cards.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white border rounded-[28px] p-8 h-[190px]"
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

                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-4xl font-semibold">
                        {item.number}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* ---------------------------------------------------------------
            Filters
        ---------------------------------------------------------------- */}

        <div className="bg-white border rounded-[28px] p-6 flex gap-4">

          {/* Search */}

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
              className="h-14 w-full border rounded-xl pl-12 outline-none focus:border-black"
            />
          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | "ALL"
                  | DecisionStatus
              )
            }
            className="h-14 px-5 border rounded-xl outline-none focus:border-black"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="ACCEPTED">
              Approved
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="PUSHBACK">
              Needs Review
            </option>
          </select>

          {/* Category */}

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
            className="h-14 px-5 border rounded-xl outline-none focus:border-black"
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

          {/* Priority */}

          <select
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value
              )
            }
            className="h-14 px-5 border rounded-xl outline-none focus:border-black"
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

        {/* ---------------------------------------------------------------
            Error
        ---------------------------------------------------------------- */}

        {error && (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 text-red-700 rounded-2xl px-6 py-4"
          >
            {error}
          </div>
        )}

        {/* ---------------------------------------------------------------
            Decision list
        ---------------------------------------------------------------- */}

        <div className="space-y-6">

          {loading ? (
            <div className="bg-white border rounded-[32px] p-10 text-zinc-500">
              Loading decisions...
            </div>
          ) : visible.length === 0 ? (
            <div className="bg-white border rounded-[32px] p-10 text-zinc-500">
              No decisions match these filters.
            </div>
          ) : (
            visible.map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-[32px] p-10 flex justify-between"
                >

                  {/* -----------------------------------------------------
                      Decision information
                  ------------------------------------------------------ */}

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

                      {/* Category */}

                      <span className="bg-black text-white px-4 py-1 rounded-lg text-sm">
                        {item.category}
                      </span>

                      {/* Priority */}

                      <span className="bg-red-100 text-red-600 px-4 py-1 rounded-lg text-sm">
                        {item.priority}
                      </span>

                      {/* Status */}

                      <span className="bg-zinc-100 px-4 py-1 rounded-lg text-sm">
                        {item.status.replaceAll(
                          "_",
                          " "
                        )}
                      </span>
                    </div>

                    <h3 className="text-3xl font-semibold mt-6">
                      {item.title}
                    </h3>

                    <p className="text-zinc-600 mt-5 leading-8">
                      {item.recommendation ??
                        item.situation ??
                        "Decision submitted for review."}
                    </p>
                  </button>

                  {/* -----------------------------------------------------
                      Actions
                  ------------------------------------------------------ */}

                  <div className="flex flex-col gap-4">

                    {/* Approve */}

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
                      className="h-14 w-[170px] bg-black text-white rounded-2xl disabled:opacity-50 transition hover:opacity-90"
                    >
                      {updating ===
                      item.id
                        ? "Saving..."
                        : "Approve"}
                    </button>

                    {/* Reject */}

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
                      className="h-14 w-[170px] border rounded-2xl disabled:opacity-50 transition hover:bg-zinc-50"
                    >
                      Reject
                    </button>

                    {/* Details */}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/founder/decision-inbox/${item.id}`
                        )
                      }
                      className="h-14 w-[170px] border rounded-2xl transition hover:bg-zinc-50"
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

      {/* -----------------------------------------------------------------
          Create Decision Modal
      ------------------------------------------------------------------ */}

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