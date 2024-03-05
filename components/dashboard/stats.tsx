import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const vals = [
  { name: "Today's AXB", val: "100" },
  { name: "Assigned AXB", val: "100" },
  { name: "Pending AXB", val: "200" },
  { name: "Delivered AXB", val: "100" },
];

export default function Stats() {
  return (
    <>
      <h3 className="text-base font-semibold leading-6">Current Stats</h3>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {vals.map((item) => (
          <Card
            key={item.name}
            className="overflow-hidden rounded-lg border-none bg-zinc-800"
          >
            <CardHeader>
              <CardTitle className="truncate leading-loose text-zinc-400">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-zinc-100">
                {item.val}
              </p>
            </CardContent>
          </Card>
        ))}
      </dl>
    </>
  );
}
