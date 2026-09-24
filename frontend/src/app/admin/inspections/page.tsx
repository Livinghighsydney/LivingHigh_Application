import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DeleteInspectionButton } from "@/components/DeleteInspectionButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminInspectionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const admin = createAdminClient();

  const { data: lhUser } = await admin
    .from("lh_users")
    .select("role")
    .eq("email", user.email!)
    .single();

  if (lhUser?.role !== "ADMIN") redirect("/");

  const { data: inspections } = await admin
    .from("lh_inspections")
    .select("id, propertyAddress, roomNumber, type, status, tenantName, inspectionDate, managerId")
    .order("createdAt", { ascending: false });

  const managerIds = [...new Set((inspections ?? []).map((i) => i.managerId))];

  const { data: managers } =
    managerIds.length > 0
      ? await admin.from("lh_users").select("id, name").in("id", managerIds)
      : { data: [] };

  const managerName = Object.fromEntries(
    (managers ?? []).map((m) => [m.id, m.name as string]),
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">Admin</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">All Inspections</h1>
        </div>
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
        >
          ← Home
        </Link>
      </div>

      {!inspections?.length ? (
        <p className="py-16 text-center text-muted">No inspections yet.</p>
      ) : (
        <ul className="divide-y divide-line">
          {inspections.map((insp) => (
            <li key={insp.id} className="flex items-start justify-between gap-4 py-5">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">
                  {insp.propertyAddress}
                  {insp.roomNumber ? ` · Unit ${insp.roomNumber}` : ""}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {insp.tenantName}
                  {" · "}
                  {managerName[insp.managerId] ?? "Unknown manager"}
                  {" · "}
                  {formatDate(insp.inspectionDate)}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-block rounded-full border border-line px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
                    {insp.type}
                  </span>
                  <span className="inline-block rounded-full border border-line px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
                    {insp.status}
                  </span>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <DeleteInspectionButton
                  id={insp.id}
                  address={insp.propertyAddress}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
