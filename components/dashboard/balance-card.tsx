import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KeyValueDisplay from "@/components/ui/key-value-display";
import { Separator } from "@/components/ui/separator";

export default function BalanceCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>Amount</CardTitle>
        <CardDescription>$100.00</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-3">
        <KeyValueDisplay
          entries={{
            Balance: "$ 20.0",
          }}
        />
      </CardContent>
    </Card>
  );
}
