"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

interface CreateDecisionModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateDecisionModal({
  open,
  onClose,
  onCreated,
}: CreateDecisionModalProps) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [situation, setSituation] = useState("");
  const [recommendation, setRecommendation] =
    useState("");
  const [reasoning, setReasoning] = useState("");
  const [riskIfIgnored, setRiskIfIgnored] =
    useState("");
  const [confidenceScore, setConfidenceScore] =
    useState("80");

  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setCategory("");
    setTitle("");
    setSituation("");
    setRecommendation("");
    setReasoning("");
    setRiskIfIgnored("");
    setConfidenceScore("80");
    setError("");
  };

  const handleClose = () => {
    if (submitting) {
      return;
    }

    resetForm();
    onClose();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!category.trim()) {
      setError("Please select a category.");
      return;
    }

    if (!title.trim()) {
      setError("Decision title is required.");
      return;
    }

    if (!situation.trim()) {
      setError("Business situation is required.");
      return;
    }

    if (!recommendation.trim()) {
      setError("Recommendation is required.");
      return;
    }

    const score = Number(confidenceScore);

    if (
      Number.isNaN(score) ||
      score < 0 ||
      score > 100
    ) {
      setError(
        "Confidence score must be between 0 and 100."
      );
      return;
    }

    const reasoningItems = reasoning
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setSubmitting(true);

    try {
      const response = await fetch(
        "/api/decisions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: category.trim(),
            title: title.trim(),
            situation: situation.trim(),
            recommendation:
              recommendation.trim(),
            reasoning: reasoningItems,
            risk_if_ignored:
              riskIfIgnored.trim() || null,
            confidence_score: score,
            status: "PENDING",
            created_by: "AI",
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
            `Unable to create decision (${response.status})`
        );
      }

      resetForm();
      onClose();
      onCreated();
    } catch (cause) {
      console.error(
        "Create decision error:",
        cause
      );

      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to create decision"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-1/2 top-1/2 z-[1000] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Header */}

              <div className="flex shrink-0 items-start justify-between border-b p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                      <Plus size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        Create New Decision
                      </h2>

                      <p className="mt-1 text-sm text-zinc-500">
                        Add a business decision for leadership
                        review.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-black disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="space-y-6 overflow-y-auto p-6">
                  {/* Error */}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  {/* Category + Confidence */}

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="decision-category"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider"
                      >
                        Category *
                      </label>

                      <select
                        id="decision-category"
                        value={category}
                        onChange={(event) =>
                          setCategory(event.target.value)
                        }
                        disabled={submitting}
                        className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                      >
                        <option value="">
                          Select category...
                        </option>

                        <option value="Strategic">
                          Strategic
                        </option>

                        <option value="Financial">
                          Financial
                        </option>

                        <option value="Operational">
                          Operational
                        </option>

                        <option value="Product">
                          Product
                        </option>

                        <option value="Marketing">
                          Marketing
                        </option>

                        <option value="Technology">
                          Technology
                        </option>

                        <option value="Hiring">
                          Hiring
                        </option>

                        <option value="Legal">
                          Legal
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="confidence-score"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider"
                      >
                        Confidence Score
                      </label>

                      <div className="relative">
                        <input
                          id="confidence-score"
                          type="number"
                          min={0}
                          max={100}
                          value={confidenceScore}
                          onChange={(event) =>
                            setConfidenceScore(
                              event.target.value
                            )
                          }
                          disabled={submitting}
                          className="h-12 w-full rounded-xl border border-zinc-200 px-4 pr-12 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}

                  <div>
                    <label
                      htmlFor="decision-title"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                    >
                      Decision Title *
                    </label>

                    <input
                      id="decision-title"
                      type="text"
                      value={title}
                      onChange={(event) =>
                        setTitle(event.target.value)
                      }
                      disabled={submitting}
                      placeholder="e.g. Series A Expansion Strategy"
                      className="h-12 w-full rounded-xl border border-zinc-200 px-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                    />
                  </div>

                  {/* Situation */}

                  <div>
                    <label
                      htmlFor="decision-situation"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                    >
                      Business Situation *
                    </label>

                    <textarea
                      id="decision-situation"
                      rows={4}
                      value={situation}
                      onChange={(event) =>
                        setSituation(event.target.value)
                      }
                      disabled={submitting}
                      placeholder="Describe the current business situation, problem, or context..."
                      className="w-full resize-none rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                    />
                  </div>

                  {/* Recommendation */}

                  <div>
                    <label
                      htmlFor="decision-recommendation"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                    >
                      Recommendation *
                    </label>

                    <textarea
                      id="decision-recommendation"
                      rows={4}
                      value={recommendation}
                      onChange={(event) =>
                        setRecommendation(
                          event.target.value
                        )
                      }
                      disabled={submitting}
                      placeholder="Describe the recommended decision or proposed action..."
                      className="w-full resize-none rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                    />
                  </div>

                  {/* Reasoning */}

                  <div>
                    <label
                      htmlFor="decision-reasoning"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                    >
                      Reasoning
                    </label>

                    <textarea
                      id="decision-reasoning"
                      rows={5}
                      value={reasoning}
                      onChange={(event) =>
                        setReasoning(event.target.value)
                      }
                      disabled={submitting}
                      placeholder={`Enter each reasoning point on a new line...\nExample:\n• Expands market opportunity\n• Improves revenue potential\n• Fits current growth strategy`}
                      className="w-full resize-none rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                    />

                    <p className="mt-2 text-xs text-zinc-400">
                      Each line will be stored as a separate
                      reasoning point.
                    </p>
                  </div>

                  {/* Risk */}

                  <div>
                    <label
                      htmlFor="decision-risk"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                    >
                      Risk If Ignored
                    </label>

                    <textarea
                      id="decision-risk"
                      rows={3}
                      value={riskIfIgnored}
                      onChange={(event) =>
                        setRiskIfIgnored(
                          event.target.value
                        )
                      }
                      disabled={submitting}
                      placeholder="What could happen if this decision is not taken?"
                      className="w-full resize-none rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-zinc-100"
                    />
                  </div>

                  {/* Status */}

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">
                          Initial Status
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          New decisions enter the inbox as
                          pending review.
                        </p>
                      </div>

                      <span className="rounded-lg bg-zinc-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600">
                        PENDING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex shrink-0 justify-end gap-3 border-t bg-white p-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="rounded-xl border border-zinc-200 px-5 py-2.5 font-medium transition hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Create Decision
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}