"use client";

import {
  FileText,
  FileSpreadsheet,
  FileType2,
  Upload,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Product_Roadmap.pdf",
    type: "PDF",
    updated: "Today, 10:30 AM",
    status: "ACTIVE",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 2,
    name: "MVP_Features.xlsx",
    type: "Excel",
    updated: "Today, 09:15 AM",
    status: "ACTIVE",
    icon: FileSpreadsheet,
    color: "text-green-500",
  },
  {
    id: 3,
    name: "User_Research.pptx",
    type: "PowerPoint",
    updated: "Yesterday, 04:20 PM",
    status: "DRAFT",
    icon: FileType2,
    color: "text-orange-500",
  },
];

export default function RecentDocuments() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h3 className="font-semibold text-lg">
          Recent Documents
        </h3>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm">
          <Upload size={16} />
          Upload Document
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-xs text-zinc-500">
              <th className="text-left py-4 px-6 font-medium">
                FILE NAME
              </th>

              <th className="text-left py-4 px-6 font-medium">
                TYPE
              </th>

              <th className="text-left py-4 px-6 font-medium">
                UPDATED
              </th>

              <th className="text-left py-4 px-6 font-medium">
                STATUS
              </th>

              <th className="w-10" />
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => {
              const Icon = doc.icon;

              return (
                <tr
                  key={doc.id}
                  className="border-b hover:bg-zinc-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={doc.color}
                      />

                      <span className="font-medium">
                        {doc.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-zinc-600">
                    {doc.type}
                  </td>

                  <td className="px-6 py-4 text-zinc-600">
                    {doc.updated}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <MoreHorizontal size={16} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4">
        <button className="flex items-center gap-2 text-sm font-medium">
          View all documents
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}