import { Button } from "@/components/ui/button";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";


export default function FilterBar() {
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex space-x-4">
        <Button className="bg-zinc-800">Filter</Button>
        <Button className="bg-zinc-800">
          <span className="mr-1 h-4 w-4">
            <ReloadIcon />
          </span>
          Refresh
        </Button>
        <Button className="bg-zinc-800">
          <span className="mr-1 h-4 w-4">
            <DownloadIcon />
          </span>
          Download
        </Button>
      </div>
      <Button className="bg-zinc-800">Bulk Assign</Button>
    </div>
  );
}
