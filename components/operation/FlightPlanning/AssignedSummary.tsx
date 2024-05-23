import {
    Card,
    CardFooter,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  import { Separator } from "@components/ui/separator";
  const vals = [
    { name: "Total Pieces", val: "5" },
    { name: "Total Weight", val: "2" },
  ];
  
  export default function AssignedSummary() {
    return (
      <>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {vals.map((item) => (
            <Card
              key={item.name}
              className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700"
            >
              <CardContent className="p-2">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {item.val}
                </p>
              </CardContent>
              <Separator className="pl-2 pr-2 bg-zinc-700" />
              <CardFooter className="p-2">
                <CardTitle className="truncate leading-loose text-zinc-400 text-base">
                  {item.name}
                </CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );
  }
  