import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "../ui/separator"

const vals = [
  { name: "Today's AXB", val: "10" },
  { name: "Assigned AXB", val: "5" },
  { name: "Pending AXB", val: "2" },
  { name: "Delivered AXB", val: "24" },
]

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {vals.map((item) => (
        <Card key={item.name} className="rounded-md bg-card/30">
          <CardHeader className="px-6 py-3">
            <CardTitle className="text-3xl font-extrabold">
              {item.val}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardFooter className="px-6 py-3">
            <CardTitle className="truncate text-sm font-medium leading-none text-muted-foreground">
              {item.name}
            </CardTitle>
          </CardFooter>
        </Card>
      ))}
    </dl>
  )
}
