"use client";
import DecisionRejectModal from "./DecisionRejectModal";
import DecisionRequestChangesModal from "./DecisionRequestChangesModal";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileEdit,
  XCircle,
} from "lucide-react";
import type { DecisionStatus } from "@/types/decision";

interface DecisionRecord {
  id: string;
  category: string;
  title: string;
  situation: string | null;
  recommendation: string | null;
  reasoning: unknown;
  risk_if_ignored: string | null;
  confidence_score: number | null;
  status: DecisionStatus;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface ActivityRecord {
  id: string;
  decision_id: string;
  venture_id: string;
  action:
    | "CREATED"
    | "ACCEPTED"
    | "REJECTED"
    | "PUSHBACK"
    | "STATUS_CHANGED"
    | "COMMENTED";
  previous_status: DecisionStatus | null;
  new_status: DecisionStatus | null;
  comment: string | null;
  performed_by: string | null;
  performed_by_type: string;
  created_at: string;
}

interface DecisionResponse {
  success: boolean;
  message?: string;
  data?: DecisionRecord;
}

interface ActivityResponse {
  success: boolean;
  message?: string;
  data?: ActivityRecord[];
}

const formatDate = (value: string | null) => {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
};

const getReasoningItems = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return item;
    }

    if (
      typeof item === "object" &&
      item !== null &&
      "point" in item
    ) {
      return String(
        (item as { point: unknown }).point
      );
    }

    try {
      return JSON.stringify(item);
    } catch {
      return String(item);
    }
  });
};

const formatStatus = (status: string | null) => {
  if (!status) {
    return "—";
  }

  return status.replaceAll("_", " ");
};

const formatActivityAction = (action: ActivityRecord["action"]) => {
  switch (action) {
    case "CREATED":
      return "Decision Created";

    case "ACCEPTED":
      return "Decision Accepted";

    case "REJECTED":
      return "Decision Rejected";

    case "PUSHBACK":
      return "Changes Requested";

    case "COMMENTED":
      return "Comment Added";

    case "STATUS_CHANGED":
      return "Status Changed";

    default:
      return action;
  }
};

export default function DecisionDetailsClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params.id;

  const [decision, setDecision] =
    useState<DecisionRecord | null>(null);

  const [activities, setActivities] =
    useState<ActivityRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activityError, setActivityError] =
    useState("");

