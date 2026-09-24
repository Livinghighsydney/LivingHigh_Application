import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6">
      {/* Centred form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rise">
          <Logo variant="black" priority className="mb-8 h-8 w-auto" />
          <h1 className="text-4xl font-bold tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-3 text-muted">
            Enter your manager credentials to access the portal.
          </p>

          <div className="mt-9">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="pb-2 text-center text-sm text-muted">
        Protected administrative portal · Living High Property
      </p>
    </main>
  );
}
