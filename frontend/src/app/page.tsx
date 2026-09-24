import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName =
    profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-8 py-12">
      {/* Brand hero, vertically centred */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="rise" style={{ animationDelay: "0ms" }}>
          <Logo variant="black" priority className="h-9 w-auto" />
        </div>
        <h1
          className="mt-10 font-serif text-5xl leading-none text-ink rise"
          style={{ animationDelay: "100ms" }}
        >
          Hello, {displayName}
        </h1>
        <p
          className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted rise"
          style={{ animationDelay: "180ms" }}
        >
          Property Inspections
        </p>
      </div>

      {/* Actions */}
      <div
        className="flex flex-col gap-3 rise"
        style={{ animationDelay: "260ms" }}
      >
        <Link
          href="/inspections/new"
          className="rounded-full bg-ink py-4 text-center text-sm font-medium uppercase tracking-[0.15em] text-paper transition-transform active:scale-[0.99]"
        >
          Start Inspection
        </Link>
        <Link
          href="/inspections"
          className="rounded-full border border-ink/15 py-4 text-center text-sm font-medium uppercase tracking-[0.15em] text-ink transition-colors active:bg-ink/5"
        >
          My Inspections
        </Link>
        <form action="/auth/signout" method="post" className="mt-1">
          <button
            type="submit"
            className="w-full py-2 text-center text-sm text-muted transition-colors hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
