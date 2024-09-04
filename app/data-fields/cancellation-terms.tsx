import { TicketPercentIcon } from "lucide-react"

import CrudTiledView from "./components/crud-tiled-view"

interface CancellationTerm {
  id: number
  cancellationTerms: string
  discount: number
}

const cancellationTermsData: CancellationTerm[] = [
  { id: 1, cancellationTerms: "free cancellation", discount: 0 },
  {
    id: 2,
    cancellationTerms: "free cancellation up to 48 hrs before departure",
    discount: 5,
  },
  {
    id: 3,
    cancellationTerms: "free cancellation up to 4 days before departure",
    discount: 10,
  },
  { id: 4, cancellationTerms: "non-refundable", discount: 20 },
]
const CancellationTerms = ({
  tabComponent,
}: {
  tabComponent?: React.ReactNode
}) => {
  return (
    <CrudTiledView
      identifier="id"
      className="inline-flex w-full items-center justify-between"
      rowRenderer={(item) => (
        <>
          <span>{item.cancellationTerms}</span>
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
        { name: "cancellationTerms", type: "text", label: "Cancellation Term" },
        { name: "discount", type: "number", label: "Discount" },
      ]}
      data={cancellationTermsData}
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
export default CancellationTerms
