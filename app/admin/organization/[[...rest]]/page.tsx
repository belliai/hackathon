import Link from "next/link"
import { redirect } from "next/navigation"
import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import { Button } from "@/components/ui/button"

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-8">
      <OrganizationSwitcher
        appearance={{
          layout: {
            shimmer: false,
          },
          elements: {
            organizationSwitcherTrigger: "h-12",
            avatarBox: "h-10 w-10",
            avatarImage: "h-10 w-10",
          },
        }}
      />

      <OrganizationProfile />
    </div>
  )
}
