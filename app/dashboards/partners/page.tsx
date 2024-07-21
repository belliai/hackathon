"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Building2Icon, Contact2Icon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"

import { companiesColumns } from "./components/columns/companies-columns"
import { peopleColumns } from "./components/columns/people-columns"
import { DUMMY_COMPANIES_DATA, PEOPLE_DUMMY_DATA } from "./constants/dummy-data"

export default function MasterAircraftPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [tabValue, setTabValue] = useState(
    searchParams.get("tab") ?? "companies"
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    console.log({ key, value })
    // i have no idea why this is not working
    router.push(pathname + "?" + createQueryString(key, value))
  }

  useEffect(() => {
    setSearchParams("tab", tabValue)
  }, [tabValue])

  const tabsList = (
    <TabsList className="gap-2 bg-transparent p-0">
      <TabsTrigger
        className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="companies"
      >
        <Building2Icon className="mr-2 size-4" />
        Companies
      </TabsTrigger>
      <TabsTrigger
        className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
        value="people"
      >
        <Contact2Icon className="mr-2 size-4" />
        People
      </TabsTrigger>
    </TabsList>
  )

  return (
    <PageContainer>
      <div>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-4"
        >
          <TabsContent value="companies" asChild>
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={companiesColumns}
              data={DUMMY_COMPANIES_DATA ?? []}
              // onRowClick={handleAircraftRowClick}
              menuId="companies"
              extraRightComponents={
                <Button
                  size={"sm"}
                  variant={"button-primary"}
                  className="p-2 text-sm"
                >
                  <PlusIcon className="mr-2 size-4" />
                  New Company
                </Button>
              }
              extraLeftComponents={tabsList}
            />
          </TabsContent>
          <TabsContent value="people" asChild>
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={peopleColumns}
              data={PEOPLE_DUMMY_DATA ?? []}
              // onRowClick={handleAircraftRowClick}
              menuId="people"
              extraRightComponents={
                <Button
                  size={"sm"}
                  variant={"button-primary"}
                  className="p-2 text-sm"
                >
                  <PlusIcon className="mr-2 size-4" />
                  New Person
                </Button>
              }
              extraLeftComponents={tabsList}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
