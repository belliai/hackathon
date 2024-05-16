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
    <>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {vals.map((item) => (
          <Card
            key={item.name}
            className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700"
          >
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-zinc-100 mt-5">
                {item.val}
              </p>
            </CardContent>
            <Separator className="pl-2 pr-2 bg-zinc-700" />
            <CardFooter>
              <CardTitle className="truncate leading-loose text-zinc-400">
                {item.name}
              </CardTitle>
            </CardFooter>
          </Card>
        ))}
      </dl>
    </>
  );
}
