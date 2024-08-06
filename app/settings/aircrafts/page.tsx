"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import PageContainer from "@/components/layout/PageContainer"
import AircraftDataTable from "./components/tabs/aircraft-data-table"
import TailNumbersForm from "./components/tabs/tail-numbers-form"

export default function MasterAircraftPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsTabValue = searchParams.get("tab")

  const [tabValue, setTabValue] = useState(paramsTabValue || "tail-numbers")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    router.replace(pathname + "?" + createQueryString(key, value))
  }

  const handleTabChange = (val: string) => setSearchParams("tab", val)

  useEffect(() => {
    handleTabChange(tabValue)
  }, [tabValue])

  return (
    <PageContainer>
      <div>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-4"
        >
          <TabsContent value="aircraft-types" asChild>
            <AircraftDataTable />
          </TabsContent>
          <TabsContent value="tail-numbers" asChild>
            <TailNumbersForm />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
