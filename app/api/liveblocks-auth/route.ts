import { Liveblocks } from "@liveblocks/node";
import { COLORS, NAMES } from "@/app/liveblock-spreadsheet/constants";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  // We're generating random users and avatars here.
  // In a real-world scenario, this is where you'd assign the
  // user based on their real identity from your auth provider.
  const userIndex = Math.floor(Math.random() * NAMES.length);

  // Create a session for the current user (access token auth)
  const session = liveblocks.prepareSession(`user-${userIndex}`, {
    userInfo: {
      name: NAMES[userIndex],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      avatar: `https://liveblocks.io/avatars/avatar-${Math.floor(
        Math.random() * 30
      )}.png`,
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`belli:*`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
