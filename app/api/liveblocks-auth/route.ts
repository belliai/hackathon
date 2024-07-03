import { currentUser } from "@clerk/nextjs/server"
import { Liveblocks } from "@liveblocks/node"

import { COLORS, NAMES } from "@/app/liveblock-spreadsheet/constants"

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
  const user = await currentUser()

  if (!user || !user.primaryEmailAddress || !user.fullName) {
    console.error("Unauthorized", { user })

    return new Response("Unauthorized", { status: 401 })
  }

  // Create a session for the current user (access token auth)
  const session = liveblocks.prepareSession(String(user?.primaryEmailAddress), {
    userInfo: {
      name: String(user.fullName),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      avatar: user.hasImage ? user.imageUrl : "",
    },
  })

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`belli:*`, session.FULL_ACCESS)

  const { status, body } = await session.authorize()
  return new Response(body, { status })
}
