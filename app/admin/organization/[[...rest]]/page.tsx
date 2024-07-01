import { Button } from "@/components/ui/button";
import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function MembersPage() {
  const { orgId, orgPermissions, orgSlug } = auth();

  if (!orgId) {
    // If there is no active orgId

    redirect("/");
  }

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
      {orgSlug === "admin" && (
        <Button asChild variant="button-primary" className="w-fit">
          <Link href="/users">View All Users</Link>
        </Button>
      )}
      <OrganizationProfile />
    </div>
  );
}
