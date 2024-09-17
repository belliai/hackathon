import CrudTable from "./components/crud-table"

interface SpecialHandlingCode {
  id: number
  label: string
  code: string
  additional: string
}

const specialHandlingCodesData: SpecialHandlingCode[] = [
  { id: 1, label: "dangerous goods", code: "DG", additional: "$1.00" },
  { id: 2, label: "cold-chain", code: "CC", additional: "$2.00" },
  { id: 3, label: "valuable goods", code: "VAL", additional: "$3.00" },
  { id: 4, label: "fuel surcharge", code: "FSC", additional: "$0.50" },
  { id: 5, label: "security charge", code: "SC", additional: "$0.25" },
  { id: 6, label: "landing & parking", code: "LP", additional: "$0.75" },
  { id: 7, label: "perishables", code: "PER", additional: "$0.50" },
  {
    id: 8,
    label: "odc charges - odd dimensions (MDC deck shipment)",
    code: "ODC",
    additional: "$1.00",
  },
  { id: 9, label: "postal mail", code: "PSM", additional: "$0.10" },
  { id: 10, label: "interline shipment", code: "INT", additional: "$0.00" },
  { id: 11, label: "human remains", code: "HUM", additional: "$1.00" },
  { id: 12, label: "live animals", code: "AVI", additional: "$2.00" },
  { id: 13, label: "fragile cargo", code: "FRG", additional: "$1.00" },
  { id: 14, label: "diplomatic mail", code: "DIP", additional: "$2.00" },
  { id: 15, label: "courier service", code: "COU", additional: "$1.00" },
  { id: 16, label: "radioactive materials", code: "RAM", additional: "$0.50" },
  { id: 17, label: "arms and ammunition", code: "QRT", additional: "$0.25" },
  { id: 18, label: "dry ice", code: "ICE", additional: "$0.75" },
  {
    id: 19,
    label: "wheelchairs (battery-powered)",
    code: "WCB",
    additional: "$0.50",
  },
  { id: 20, label: "ship's spares", code: "SPX", additional: "$1.00" },
  { id: 21, label: "oversized cargo", code: "BIG", additional: "$0.10" },
]

const SpecialHandlingCodes = ({
  tabComponent,
}: {
  tabComponent?: React.ReactNode
}) => {
  return (
    <CrudTable
      columns={[
        {
          accessorKey: "label",
          header: "Label",
          size: 250,
        },
        {
          accessorKey: "code",
          header: "Code",
        },
        {
          accessorKey: "additional",
          header: "Additional Fee",
        },
      ]}
      title="Payment Mode"
      form={[
        { name: "id", type: "hidden" },
        { name: "label", type: "text", label: "Label" },
        { name: "code", type: "text", label: "Code" },
        { name: "additional", type: "number", label: "Additional Fee" },
      ]}
      data={specialHandlingCodesData}
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
      }}
      onDelete={(data) => {
        // configure logic for delete
      }}
      tabComponent={tabComponent}
    />
  )
}
export default SpecialHandlingCodes
