export type MemberStatus = "Active" | "Pending Invite";

export type Member = {
  id: string;
  member_id: string;
  full_name: string;
  name: string;
  email: string;
  role: string;
  status: MemberStatus;
  lastActive: string;
  joinedDate: string;
  created_at?: string;
  venture_id?: string;
  avatarUrl?: string;
};

export type TeamMemberRecord = {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
  venture_id: string;
  created_at?: string;
};
