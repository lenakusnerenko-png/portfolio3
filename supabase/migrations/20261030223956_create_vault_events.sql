/*
# Create vault_events table (single-tenant, no auth)

1. New Tables
- `vault_events`
  - `id` (uuid, primary key)
  - `event_type` (text, not null) - e.g. 'vault_open', 'key_selected', 'bonus_revealed', 'claim_clicked'
  - `event_data` (jsonb, default '{}') - optional metadata such as which key was chosen
  - `session_id` (text, not null) - a random per-visit ID to group a single user's journey
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `vault_events`.
- Grant INSERT to anon + authenticated so the frontend can log events.
- No SELECT policy on anon/authenticated: we only write analytics, we do not read them from the client.
- The service_role (used only server-side if ever needed) bypasses RLS and can read.
3. Notes
- This is an analytics-only table. Visitors' browser sessions write funnel events
  (vault opened, key chosen, bonus revealed, claim clicked) so the operator can
  measure conversion. No personal data is stored.
*/

CREATE TABLE IF NOT EXISTS vault_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vault_events ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON vault_events TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_vault_events" ON vault_events;
CREATE POLICY "anon_insert_vault_events"
  ON vault_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);
