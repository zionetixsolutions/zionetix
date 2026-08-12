"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

const comments = [
  {
    id: 1,
    name: "Sarah Chen",
    time: "2 HOURS AGO",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    comment:
      "I've reviewed the infrastructure cost breakdown. The estimate for AWS EU-West-1 expansion looks solid, but we might need additional bandwidth cost buffers.",
  },
  {
    id: 2,
    name: "John Founder",
    time: "1 HOUR AGO",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    comment:
      "Good catch, Sarah. Let's add a 10% contingency allocation for networking and CDN expenses.",
  },
];

export default function DiscussionPanel() {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      className="bg-white border border-zinc-200 rounded-3xl p-10 shadow-sm"
    >
      <h3 className="text-2xl font-semibold mb-8">
        Discussion
      </h3>

      <div className="space-y-8">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-12 h-12 rounded-full object-cover border border-zinc-200"
            />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold">
                  {comment.name}
                </span>

                <span className="text-[10px] tracking-widest text-zinc-500">
                  {comment.time}
                </span>
              </div>

              <p className="text-zinc-600 leading-8">
                {comment.comment}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-zinc-200">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a comment or observation..."
            className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 outline-none focus:border-black"
          />

          <button className="bg-black text-white px-6 rounded-2xl flex items-center gap-2 hover:opacity-90 transition">
            <Send size={16} />
            Post
          </button>
        </div>
      </div>
    </motion.section>
  );
}