import { supabase } from "../lib/supabase.js";
import { BUCKETS, type InspectionWithMedia } from "../types/database.js";

/** Load an inspection with its rooms and photos, ordered for the report. */
export async function getInspectionWithMedia(
  id: string,
): Promise<InspectionWithMedia | null> {
  const { data, error } = await supabase
    .from("inspections")
    .select(
      "*, rooms(*, photos(*))",
    )
    .eq("id", id)
    .order("sort_order", { referencedTable: "rooms", ascending: true })
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw error;
  }
  return data as unknown as InspectionWithMedia;
}

/** Create a short-lived signed URL for a private Storage object. */
export async function signPhotoUrl(
  storagePath: string,
  expiresInSeconds = 60 * 60,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKETS.photos)
    .createSignedUrl(storagePath, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

/** Upload the generated PDF and mark the inspection completed. */
export async function storeReport(
  inspectionId: string,
  pdf: Buffer,
): Promise<{ path: string }> {
  const path = `${inspectionId}/report.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKETS.reports)
    .upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadError) throw uploadError;

  const { error: updateError } = await supabase
    .from("inspections")
    .update({ status: "completed", pdf_path: path })
    .eq("id", inspectionId);
  if (updateError) throw updateError;

  return { path };
}

/** Signed download URL for a stored report PDF. */
export async function signReportUrl(
  path: string,
  expiresInSeconds = 60 * 60,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKETS.reports)
    .createSignedUrl(path, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}
