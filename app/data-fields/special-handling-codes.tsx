import {
  useCreateSpecialHandlingCode,
  useDeleteSpecialHandlingCode,
  useSpecialHandlingCodes,
  useUpdateSpecialHandlingCode,
} from "@/lib/hooks/special-handling-codes"
import { toast } from "@/components/ui/use-toast"

import CrudTable from "./components/crud-table"
import CrudTiledView from "./components/crud-tiled-view"

const SpecialHandlingCodes = ({
  tabComponent,
}: {
  tabComponent?: React.ReactNode
}) => {
  const { data: specialHandlingCodes } = useSpecialHandlingCodes({
    page: 1,
    page_size: 999,
  })

  const { mutateAsync: update } = useUpdateSpecialHandlingCode()
  const { mutateAsync: create } = useCreateSpecialHandlingCode()
  const { mutateAsync: remove } = useDeleteSpecialHandlingCode()

  return (
    <CrudTiledView
      identifier="id"
      rowRenderer={(data) => (
        <div className="inline-flex w-full items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <span className="w-8 font-mono">{data.code}</span>
            <span className="text-muted-foreground">{data.label}</span>
          </div>
          <span className="tabular-nums">{data.formatted_fee}</span>
        </div>
      )}
      title="Payment Mode"
      form={[
        { name: "id", type: "hidden" },
        { name: "label", type: "text", label: "Label" },
        { name: "code", type: "text", label: "Code" },
        { name: "fee", type: "number", label: "Additional Fee" },
      ]}
      data={specialHandlingCodes?.data ?? []}
      dataTransformer={(data) => ({
        ...data,
        fee: Number(convertToDollarPrice(data.fee)),
      })}
      onSave={(data) => {
        data.fee = convertToThreeDigitNumber(String(data.fee))
        if (data.id) {
          update(data, {
            onSuccess: () =>
              toast({
                title: "Success!",
                description: "Handling code updated",
              }),
          })
        } else {
          create(data, {
            onSuccess: () =>
              toast({
                title: "Success!",
                description: "Handling code created",
              }),
          })
        }
      }}
      onDelete={(data) => {
        remove(data.id, {
          onSuccess: () =>
            toast({
              title: "Success!",
              description: "Handling code deleted",
            }),
        })
      }}
      tabComponent={tabComponent}
    />
  )
}
export default SpecialHandlingCodes

function convertToThreeDigitNumber(price: string): number {
  // Convert the price string to a number and multiply by 100 (to shift to two decimal places)
  const numericValue = Math.round(parseFloat(price) * 100)

  // Return the numeric value
  return numericValue
}

function convertToDollarPrice(value: number): string {
  // Divide the number by 100 to convert it back to a dollar amount
  const price = value / 100

  // Return the result as a string, keeping up to two decimal places
  return price.toFixed(2)
}
