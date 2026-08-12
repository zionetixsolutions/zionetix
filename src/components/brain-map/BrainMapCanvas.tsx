"use client";

import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

import { BrainMapNode } from "@/types/brain-map";
interface Props {
  setSelectedNode: React.Dispatch<
    React.SetStateAction<BrainMapNode | null>
  >;
}

import { brainMapNodes } from "@/data/brainMapNodes";

const nodes: Node[] = [
  {
    id: "company",
    position: { x: 400, y: 220 },
    data: { label: "Company" },

    style: {
      background: "#000",
      color: "#fff",
      borderRadius: "999px",
      width: 90,
      height: 90,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      fontWeight: 600,
    },
  },

  {
    id: "product",
    position: { x: 250, y: 80 },
    data: { label: "Product" },
  },

  {
    id: "market",
    position: { x: 560, y: 80 },
    data: { label: "Market" },
  },

  {
    id: "business",
    position: { x: 250, y: 380 },
    data: { label: "Business" },
  },

  {
    id: "financial",
    position: { x: 560, y: 380 },
    data: { label: "Financial" },
  },
];

const edges: Edge[] = [
  {
    id: "e1",
    source: "company",
    target: "product",
  },

  {
    id: "e2",
    source: "company",
    target: "market",
  },

  {
    id: "e3",
    source: "company",
    target: "business",
  },

  {
    id: "e4",
    source: "company",
    target: "financial",
  },
];
export default function BrainMapCanvas({
  setSelectedNode,
}: Props) {
  return (
    <div
      className="
      h-[520px]
      rounded-[28px]
      border
      border-zinc-200
      overflow-hidden
      bg-white
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={(_, node) => {

          if (node.id !== "company") {

            setSelectedNode(
              brainMapNodes[
                node.id as keyof typeof brainMapNodes
              ]
            );

          }

        }}
      >
        <Background
          gap={24}
          size={1}
        />

        <Controls />
      </ReactFlow>
    </div>
  );
}