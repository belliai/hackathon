import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KeyValueDisplay from "@/components/ui/key-value-display";
import { Separator } from "@/components/ui/separator";

export default function DimensionsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>Weight</CardTitle>
        <CardDescription>100 Kg</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-3">
        <KeyValueDisplay
          entries={{
            Dimensions: "20cm x 50cm x 10cm",
          }}
        />
      </CardContent>
    </Card>
  );
}
