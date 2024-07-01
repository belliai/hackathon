"use client";
import React, { SetStateAction, Dispatch, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check, ChevronDownIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ClerkLoading,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";

export type UserDropdownItem = {
  icon?: React.ReactNode;
  shortcut?: string;
  route: string;
  label: string;
  separator?: boolean;
  changeNavigation?: boolean;
};

interface UserDropdownProps {
  doChangeNavigation: Dispatch<SetStateAction<number>>;
}

export default function UserDropdown({
  doChangeNavigation = () => {},
}: UserDropdownProps) {
  const router = useRouter();

  const auth = useAuth();
  const userSession = useUser();

  const hasActiveOrg = !!auth.orgId;

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const org = useOrganization();

  useEffect(() => {
    // Force active org if none is selected
    if (!hasActiveOrg && isLoaded) {
      const orgs = userMemberships.data;

      // Set first org as default
      const firstOrg = orgs[0];

      setActive({
        organization: firstOrg?.organization.id,
      });
    }
  }, [hasActiveOrg, isLoaded, userMemberships.data]);

  const ITEMS: UserDropdownItem[] = [
    {
      icon: <User className="mr-2 h-4 w-4" />,
      // shortcut: "⇧⌘P",
      route: "/profile",
      label: "Profile",
      separator: true,
    },
    {
      route: "/organize/masters/finance/cart",
      label: "Settings",
      changeNavigation: true,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <ClerkLoading>
              <Skeleton className="rounded-md w-6 h-6" />
              <Skeleton className="rounded-md w-12 h-2" />
            </ClerkLoading>
            <SignedIn>
              <UserButton
                appearance={{
                  layout: {
                    shimmer: false,
                  },
                  elements: {
                    userPreviewAvatarContainer: "rounded-md w-6 h-6",
                    avatarBox: "rounded-md w-6 h-6",
                  },
                }}
              />
              <span className="text-sm text-white">
                {userSession.user?.fullName}
              </span>
              <ChevronDownIcon
                className="h-4 w-4 text-zinc-500"
                aria-hidden="true"
              />
            </SignedIn>
            <SignedOut>
              <Avatar className="rounded-md w-6 h-6">
                <AvatarImage src="/jeff.webp" />
                <AvatarFallback className="rounded-md w-6 h-6">
                  B
                </AvatarFallback>
              </Avatar>
              <span className="text-white">Belli</span>
              <ChevronDownIcon
                className="h-4 w-4 text-zinc-500"
                aria-hidden="true"
              />
            </SignedOut>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-zinc-950 rounded-xl"
          align="start"
          sideOffset={8}
        >
          {!isLoaded ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            // Only show when the user is a member of more than one org
            userMemberships.data.length > 1 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="px-3.5 py-2 min-w-40 rounded-lg cursor-pointer">
                  Change Organization
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {userMemberships.data.map((orgmem) => {
                    const organization = orgmem.organization;
                    const isActive = organization.id === auth.orgId;

                    return (
                      <DropdownMenuItem disabled={isActive} key={orgmem.id}>
                        {organization.name}{" "}
                        {isActive && <Check size={14} className="ml-1" />}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )
          )}
          {ITEMS.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  className="px-3.5 py-2 min-w-40 rounded-lg cursor-pointer"
                  onClick={() => {
                    if (item.changeNavigation) doChangeNavigation(2);
                    router.push(item.route);
                  }}
                >
                  {/* {item.icon} */}
                  <span className="mr-4">{item.label}</span>
                  {item.shortcut && (
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
                {item.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            );
          })}
          <SignedIn>
            <SignOutButton>
              <DropdownMenuItem className="px-3.5 py-2 min-w-40 rounded-lg cursor-pointer">
                Logout
              </DropdownMenuItem>
            </SignOutButton>
          </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
