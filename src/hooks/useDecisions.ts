"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  CreateDecisionPayload,
  DecisionListItem,
  DecisionStats,
  UpdateDecisionPayload,
} from "@/types/decision";

interface UseDecisionsReturn {
  decisions: DecisionListItem[];

  stats: DecisionStats;

  loading: boolean;

  error: string;

  fetchDecisions: () => Promise<void>;

  createDecision: (
    payload: CreateDecisionPayload
  ) => Promise<DecisionListItem | null>;

  updateDecision: (
    id: string,
    payload: UpdateDecisionPayload
  ) => Promise<DecisionListItem | null>;

  deleteDecision: (
    id: string
  ) => Promise<boolean>;

  reload: () => Promise<void>;
}

const EMPTY_STATS: DecisionStats = {
  total: 0,
  pending: 0,
  accepted: 0,
  rejected: 0,
  pushback: 0,
};

export function useDecisions(): UseDecisionsReturn {
  const [decisions, setDecisions] =
    useState<DecisionListItem[]>([]);

  const [stats, setStats] =
    useState<DecisionStats>(EMPTY_STATS);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDecisions =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/decisions",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to load decisions"
          );
        }

        setDecisions(
          data.data ?? []
        );

        setStats(
          data.stats ?? EMPTY_STATS
        );
      } catch (loadError) {
        console.error(
          "DECISIONS LOAD ERROR:",
          loadError
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load decisions"
        );

        setDecisions([]);
        setStats(EMPTY_STATS);
      } finally {
        setLoading(false);
      }
    }, []);

  const createDecision =
    useCallback(
      async (
        payload: CreateDecisionPayload
      ) => {
        try {
          setError("");

          const response =
            await fetch(
              "/api/decisions",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  payload
                ),
              }
            );

          const data =
            await response.json();

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Failed to create decision"
            );
          }

          await fetchDecisions();

          return data.data as DecisionListItem;
        } catch (createError) {
          console.error(
            "DECISION CREATE ERROR:",
            createError
          );

          setError(
            createError instanceof Error
              ? createError.message
              : "Failed to create decision"
          );

          return null;
        }
      },
      [fetchDecisions]
    );

  const updateDecision =
    useCallback(
      async (
        id: string,
        payload: UpdateDecisionPayload
      ) => {
        try {
          setError("");

          const response =
            await fetch(
              `/api/decisions/${id}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  payload
                ),
              }
            );

          const data =
            await response.json();

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Failed to update decision"
            );
          }

          await fetchDecisions();

          return data.data as DecisionListItem;
        } catch (updateError) {
          console.error(
            "DECISION UPDATE ERROR:",
            updateError
          );

          setError(
            updateError instanceof Error
              ? updateError.message
              : "Failed to update decision"
          );

          return null;
        }
      },
      [fetchDecisions]
    );

  const deleteDecision =
    useCallback(
      async (id: string) => {
        try {
          setError("");

          const response =
            await fetch(
              `/api/decisions/${id}`,
              {
                method: "DELETE",
              }
            );

          const data =
            await response.json();

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Failed to delete decision"
            );
          }

          await fetchDecisions();

          return true;
        } catch (deleteError) {
          console.error(
            "DECISION DELETE ERROR:",
            deleteError
          );

          setError(
            deleteError instanceof Error
              ? deleteError.message
              : "Failed to delete decision"
          );

          return false;
        }
      },
      [fetchDecisions]
    );

  const reload =
    useCallback(async () => {
      await fetchDecisions();
    }, [fetchDecisions]);

  useEffect(() => {
    void fetchDecisions();
  }, [fetchDecisions]);

  return {
    decisions,
    stats,
    loading,
    error,
    fetchDecisions,
    createDecision,
    updateDecision,
    deleteDecision,
    reload,
  };
}