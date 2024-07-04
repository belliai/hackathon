import Link from "next/link"

import { Button } from "@/components/ui/button"

import Contents from "./contents"

export default async function MasterAuditLog() {
  const Actions = () => {
    return (
      <div>
        <Link href="/accounting/agent/debit-credit-memo/create">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Generate DCM
          </Button>
        </Link>
      </div>
    )
  }

  const props = {
    title: "+ Debit Credit Memo (DCM)",
    actions: <Actions />,
  }

  return <Contents {...props} />
}