const [rejectModalOpen, setRejectModalOpen] = useState(false);
const [requestChangesModalOpen, setRequestChangesModalOpen] =
  useState(false);

  const loadDecision = async () => {
    if (!id) {
      setError("Decision ID is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/decisions/${id}`,
        {
          cache: "no-store",
        }
      );

      const result =
        (await response.json()) as DecisionResponse;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Unable to load decision"
        );
      }

      setDecision(result.data);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to load decision"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadActivity = async () => {
    if (!id) {
      setActivityLoading(false);
      return;
    }

    setActivityError("");

    try {
      const response = await fetch(
        `/api/decisions/${id}/activity`,
        {
          cache: "no-store",
        }
      );

      const result =
        (await response.json()) as ActivityResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to load decision activity"
        );
      }

      setActivities(result.data ?? []);
    } catch (cause) {
      setActivityError(
        cause instanceof Error
          ? cause.message
          : "Unable to load decision activity"
      );
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDecision();
      void loadActivity();
    });

    return () => {
      window.clearTimeout(timer);
    };
  }, [id]);

  const updateDecision = async (
  nextStatus: DecisionStatus,
  comment?: string
) => {
  if (!decision) {
    return;
  }

  setSaving(true);
  setError("");

  try {
    const response = await fetch(
      `/api/decisions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
          comment: comment ?? null,
        }),
      }
    );

    const result =
      (await response.json()) as DecisionResponse;

    if (!response.ok || !result.success || !result.data) {
      throw new Error(
        result.message ||
          "Unable to update decision"
      );
    }

    setDecision(result.data);

    await loadActivity();
  } catch (cause) {
    setError(
      cause instanceof Error
        ? cause.message
        : "Unable to update decision"
    );
  } finally {
    setSaving(false);
  }
};
  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-8 text-zinc-500">
        Loading decision...
      </div>
    );
  }

  if (!decision) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-2xl px-6 py-4">
          {error || "Decision not found."}
        </div>
      </div>
    );
  }

  const reasoningItems = getReasoningItems(
    decision.reasoning
  );

  const priority =
    decision.confidence_score !== null &&
    decision.confidence_score >= 80
      ? "High Priority"
      : "Standard Priority";

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Back */}
      <button
        onClick={() =>
          router.push("/founder/decision-inbox")
        }
        className="flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Decision Inbox
      </button>

      {/* Metadata badges */}
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded bg-black text-white text-[10px] uppercase tracking-wider font-bold">
          {decision.category}
        </span>

        <span className="px-3 py-1 rounded bg-red-100 text-red-700 text-[10px] uppercase tracking-wider font-bold">
          {priority}
        </span>

        <span className="px-3 py-1 rounded bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-wider font-bold">
          {formatStatus(decision.status)}
        </span>
      </div>

      {/* Header */}
      <h1 className="font-serif text-6xl leading-none mt-6">
        Decision Inbox
      </h1>

      <p className="mt-3 text-lg italic text-zinc-500">
        Review, track and manage all business decisions
        from one place.
      </p>

      <h2 className="text-5xl font-bold mt-8">
        {decision.title}
      </h2>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 text-red-700 rounded-2xl px-6 py-4 mt-6"
        >
          {error}
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Left */}
        <div className="col-span-8 space-y-6">
          {/* Executive Summary */}
          <section className="bg-white rounded-3xl border border-zinc-200 p-10 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">
              Executive Summary
            </h3>

            <p className="leading-8 text-zinc-600">
              {decision.recommendation ??
                decision.situation ??
                "No executive summary was provided."}
            </p>
          </section>

          {/* Business Context + Risk */}
          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4">
                Business Context
              </h3>

              <p className="text-zinc-600 leading-8">
                {decision.situation ??
                  "No business context was provided."}
              </p>
            </section>

            <section className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4">
                Risk If Ignored
              </h3>

              <p className="text-zinc-600 leading-8">
                {decision.risk_if_ignored ??
                  "No risk assessment was provided."}
              </p>
            </section>
          </div>

          {/* Proposed Decision */}
          <section className="bg-white rounded-3xl border border-zinc-200 p-10 shadow-sm">
            <h3 className="text-xl font-semibold mb-8">
              Proposed Decision
            </h3>

            <div className="space-y-6">
              {reasoningItems.length > 0 ? (
                reasoningItems.map((item, index) => (
                  <div
                    key={`${index}-${item}`}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-1 text-black"
                    />

                    <p className="text-zinc-600 leading-7">
                      {item}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-zinc-600 leading-7">
                  {decision.recommendation ??
                    "No proposed actions were provided."}
                </p>
              )}
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="bg-white rounded-3xl border border-zinc-200 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">
                Activity Timeline
              </h3>

              <span className="text-xs uppercase tracking-widest text-zinc-400">
                {activities.length}{" "}
                {activities.length === 1
                  ? "Event"
                  : "Events"}
              </span>
            </div>

            {activityLoading ? (
              <p className="text-zinc-500">
                Loading activity...
              </p>
            ) : activityError ? (
              <div className="border border-red-200 bg-red-50 text-red-700 rounded-2xl px-5 py-4">
                {activityError}
              </div>
            ) : activities.length === 0 ? (
              <p className="text-zinc-500">
                No activity has been recorded yet.
              </p>
            ) : (
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 h-3 w-3 rounded-full bg-black shrink-0" />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold">
                          {formatActivityAction(
                            activity.action
                          )}
                        </p>

                        <span className="text-xs text-zinc-400 whitespace-nowrap">
                          {formatDate(
                            activity.created_at
                          )}
                        </span>
                      </div>

                      {activity.previous_status ||
                      activity.new_status ? (
                        <p className="text-sm text-zinc-500 mt-1">
                          {activity.previous_status
                            ? `${formatStatus(
                                activity.previous_status
                              )} → `
                            : ""}
                          {formatStatus(
                            activity.new_status
                          )}
                        </p>
                      ) : null}

                      {activity.comment ? (
                        <p className="text-zinc-600 mt-2 leading-7">
                          {activity.comment}
                        </p>
                      ) : null}

                      <p className="text-xs text-zinc-400 mt-2 uppercase tracking-wider">
                        {activity.performed_by_type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right */}
        <div className="col-span-4 space-y-6">
          {/* Actions */}
          <section className="sticky top-24 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="space-y-3">
              <button
  disabled={
    saving ||
    decision.status === "ACCEPTED"
  }
  onClick={() =>
    void updateDecision("ACCEPTED")
  }
  className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-2xl font-medium disabled:opacity-50"
>
  <CheckCircle2 size={18} />

  {saving
    ? "Saving..."
    : "Approve Decision"}
</button>

              <button
  disabled={
    saving ||
    decision.status === "REJECTED"
  }
  onClick={() =>
    setRejectModalOpen(true)
  }
  className="w-full flex items-center justify-center gap-2 border border-zinc-200 bg-white py-3 rounded-2xl font-medium disabled:opacity-50"
>
  <XCircle size={18} />

  Reject Decision
</button>

            <button
  disabled={
    saving ||
    decision.status === "PUSHBACK"
  }
  onClick={() =>
    setRequestChangesModalOpen(true)
  }
  className="w-full flex items-center justify-center gap-2 border border-zinc-200 bg-white py-3 rounded-2xl font-medium disabled:opacity-50"
>
  <FileEdit size={18} />

  Request Changes
</button>
            </div>
          </section>

          {/* Metadata */}
          <section className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                Created By
              </p>

              <p className="font-medium">
                {decision.created_by ?? "AI"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                Created Date
              </p>

              <p className="font-medium">
                {formatDate(decision.created_at)}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                Last Updated
              </p>

              <p className="font-medium">
                {formatDate(decision.updated_at)}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                Confidence Score
              </p>

              <p className="font-medium">
                {decision.confidence_score ?? "—"}
              </p>
            </div>
          </section>
        </div>
      </div>
      <DecisionRejectModal
  open={rejectModalOpen}
  onClose={() => setRejectModalOpen(false)}
  onReject={(comment) => {
    setRejectModalOpen(false);
    void updateDecision("REJECTED", comment);
  }}
/>

<DecisionRequestChangesModal
  open={requestChangesModalOpen}
  onClose={() =>
    setRequestChangesModalOpen(false)
  }
  onSubmit={(comment) => {
    setRequestChangesModalOpen(false);
    void updateDecision("PUSHBACK", comment);
  }}
/>
    </div>
  );
}