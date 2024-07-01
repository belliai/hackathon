import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreateOrganization,
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  RedirectToUserProfile,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function ClerkPage() {
  const authObj = auth();

  return (
    <div>
      <div className="p-10">
        <div>
          <h1 className="text-5xl font-bold tracking-tight  relative">Clerk</h1>
          <p className="text-[#5E5F6E] pt-3 pb-6 max-w-[30rem] text-[1.0625rem] relative">
            Authentication and user management powered by Clerk.
          </p>
          <div className="relative flex flex-col gap-4">
            <SignedIn>
              <SignOutButton redirectUrl="/clerk">
                <button className=" w-fit px-4 py-2 rounded-full border-white border text-white text-sm font-semibold">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>

            <div className="flex flex-col my-4 gap-4">
              <p className="text-zinc-400">User object</p>
              <pre className="p-4 text-sm rounded-xl max-h-96 overflow-scroll bg-black">
                {authObj.sessionId
                  ? JSON.stringify(authObj, null, 2)
                  : "No user session found"}
              </pre>
            </div>

            <ul className="space-y-2 pl-2">
              <li>
                <Link
                  href="/clerk#sign-in"
                  className="underline underline-offset-4 text-zinc-200"
                >
                  Sign in and Sign up
                </Link>
              </li>
              <li>
                <Link
                  href="/clerk#user"
                  className="underline underline-offset-4 text-zinc-200"
                >
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  href="/clerk#org"
                  className="underline underline-offset-4 text-zinc-200"
                >
                  Organization Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="mt-12 mb-6" />

        <section id="sign-in" className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Sign in and Sign up</h3>
          <div className="flex flex-col gap-4">
            <SignedIn>
              <p className="text-zinc-500">You need to be signed out to view</p>
              <SignOutButton redirectUrl="/clerk">
                <button className="px-4 py-2 rounded-full border-white border text-white text-sm font-semibold w-fit">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
          <SignedOut>
            <div className="flex flex-col gap-4 w-fit">
              <Button>
                <SignInButton>Clerk&apos;s Hosted Sign in Page</SignInButton>
              </Button>
              <Button asChild>
                <SignInButton mode="modal" forceRedirectUrl="/clerk">
                  Sign In Modal
                </SignInButton>
              </Button>
            </div>
            {/* <div className="flex gap-4">
              <SignIn />
              <SignUp signInUrl="/clerk" path="/clerk" />
            </div> */}
          </SignedOut>
        </section>
        <Separator className="mt-12 mb-6" />
        <section id="user" className="flex flex-col gap-8">
          <h3 className="text-lg font-semibold">User management</h3>

          <div className="flex flex-col gap-4">
            <SignedOut>
              <p className="text-zinc-500">You need to be signed in to view</p>
              <Button className="w-fit">
                <SignInButton mode="modal" forceRedirectUrl="/clerk">
                  Sign In
                </SignInButton>
              </Button>
            </SignedOut>
            <SignedIn>
              <Link href="/clerk/profile">
                <p className="text-zinc-200 underline underline-offset-4">
                  Clerk&apos;s hosted user profile page
                </p>
              </Link>
              <p className="text-zinc-500">User Dropdown</p>
              <UserButton />
              <p className="text-zinc-500">User Profile</p>
              <UserProfile />
            </SignedIn>
          </div>
        </section>
        <Separator className="mt-12 mb-6" />
        <section id="org" className="flex flex-col gap-8">
          <h3 className="text-lg font-semibold">Sign in and Sign up</h3>
          <div className="flex flex-col gap-4">
            <SignedOut>
              <p className="text-zinc-500">You need to be signed in to view</p>
              <Button className="w-fit">
                <SignInButton mode="modal" forceRedirectUrl="/clerk">
                  Sign In
                </SignInButton>
              </Button>
            </SignedOut>
            <SignedIn>
              <Link href="/clerk/org">
                <p className="text-zinc-200 underline underline-offset-4">
                  Clerk&apos;s hosted organization profile page
                </p>
              </Link>
              <p className="text-zinc-500">Create Organization</p>
              <CreateOrganization />
              {!authObj.orgId ? (
                <p className="text-zinc-200 mt-2">
                  Create an organization to view the rest of the organization
                  components.
                </p>
              ) : (
                <>
                  <p className="text-zinc-500">Organization Profile</p>
                  <OrganizationProfile />
                  <p className="text-zinc-500">Organization Switcher</p>
                  <OrganizationSwitcher />
                  <p className="text-zinc-500">Organization List</p>
                  <OrganizationList />
                </>
              )}
            </SignedIn>
          </div>
        </section>
      </div>
    </div>
  );
}
