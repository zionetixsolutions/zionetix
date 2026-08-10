"use client";

import {
  BarChart3,
  Gavel,
  Landmark,
  Cpu,
} from "lucide-react";

export default function AuthLeftPanel() {

  const cards = [
    {
      icon: BarChart3,
      title: "Market Lead",
      subtitle: "Analytic Node",
    },
    {
      icon: Cpu,
      title: "Tech Lead",
      subtitle: "System Architect",
    },
    {
      icon: Gavel,
      title: "Legal Lead",
      subtitle: "Compliance Core",
    },
    {
      icon: Landmark,
      title: "Financial Lead",
      subtitle: "Fiscal Health",
    },
  ];

  return (
    <aside
     className="
hidden
lg:flex
w-[42%]
bg-zinc-50
border-r
border-zinc-200
px-12
py-10
flex-col
justify-between
h-screen
"
    >
      <div>

        <div className="mb-10">

          <h1
            className="
            text-[28px]
            font-semibold
            tracking-[0.25em]
            uppercase
          "
          >
            Primordial
          </h1>

        </div>

        <div className="max-w-xl">

          <h2
            className="
  text-[52px]
  xl:text-[56px]
  leading-[0.95]
  font-medium
  text-[#0A0A0A]
"
          >
            Build Ventures
            <br />
            With Confidence.
          </h2>

          <p
            className="
            mt-6
            text-lg
            leading-relaxed
            text-black/60
          "
          >
            Create. Validate.
            Collaborate. Decide.
            Primordial helps founders
            build startups with structure,
            documentation, AI guidance,
            and team collaboration.
          </p>

          <p
            className="
            mt-6
            text-sm
            italic
            text-black/40
          "
          >
            One Venture. One Workspace.
            One Source of Truth.
          </p>

        </div>

      </div>

      <div
        className="
        grid
        grid-cols-2
        gap-3
        mt-8
      "
      >
        {cards.map((card) => {

          const Icon =
            card.icon;

          return (

            <div
  key={card.title}
  className="
  p-3
  rounded-xl
  border
  border-[#E8E8E8]
  bg-white
"
>

              <Icon
                size={22}
                className="
                text-black/40
                mb-4
              "
              />

              <p
                className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                font-bold
                text-black/30
              "
              >
                {card.title}
              </p>

              <p
                className="
                mt-1
                text-xs
                font-medium
              "
              >
                {card.subtitle}
              </p>

            </div>

          );

        })}
      </div>

    </aside>
  );
}