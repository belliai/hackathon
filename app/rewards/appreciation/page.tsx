import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";

export default async function Appreciation() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col mt-10 gap-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Appreciation</h1>
          <div className="flex gap-4">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
              <span className="mr-1 h-4 w-4">
                <ReloadIcon />
              </span>
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
          <div className="text-white text-base font-semibold">Send Appreciation</div>
          <div className="flex gap-4">
            <div className="w-1/6">
              <Input className="border-zinc-500" placeholder="Employee" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
            </div>
            <div className="w-1/6">
              <Input className="border-zinc-500" placeholder="Remarks" />
            </div>

            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              <span className="mr-1 h-4 w-4">
                <HandThumbUpIcon />
              </span>
              Send Appreciation
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
