import { supabase, sessionId } from "./supabase";

export type VaultEventType =
  | "vault_open"
  | "vault_selected"
  | "bonus_revealed"
  | "claim_clicked"
  | "claim_link_clicked";

/**
 * Logs a funnel event to Supabase. Failures are swallowed so the
 * game never breaks if analytics is unavailable.
 */
export async function trackEvent(
  type: VaultEventType,
  data: Record<string, unknown> = {}
): Promise<void> {
  try {
    await supabase.from("vault_events").insert({
      event_type: type,
      event_data: data,
      session_id: sessionId,
    });
  } catch {
    // analytics is best-effort; never block the game
  }
}
