import { TicketPercentIcon } from "lucide-react"

import CrudTiledView from "./components/crud-tiled-view"

interface PaymentTerm {
  id: number
  paymentTerms: string
  discount: number
}

const paymentTermsData: PaymentTerm[] = [
  { id: 1, paymentTerms: "pay now", discount: 30 },
  { id: 2, paymentTerms: "pay on delivery", discount: 20 },
  { id: 3, paymentTerms: "pay 14 days after delivery", discount: 15 },
  { id: 4, paymentTerms: "pay 30 days after delivery", discount: 10 },
  { id: 5, paymentTerms: "pay 60 days after delivery", discount: 5 },
  { id: 6, paymentTerms: "pay 90 days after delivery", discount: 0 },
]

const PaymentTerms = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  return (
    <CrudTiledView
      identifier="id"
      className="inline-flex w-full items-center justify-between"
      rowRenderer={(item) => (
        <>
          <span>{item.paymentTerms}</span>
          <div className="inline-flex items-center gap-2">
            <TicketPercentIcon className="size-4 text-muted-foreground" />
            <p className="tabular-nums">
              {item.discount}%{" "}
              <span className="text-muted-foreground">discount</span>
            </p>
          </div>
        </>
      )}
      title="Payment Mode"
      form={[
        { name: "id", type: "hidden" },
        { name: "paymentTerms", type: "text", label: "Payment Term" },
        { name: "discount", type: "number", label: "Discount" },
      ]}
      data={paymentTermsData}
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
export default PaymentTerms
