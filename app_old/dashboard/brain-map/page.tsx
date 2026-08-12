"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface BrainMap {
  id: string;
  brain_map_name: string;
  brain_map_description: string;
}

export default function BrainMapsPage() {

  const router = useRouter();

  const [brainMaps, setBrainMaps] =
    useState<BrainMap[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBrainMaps =
    async () => {

      try {

        const response =
          await fetch(
            "/api/brain-map"
          );

        const data =
          await response.json();

        if (data.success) {

          setBrainMaps(
            data.brainMaps
          );

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

  const timer = setTimeout(() => {
    fetchBrainMaps();
  }, 0);

  return () => clearTimeout(timer);

}, []);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Brain Maps
          </h1>

          <p className="text-zinc-400">
            Strategic Knowledge Systems
          </p>

        </div>

        <button
          className="bg-yellow-400 text-black px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Create Brain Map
        </button>

      </div>

      {loading ? (

        <p className="text-zinc-400">
          Loading...
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {brainMaps.map(
            (brainMap) => (

              <div
                key={brainMap.id}
                onClick={() =>
                  router.push(
                    `/dashboard/brain-map/${brainMap.id}`
                  )
                }
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 cursor-pointer hover:border-yellow-400 transition-all"
              >

                <h2 className="text-xl font-semibold text-white mb-2">
                  {brainMap.brain_map_name}
                </h2>

                <p className="text-zinc-400">
                  {
                    brainMap.brain_map_description
                  }
                </p>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}