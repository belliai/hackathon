import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KeyValueDisplay from "@/components/ui/key-value-display";
import { Separator } from "@/components/ui/separator";

export default function OrderSummaryCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>AWB</CardTitle>
        <CardDescription>807-111-323</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-3">
        <KeyValueDisplay
          entries={{
            Origin: "MAD",
            Destination: "AMS",
            "Commodity Code": "233-212-2333",
            "Special Handling": "DG",
          }}
        />
      </CardContent>
    </Card>
  );
}