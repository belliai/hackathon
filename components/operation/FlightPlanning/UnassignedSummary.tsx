import { Separator } from "@components/ui/separator"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

const vals = [
  { name: "Total AWB", val: "10" },
  { name: "Total Pieces", val: "5" },
  { name: "Total Weight", val: "2" },
]

export default function UnassignedSummary() {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {vals.map((item) => (
          <Card
            key={item.name}
            className="overflow-hidden rounded-lg border-[1px] border-zinc-700 bg-transparent"
          >
            <CardContent className="p-2">
              <p className="text-3xl font-semibold tracking-tight text-white">
                {item.val}
              </p>
            </CardContent>
            <Separator className="bg-zinc-700 pl-2 pr-2" />
            <CardFooter className="p-2">
              <CardTitle className="truncate text-base leading-loose text-zinc-400">
                {item.name}
              </CardTitle>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
