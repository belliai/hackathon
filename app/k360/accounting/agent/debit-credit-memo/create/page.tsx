import { Button } from "@/components/ui/button"

import Contents from "./contents"

export default async function Page() {
  const props = {
    title: "Create Debit Credit Memo (DCM)",
  }

  return <Contents {...props} />
}
