import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: lhUser } = await admin
    .from("lh_users")
    .select("role")
    .eq("email", user.email!)
    .single();

  if (lhUser?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Collect all storage paths before touching anything
  const { data: images } = await admin
    .from("lh_inspection_images")
    .select("storagePath")
    .eq("inspectionId", id);

  const storagePaths = images?.map((img) => img.storagePath) ?? [];

  // Delete photos from storage first — if this fails, abort so no orphaned files
  if (storagePaths.length) {
    const { error: photosError } = await admin.storage
      .from("inspection-images")
      .remove(storagePaths);

    if (photosError) {
      return NextResponse.json(
        { error: "Failed to remove inspection photos. Please try again." },
        { status: 500 },
      );
    }
  }

  // Remove PDF report if one was generated (non-fatal if it doesn't exist)
  await admin.storage.from("inspection-reports").remove([`${id}.pdf`]);

  // Storage is clear — now delete DB rows
  await admin.from("lh_inspection_images").delete().eq("inspectionId", id);
  await admin.from("lh_inspection_issues").delete().eq("inspectionId", id);

  const { error } = await admin.from("lh_inspections").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
