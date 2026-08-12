"use client";
import AddMemberModal from "@/components/team/AddMemberModal";
import EditMemberModal from "@/components/team/EditMemberModal";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
interface TeamMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
}
export default function TeamPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
const deleteMember = async (memberId: string) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this member?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `/api/team/member/${memberId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      setMembers((prev) =>
        prev.filter(
          (member) => member.member_id !== memberId
        )
      );

      alert("Member Deleted Successfully");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to delete member");
  }
};
useEffect(() => {
  const loadMembers = async () => {
    try {
      const ventureId =
        "25ba5c5f-9898-4477-a38d-511c5b835cda";

      const response = await fetch(
        `/api/team/members/${ventureId}`
      );

      const data = await response.json();

      if (data.success) {
        setMembers(data.members);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadMembers();
   }, []);
       const filteredMembers = members.filter((member) =>
       member.full_name
       .toLowerCase()
       .includes(searchTerm.toLowerCase()) ||
       member.email
       .toLowerCase()
       .includes(searchTerm.toLowerCase()) ||
       member.member_id
       .toLowerCase()
       .includes(searchTerm.toLowerCase())
       );
  return (
    <>
    <div className="p-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Team Management
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage your venture team members
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
           <Plus size={18} />
           Add Member
           </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
            />
        </div>
           <AddMemberModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}/>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left px-6 py-4 text-zinc-300">
                Member ID
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Name
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Email
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Role
              </th>

              <th className="text-right px-6 py-4 text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
              <td
             colSpan={5}
              className="text-center py-8 text-zinc-400"
              >
               Loading Members...
              </td>
             </tr>
             ) : (
             filteredMembers.map((member) => (
              <tr
                key={member.member_id}
                className="border-t border-zinc-800"
              >
                <td className="px-6 py-4 text-yellow-400 font-medium">
                  {member.member_id}
                </td>

                <td className="px-6 py-4 text-white">
                  {member.full_name}
                </td>

                <td className="px-6 py-4 text-zinc-300">
                  {member.email}
                </td>

                <td className="px-6 py-4 text-white">
                  {member.role}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">

                    <button onClick={() => {
                          setSelectedMember(member);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                      >
                    <Pencil
                      size={16}
                      className="text-yellow-400"
                    />
                    </button>
                    <button onClick={() => deleteMember(member.member_id)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
                      <Trash2
                        size={16}
                        className="text-red-500"
                      />
                    </button>

                  </div>
                </td>
              </tr>
            ))
)}

          </tbody>

        </table>

      </div>

    </div>
      <EditMemberModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      member={selectedMember}
      onSuccess={() => window.location.reload()}
    />
  </>
    
  );
}