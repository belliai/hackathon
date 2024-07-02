
import { Button } from "@/components/ui/button";
import Contents from "./contents";
import Link from "next/link";

export default async function Page() {

  const Actions = () => {
    return (
      <div>
        <Link href="/accounting/agent/charge-correction/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Create Charges Correction Advise
          </Button>
        </Link>

      </div>
    )
  }

  const props = {
    title: "Charge Correction Advise",
    actions: <Actions />
  }

  return (
    <Contents  {...props} />
  );
}
