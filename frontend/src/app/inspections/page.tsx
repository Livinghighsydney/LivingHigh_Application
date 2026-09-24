import Link from "next/link";

export default function InspectionsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-4 px-8 text-center">
      <h1 className="font-serif text-3xl text-ink">My Inspections</h1>
      <p className="text-muted">Coming next — your inspection history.</p>
      <Link
        href="/"
        className="text-sm font-medium uppercase tracking-[0.15em] text-ink underline underline-offset-4"
      >
        Back to home
      </Link>
    </main>
  );
}
