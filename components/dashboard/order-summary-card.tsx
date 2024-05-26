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
        <CardTitle>Amount Due</CardTitle>
        <CardDescription>$0.00</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <KeyValueDisplay
          entries={{
            "Airway Bill": "IP-2312-12310938",
            "Amount Paid": `$ 20.0`,
          }}
        />
      </CardContent>
      <Separator />
      <CardContent className="p-4">
        <KeyValueDisplay
          entries={{
            "Sub Total": `$ 20.0`,
            "Grand Total": `$ 20.0`,
          }}
        />
      </CardContent>
    </Card>
  );
}
