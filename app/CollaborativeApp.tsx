"use client";

import { useOthers } from "@/liveblocks.config";

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div className="flex">
      <div className="flex flex-row items-center">
        <div className="h-4 w-4 rounded-full bg-green-500"></div>
        <p className="ml-2">Active Users: {userCount}</p>
      </div>
    </div>
  );
}
