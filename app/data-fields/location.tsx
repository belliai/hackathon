import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { useLocationSearch } from "@/lib/hooks/locations"
import {
  useGetOrganizationSettings,
  useUpdateOrganizationSettings,
} from "@/lib/hooks/settings/organization"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

const Location = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const form = useForm({
    defaultValues: {
      default_currency_id: "",
      default_location_id: "",
    },
  })

  const { data: orgSettings } = useGetOrganizationSettings<{
    default_currency_id: string
    default_location_id: string
  }>({ sectionKey: "" })

  const { mutateAsync: updateOrgSettings } = useUpdateOrganizationSettings({
    sectionKey: "",
  })

  const { data: locationsSearchList } = useLocationSearch({ searchTerm })

  useEffect(() => {
    if (orgSettings) {
      setSearchTerm(orgSettings.default_location_id)
      form.reset(orgSettings)
    }
  }, [orgSettings])

  return (
    <>
      <div className="flex max-w-screen-md flex-col gap-2 pt-2">
        <label
          htmlFor="timezone_option"
          className="text-sm text-muted-foreground"
        >
          Set default Location:
        </label>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              updateOrgSettings(data, {
                onSuccess: () =>
                  toast({
                    title: "Success!",
                    description: "Default location has been changed",
                  }),
                onError: () => {
                  toast({
                    title: "Oops!",
                    description: "Failed to update default location",
                    variant: "destructive",
                  })
                },
              })
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <InputSwitch
                  type="combobox-async"
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  searchPlaceholder="Search locations by airport code"
                  placeholder="Location"
                  name="default_location_id"
                  options={locationsSearchList?.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                    component: (
                      <p>
                        <span>{item.airport_code}</span>

                        <span className="text-muted-foreground">
                          {" "}
                          {item.city}, {item.country}
                        </span>
                      </p>
                    ),
                  }))}
                />
              </div>
              <Button
                type="submit"
                className="rounded-sm"
                variant="button-primary"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* <DataTable
        columns={[
          { accessorKey: "airport_code", header: "Code", size: 35 },
          { accessorKey: "country", header: "Country", size: 80 },
          { accessorKey: "timezone.name", header: "Timezone" },
        ]}
        manualPagination={true}
        tableState={({ pagination }) => {
          setPaginationState({
            page: pagination ? pagination.pageIndex + 1 : 1,
            page_size: pagination?.pageSize,
          })
        }}
        data={data?.data ?? []}
        pageCount={data?.total_pages}
      /> */}
    </>
  )
}
export default Location
