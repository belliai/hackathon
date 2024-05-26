import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
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
            Add New Document
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">New Document</div>
            </DialogTitle>
            <DialogDescription className="flex flex-col w-full gap-5 pt-5 pb-5">
                <div className="flex gap-4">
                  <Input className="border-zinc-500" placeholder="Document Type" />
                  <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                    Create Document
                  </Button>
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateDialog;