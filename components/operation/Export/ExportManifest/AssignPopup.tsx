import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const AssignPopup = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            Assign
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg border-none bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">Assign</div>
            </DialogTitle>
            <DialogDescription className="flex w-full flex-col gap-5 pb-5 pt-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-white">
                  <div className="text-sm">AWB</div>
                </div>
                <Input
                  className="border-zinc-500"
                  rightIcon={
                    <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-white">
                  <div className="text-sm">Flight</div>
                </div>
                <Input
                  className="border-zinc-500"
                  rightIcon={
                    <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                  }
                />
              </div>

              <div className="flex gap-4">
                <div className="flex w-1/2 flex-col gap-2">
                  <div className="flex items-center gap-1 text-white">
                    <div className="text-sm">Pieces</div>
                  </div>
                  <Input className="border-zinc-500" />
                </div>

                <div className="flex w-1/2 flex-col gap-2">
                  <div className="flex items-center gap-1 text-white">
                    <div className="text-sm">Weight</div>
                  </div>
                  <Input className="border-zinc-500" />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-button-primary text-white hover:bg-button-primary/80">
                  Assign
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AssignPopup
