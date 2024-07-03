import { PlusIcon } from "@radix-ui/react-icons"

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

const CreateDialog = async () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            <span className="mr-1 h-4 w-4">
              <PlusIcon />
            </span>
            Add New Document
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg border-none bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">New Document</div>
            </DialogTitle>
            <DialogDescription className="flex w-full flex-col gap-5 pb-5 pt-5">
              <div className="flex gap-4">
                <Input
                  className="border-zinc-500"
                  placeholder="Document Type"
                />
                <Button className="bg-button-primary text-white hover:bg-button-primary/80">
                  Create Document
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateDialog
