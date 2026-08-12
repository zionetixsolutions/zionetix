import GlassCard from "./GlassCard";
const docs = [
  {
    name: "Startup Alpha Pitch Deck",
    type: "PDF",
    date: "Today",
    status: "Approved",
  },
  {
    name: "Business Model Canvas",
    type: "DOCX",
    date: "Yesterday",
    status: "Pending",
  },
  {
    name: "Financial Plan FY24",
    type: "XLSX",
    date: "2 Days Ago",
    status: "Approved",
  },
];

export default function RecentDocuments() {
  return (
    <GlassCard>
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-2xl
      overflow-hidden
      "
    >
      <div
        className="
        flex
        justify-between
        px-6
        py-4
        border-b
        "
      >
        <h2 className="font-semibold">
          Recent Documents
        </h2>

        <button className="text-sm">
          VIEW ALL
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-zinc-400 text-sm">
            <th className="px-6 py-4">
              Document Name
            </th>

            <th>Type</th>

            <th>Date Modified</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((doc) => (
            <tr
              key={doc.name}
               className="border-t hover:bg-zinc-50 transition-all"
            >
              <td className="px-6 py-4">
                {doc.name}
              </td>

              <td>{doc.type}</td>

              <td>{doc.date}</td>

              <td>
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-xs
                  "
                >
                  {doc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </GlassCard>
  );
}