import { useSpecialHandlingCodes } from "@/lib/hooks/special-handling-codes"
import InputSwitch from "@/components/form/InputSwitch"

export default function SpecialHandlingCodesForm() {
  const { data } = useSpecialHandlingCodes({ page: 1, page_size: 999 })
  const options =
    data?.data.map((item) => ({
      label: `${item.code} - ${item.label}`,
      value: item.id,
    })) ?? []

  return (
    <div className="animate-fade-left">
      <InputSwitch
        name="special_handling_codes"
        type="multi-select"
        selectOptions={options}
        placeholder="Select Special Handling Codes"
      />
    </div>
  )
}
