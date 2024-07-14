"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { paragon } from "@useparagon/connect"

import { paragonToken } from "../utils/paragon"

export function useParagonAuthenticate() {
  const { user } = useUser()

  const userId = user?.id
  const projectId = process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID

  const query = useQuery({
    queryKey: ["paragonAuthKey", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("Missing user ID")
      }

      const res = await paragonToken(userId)

      return res
    },
  })

  if (!projectId) {
    throw new Error("Missing Paragon project ID")
  }

  if (query.data) {
    paragon.authenticate(projectId, query.data)
  }

  return { token: query.data, query }
}
