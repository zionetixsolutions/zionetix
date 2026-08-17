import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function getFounderContext() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;

  if (!accessToken) {
    return null;
  }

  const authenticatedSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await authenticatedSupabase.auth.getUser(accessToken);

  if (userError || !user) {
    return null;
  }

  const { data: venture, error: ventureError } = await authenticatedSupabase
    .from("ventures")
    .select("venture_id")
    .eq("founder_id", user.id)
    .maybeSingle();

  if (ventureError || !venture) {
    return null;
  }

  return {
    ventureId: venture.venture_id,
    supabase: authenticatedSupabase,
  };
}
