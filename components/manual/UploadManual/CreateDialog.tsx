import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

const CreateDialog = async () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
            <span className="mr-1 h-4 w-4">
              <UploadIcon />
            </span>
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-lg bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <div className="text-lg font-bold">Upload Manual</div>
            </DialogTitle>
            <DialogDescription className="flex flex-col w-full gap-5 pt-5 pb-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center text-white">
                    <div className="text-sm">Upload Module Name</div>
                  </div>
                  <Input className="border-zinc-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center text-white">
                    <div className="text-sm">Upload Module</div>
                  </div>
                  <Input id="picture" type="file" className="text-white file:border-0 file:bg-transparent file:font-bold file:text-white" />
                </div>
                <div className="flex justify-end mt-5">
                  <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                    <span className="mr-1 h-4 w-4">
                      <UploadIcon />
                    </span>
                    Upload
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateDialog;
