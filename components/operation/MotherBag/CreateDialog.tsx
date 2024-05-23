import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dashboard/dashtable";
import { createDialogColumn } from "@/components/operation/MotherBag/columns";
import { getDataCreateDialog } from "@/lib/operation/MotherBag/data";

const CreateDialog = async () => {
  const data = await getDataCreateDialog();

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
            <span className="mr-1 h-4 w-4">
              <PlusIcon />
            </span>
            Create Mother Bag
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-7xl bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">Create Mother Bag</div>
            </DialogTitle>
            <DialogDescription className="flex flex-col w-full gap-5 pt-5 pb-5">
              <div className="flex gap-4">
                <Input className="border-zinc-500" placeholder="Origin" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                <Input className="border-zinc-500" placeholder="Destination" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                <Input className="border-zinc-500" placeholder="AXB" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  <span className="mr-1 h-4 w-4">
                    <MagnifyingGlassIcon />
                  </span>
                  Search
                </Button>
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  <span className="mr-1 h-4 w-4">
                    <ReloadIcon />
                  </span>
                  Refresh
                </Button>
              </div>

              <Separator className="pl-2 pr-2 bg-zinc-700" />

              <div className="text-base font-bold text-white">Booking List</div>

              <DataTable columns={createDialogColumn} data={data} />

              <Separator className="pl-2 pr-2 bg-zinc-700" />

              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Input className="border-zinc-500" placeholder="Origin" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                  <Input className="border-zinc-500" placeholder="Destination" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                  <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                    Create MB
                  </Button>
                </div>
                <div className="text-base font-semibold text-white">Total: 0</div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateDialog;
