"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();

    router.refresh();
  }

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
