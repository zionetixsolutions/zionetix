import { supabase } from "@/lib/supabase";

interface ActivityPayload {
  workspaceId: string;
  actionType: string;
  entityType: string;
  entityId?: string;
  performedBy: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity(
  payload: ActivityPayload
) {

  const { error } =
    await supabase
      .from("workspace_activity")
      .insert({
        workspace_id:
          payload.workspaceId,
        action_type:
          payload.actionType,
        entity_type:
          payload.entityType,
        entity_id:
          payload.entityId,
        performed_by:
          payload.performedBy,
        metadata:
          payload.metadata,
      });

  if (error) {
    console.error(
      "ACTIVITY LOG ERROR:",
      error
    );
  }

}