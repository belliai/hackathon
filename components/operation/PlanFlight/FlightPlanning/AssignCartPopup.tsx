import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

const AssignCartPopup = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
            Assign Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">Assign Cart</div>
            </DialogTitle>
            <DialogDescription className="flex flex-col w-full gap-5 pt-5 pb-5">
              <div className="flex gap-4">
                <Input className="border-zinc-500" placeholder="Cart No" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
                <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                  Assign
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AssignCartPopup;
