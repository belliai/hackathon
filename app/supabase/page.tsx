import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { SignUpForm } from "./components/sign-up-form";
import { LoginForm } from "./components/login-form";
import { createClient } from "@/lib/utils/supabase/server";
import SignOutButton from "./components/signout-button";

export default async function SupabasePage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div>
      <div className="p-10">
        <div>
          <h1 className="text-5xl font-bold tracking-tight  relative">
            Supabase Auth
          </h1>
          <p className="text-[#5E5F6E] pt-3 pb-6 max-w-[30rem] text-[1.0625rem] relative">
            Authentication powered by Supabase.
          </p>

          {user && <SignOutButton />}

          <div className="flex flex-col mt-4 gap-4">
            <p className="text-zinc-400">User object</p>
            <pre className="p-4 text-sm rounded-xl max-h-96 overflow-scroll bg-black">
              {user ? JSON.stringify(user, null, 2) : "No user session found"}
            </pre>
          </div>
          <div className="relative flex flex-col gap-4">
            <Separator className="mt-12 mb-6" />

            <section id="sign-in" className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Sign in and Sign up</h3>
              <p className="text-zinc-400">
                Supabase doesn&apos;t come with pre-built sign-in and sign-up
                components. So we are utilizing components from{" "}
                <Link
                  href="https://ui.shadcn.com/blocks"
                  className="font-semibold underline underline-offset-4"
                >
                  shadcn blocks
                </Link>
              </p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <SignUpForm />
                <LoginForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
