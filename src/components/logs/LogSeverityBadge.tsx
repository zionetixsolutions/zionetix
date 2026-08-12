"use client";

interface LogSeverityBadgeProps {
  severity: "Info" | "Warning" | "Critical";
}

export default function LogSeverityBadge({
  severity,
}: LogSeverityBadgeProps) {
  const styles = {
    Info: {
      text: "text-zinc-500",
      dot: "bg-zinc-500",
    },

    Warning: {
      text: "text-amber-600",
      dot: "bg-amber-500",
    },

    Critical: {
      text: "text-red-600",
      dot: "bg-red-600",
    },
  };

  const current = styles[severity];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        text-[10px]
        font-bold
        uppercase
        tracking-widest
        ${current.text}
      `}
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${current.dot}
        `}
      />

      {severity}
    </span>
  );
}