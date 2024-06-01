
import { Button } from "@/components/ui/button";
import Contents from "./contents";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function Page() {


  const Actions = () => {
    return (
      <div className="flex space-x-2 items-center"> 
          <p className="text-xs w-full text-right">Reference no</p>
          <Input  />
          <Button variant="button-secondary">
            Clear
          </Button>

      </div>
    )
  }
  const props = {
    title: "Create Charter",
    actions: <Actions />
  }


  return (
    <Contents  {...props} />
  );
}
