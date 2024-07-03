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

const AssignULDPopup = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            Assign ULD
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg border-none bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">Assign ULD</div>
            </DialogTitle>
            <DialogDescription className="flex w-full flex-col gap-5 pb-5 pt-5">
              <div className="flex gap-4">
                <Input
                  className="border-zinc-500"
                  placeholder="ULD No"
                  rightIcon={
                    <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                  }
                />
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

export default AssignULDPopup
