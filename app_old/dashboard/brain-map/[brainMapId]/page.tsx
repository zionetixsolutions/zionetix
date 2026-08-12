"use client";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import CreateNodeModal from "@/components/brain-map/CreateNodeModal";
import EditNodeModal from "@/components/brain-map/EditNodeModal";
import DeleteNodeModal from "@/components/brain-map/DeleteNodeModal";

interface BrainMapNode {
  id: string;
  node_title: string;
  node_description: string;
  node_type: string;
  brain_map_id: string;
}

export default function BrainMapPage() {

  const params = useParams();

  const brainMapId =
    params.brainMapId as string;

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedNode,
    setSelectedNode,
  ] = useState<BrainMapNode | null>(
    null
  );

  const [
    nodes,
    setNodes,
  ] = useState<BrainMapNode[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

 const fetchNodes = useCallback(
  async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          `/api/brain-map/node?brainMapId=${brainMapId}`
        );

      const data =
        await response.json();

      if (data.success) {
        setNodes(data.nodes);
      }

    } finally {
      setLoading(false);
    }

  },
  [brainMapId]
);

useEffect(() => {

  if (!brainMapId) return;

  fetchNodes();

}, [brainMapId, fetchNodes]);

  return (
    <>

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Brain Map
            </h1>

            <p className="text-zinc-400">
              Knowledge Graph Nodes
            </p>

          </div>

          <button
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            className="bg-yellow-400 text-black px-5 py-3 rounded-lg flex items-center gap-2 font-semibold"
          >
            <Plus size={18} />
            Create Node
          </button>

        </div>

        {loading ? (

          <p className="text-zinc-400">
            Loading Nodes...
          </p>

        ) : nodes.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">

            <h2 className="text-xl text-white font-semibold mb-2">
              No Nodes Found
            </h2>

            <p className="text-zinc-400">
              Create your first node.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {nodes.map((node) => (

              <div
                key={node.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >

                <h2 className="text-xl font-semibold text-white mb-2">
                  {node.node_title}
                </h2>

                <p className="text-zinc-400 mb-4">
                  {node.node_description}
                </p>

                <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-yellow-400 text-sm">
                  {node.node_type}
                </span>

                <div className="flex justify-end gap-3 mt-5">

                  <button
                    onClick={() => {

                      setSelectedNode(
                        node
                      );

                      setIsEditModalOpen(
                        true
                      );

                    }}
                    className="p-2 rounded-lg bg-zinc-800"
                  >
                    <Pencil
                      size={16}
                      className="text-blue-400"
                    />
                  </button>

                  <button
                    onClick={() => {

                      setSelectedNode(
                        node
                      );

                      setIsDeleteModalOpen(
                        true
                      );

                    }}
                    className="p-2 rounded-lg bg-zinc-800"
                  >
                    <Trash2
                      size={16}
                      className="text-red-500"
                    />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <CreateNodeModal
        isOpen={
          isCreateModalOpen
        }
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        onSuccess={() =>
          fetchNodes()
        }
        brainMapId={brainMapId}
      />

      <EditNodeModal
        isOpen={
          isEditModalOpen
        }
        onClose={() =>
          setIsEditModalOpen(false)
        }
        onSuccess={() =>
          fetchNodes()
        }
        node={selectedNode}
      />

      <DeleteNodeModal
        isOpen={
          isDeleteModalOpen
        }
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
        onSuccess={() =>
          fetchNodes()
        }
        node={selectedNode}
      />

    </>
  );
}