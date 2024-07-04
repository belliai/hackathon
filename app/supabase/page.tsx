import Link from "next/link"

import { createClient } from "@/lib/utils/supabase/server"
import { Separator } from "@/components/ui/separator"

import SupabaseLiveCursor from "./components/live-cursor"
import { LoginForm } from "./components/login-form"
import { SignUpForm } from "./components/sign-up-form"
import SignOutButton from "./components/signout-button"

export default async function SupabasePage() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return (
    <SupabaseLiveCursor>
      <div>
        <div className="p-10">
          <div>
            <h1 className="relative text-5xl font-bold tracking-tight">
              Supabase Auth
            </h1>
            <p className="relative max-w-[30rem] pb-6 pt-3 text-[1.0625rem] text-[#5E5F6E]">
              Authentication powered by Supabase.
            </p>

            {user && <SignOutButton />}

            <div className="mt-4 flex flex-col gap-4">
              <p className="text-zinc-400">User object</p>
              <pre className="max-h-96 overflow-scroll rounded-xl bg-black p-4 text-sm">
                {user ? JSON.stringify(user, null, 2) : "No user session found"}
              </pre>
            </div>
            <div className="relative flex flex-col gap-4">
              <Separator className="mb-6 mt-12" />

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
                <div className="mt-4 flex flex-wrap gap-3">
                  <SignUpForm />
                  <LoginForm />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SupabaseLiveCursor>
  )
}
