import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KeyValueDisplay from "@/components/ui/key-value-display";
import { Separator } from "@/components/ui/separator";
import { formatDollar } from "@/lib/utils/format";

export default function BalanceCard(props: any) {
  const {
    total,
    amount_due
  } = props
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>Amount</CardTitle>
        <CardDescription>{formatDollar(total)}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-3">
        <KeyValueDisplay
          entries={{
            Balance: formatDollar(amount_due),
          }}
        />
      </CardContent>
    </Card>
  );
}
