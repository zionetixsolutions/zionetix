"use client";

import { useState } from "react";
import { BrainMapNode } from "@/types/brain-map";

import BrainMapHeader from "@/components/brain-map/detail/BrainMapHeader";
import BrainMapCanvas from "@/components/brain-map/BrainMapCanvas";
import BrainMapDetails from "@/components/brain-map/detail/BrainMapDetails";
import RecentNodes from "@/components/brain-map/detail/RecentNodes";
import NodeDetailsPanel from "@/components/brain-map/detail/NodeDetailsPanel";

export default function BrainMapDetailPage() {
  const [selectedNode, setSelectedNode] =
    useState<BrainMapNode | null>(null);

  return (
    <>
      <div className="space-y-8">
        <BrainMapHeader />

        <div
          className="
          grid
          grid-cols-[1fr_280px]
          gap-8
          "
        >
          <BrainMapCanvas
            setSelectedNode={setSelectedNode}
          />

          <BrainMapDetails />
        </div>

        <RecentNodes />
      </div>

      {selectedNode && (
        <NodeDetailsPanel
          node={selectedNode}
          onClose={() =>
            setSelectedNode(null)
          }
        />
      )}
    </>
  );
}