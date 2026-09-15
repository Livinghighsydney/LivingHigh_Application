/**
 * Application data model, mirroring the Supabase/Postgres schema in CLAUDE.md.
 * Keep in sync with SQL migrations, or regenerate with the Supabase CLI:
 *
 *   supabase gen types typescript --project-id <id> > src/types/database.ts
 */

export type InspectionType = "incoming" | "outgoing";
export type InspectionStatus = "draft" | "completed";

export interface Inspection {
  id: string;
  created_by: string;
  property_address: string;
  room_unit: string | null;
  inspection_type: InspectionType;
  tenant_name: string;
  owner_name: string | null;
  lease_start: string | null;
  lease_expiry: string | null;
  lease_details: string | null;
  rented_for: string | null;
  inspection_date: string;
  status: InspectionStatus;
  pdf_path: string | null;
  gallery_token: string;
  created_at: string;
}

export interface Room {
  id: string;
  inspection_id: string;
  name: string;
  sort_order: number;
}

export interface Photo {
  id: string;
  inspection_id: string;
  room_id: string;
  storage_path: string;
  taken_at: string;
  sort_order: number;
  created_at: string;
}

/** An inspection joined with its rooms and their photos — the shape the PDF needs. */
export interface InspectionWithMedia extends Inspection {
  rooms: (Room & { photos: Photo[] })[];
}

/** Private Storage buckets — served via signed URLs. */
export const BUCKETS = {
  photos: "inspection-photos",
  reports: "inspection-reports",
} as const;
