"use client";

import { useCallback, useEffect, useState } from "react";
import type { Member, TeamMemberRecord } from "@/types/member";

function formatJoinedDate(createdAt?: string) {
  if (!createdAt) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

function mapMember(record: TeamMemberRecord): Member {
  return {
    ...record,
    name: record.full_name,
    status: "Active",
    lastActive: "—",
    joinedDate: formatJoinedDate(record.created_at),
  };
}

export function useTeamMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    const response = await fetch("/api/team/members", {
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to load team members");
    }

    return (data.members as TeamMemberRecord[]).map(mapMember);
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setMembers(await fetchMembers());
    } catch (loadError) {
      console.error("TEAM MEMBERS LOAD ERROR:", loadError);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load team members"
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [fetchMembers]);

  useEffect(() => {
    let cancelled = false;

    void fetchMembers()
      .then((nextMembers) => {
        if (cancelled) return;
        setMembers(nextMembers);
        setLoading(false);
      })
      .catch((loadError) => {
        if (cancelled) return;
        console.error("TEAM MEMBERS LOAD ERROR:", loadError);
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load team members"
        );
        setMembers([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchMembers]);

  return { members, loading, error, reload };
}
