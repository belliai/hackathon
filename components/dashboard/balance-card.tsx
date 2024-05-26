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
        <CardTitle>Balance</CardTitle>
        <CardDescription>$0.00</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <h5 className="text-foreground font-semibold text-xs">Elroy Careen</h5>
        <KeyValueDisplay
          entries={{
            "Individual Balance": "$ 20.0",
          }}
        />
      </CardContent>
    </Card>
  );
}
