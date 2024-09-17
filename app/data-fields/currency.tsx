import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { useCurrencySearch } from "@/lib/hooks/currencies"
import {
  useGetOrganizationSettings,
  useUpdateOrganizationSettings,
} from "@/lib/hooks/settings/organization"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

const Currency = () => {
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

  const { data: currencySearchList } = useCurrencySearch({
    searchTerm: searchTerm,
  })

  useEffect(() => {
    if (orgSettings) {
      setSearchTerm(orgSettings.default_currency_id)
      form.reset(orgSettings)
    }
  }, [orgSettings])

  return (
    <div className="flex w-full max-w-screen-md flex-col gap-2 pt-2">
      <label
        htmlFor="timezone_option"
        className="text-sm text-muted-foreground"
      >
        Set default Currency:
      </label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            updateOrgSettings(data, {
              onSuccess: () =>
                toast({
                  title: "Success!",
                  description: "Default currency has been changed",
                }),
              onError: () => {
                toast({
                  title: "Oops!",
                  description: "Failed to update default currency",
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
                searchPlaceholder="Start by searching for currencies"
                placeholder="Currency"
                name="default_currency_id"
                options={currencySearchList?.data.map((item) => ({
                  value: item.id,
                  label: item.currency_name,
                  component: (
                    <p>
                      <span>{item.currency_name}</span>

                      <span className="text-muted-foreground">
                        {" - "}
                        {item.currency_code}
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
  )
}
export default Currency
