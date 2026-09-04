import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getFounderContext() {
  try {
    const supabase = await createSupabaseServerClient();

    /*
     * Get the currently authenticated Supabase user.
     *
     * Supabase SSR reads the authentication
     * session from the server-side cookies.
     */
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error(
        "FOUNDER AUTH ERROR:",
        userError?.message
      );

      return null;
    }

    /*
     * Find the venture owned by this authenticated founder.
     */
    const {
  data: venture,
  error: ventureError,
} = await supabase
  .from("ventures")
  .select("id, venture_id")
  .eq("founder_id", user.id)
  .maybeSingle();

    if (ventureError) {
      console.error(
        "FOUNDER VENTURE ERROR:",
        ventureError.message
      );

      return null;
    }

    if (!venture) {
      console.error(
        "FOUNDER VENTURE NOT FOUND:",
        user.id
      );

      return null;
    }

   return {
  user,
  ventureId: venture.id,
  ventureCode: venture.venture_id,
  supabase,
};
  } catch (error) {
    console.error(
      "GET FOUNDER CONTEXT ERROR:",
      error
    );

    return null;
  }
}