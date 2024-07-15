"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { paragon } from "@useparagon/connect"

import { paragonToken } from "../utils/paragon"

export function useParagonGlobal() {
  const { user } = useUser()

  const userId = user?.id
  const projectId = process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID

  if (!projectId) {
    throw new Error("Missing Paragon project ID")
  }

  const query = useQuery({
    queryKey: ["paragonAuthKey", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("Missing user ID")
      }

      const token = await paragonToken(userId)

      await paragon.authenticate(projectId, token)

      const user = paragon.getUser()

      return { paragon, token, user }
    },
  })

  return { ...query.data, query }
}
