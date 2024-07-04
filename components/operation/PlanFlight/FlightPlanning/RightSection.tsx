import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

export default function RightSection() {
  return (
    <Accordion type="multiple" defaultValue={["scheduled"]} className="w-full">
      <AccordionItem
        value="scheduled"
        className="mb-4 rounded-lg border-[1px] border-zinc-700 bg-transparent px-3 text-zinc-400"
      >
        <AccordionTrigger className="text-white hover:no-underline">
          Scheduled
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Route
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              KUL-CGK
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Tail No
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              RPC8971
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Dept
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              19:25:00
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Arrival
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              20:45:00
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Capacity
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              3500
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="actual"
        className="mb-4 rounded-lg border-[1px] border-zinc-700 bg-transparent px-3 text-zinc-400"
      >
        <AccordionTrigger className="text-white hover:no-underline">
          Actual
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Route
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              KUL-CGK
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Tail No
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              RPC8971
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Dept
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              19:25:00
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Arrival
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              20:45:00
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              Capacity
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              3500
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="estimated"
        className="mb-4 rounded-lg border-[1px] border-zinc-700 bg-transparent px-3 text-zinc-400"
      >
        <AccordionTrigger className="text-white hover:no-underline">
          Estimated
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              ETD
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              -
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-white">
              ETA
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              -
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
