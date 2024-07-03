import Link from "next/link"

import { Button } from "@/components/ui/button"

import Contents from "./contents"

export default async function Page() {
  const Actions = () => {
    return (
      <div>
        <Link href="/accounting/charter/create">
          <Button variant="button-primary">Create Charter</Button>
        </Link>
      </div>
    )
  }

  const props = {
    title: "Charter",
    actions: <Actions />,
  }

  return <Contents {...props} />
}
