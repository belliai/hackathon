"use client"

import { paragon } from "@useparagon/connect"

import { useParagonAuthenticate } from "@/lib/hooks/paragon"

export default function IntegrationsPage() {
  useParagonAuthenticate()

  console.log("paragon user", paragon.getUser())
  return <div></div>
}
