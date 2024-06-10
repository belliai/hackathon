
import { Button } from "@/components/ui/button";
import Contents from "./contents";
import Link from "next/link";

export default async function MasterAuditLog() {

  const props = {
    title: "Debit Credit Memo (DCM)"
  }

  return (
    <Contents  {...props} />
  );
}
