import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function RightSection() {
  return (
    <Accordion type="multiple" defaultValue={["scheduled"]} className="w-full">
      <AccordionItem value="scheduled" className="rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400 px-3 mb-4">
        <AccordionTrigger className="text-white hover:no-underline">Scheduled</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Route</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">KUL-CGK</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Tail No</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">RPC8971</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Sch Dept</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">19:25:00</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Sch Arrival</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">20:45:00</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Capacity</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">3500</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="actual" className="rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400 px-3 mb-4">
        <AccordionTrigger className="text-white hover:no-underline">Actual</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Route</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">KUL-CGK</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Tail No</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">RPC8971</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Dept</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">19:25:00</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Arrival</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">20:45:00</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center text-white text-sm">Capacity</div>
            <div className="flex gap-1 items-center text-white text-sm font-bold">3500</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
