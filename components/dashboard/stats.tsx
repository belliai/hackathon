import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
const vals = [
  { name: "Today's AXB", val: "10" },
  { name: "Assigned AXB", val: "5" },
  { name: "Pending AXB", val: "2" },
  { name: "Delivered AXB", val: "24" },
];

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {vals.map((item) => (
        <Card key={item.name} className=" rounded-md bg-card/30">
          <CardHeader className="py-3 px-6">
            <CardTitle className="text-3xl font-extrabold">
              {item.val}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardFooter className="py-3 px-6">
            <CardTitle className="truncate leading-none text-muted-foreground text-sm font-medium">
              {item.name}
            </CardTitle>
          </CardFooter>
        </Card>
      ))}
    </dl>
  );
}
