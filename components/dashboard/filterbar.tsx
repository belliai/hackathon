import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default function FilterBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <Button className="bg-zinc-800 text-white hover:bg-zinc-800/60">
          Filter
        </Button>
        <Button className="bg-zinc-800 text-white hover:bg-zinc-800/60">
          <span className="mr-1 h-4 w-4">
            <ReloadIcon />
          </span>
          Refresh
        </Button>
        <Button className="bg-zinc-800 text-white hover:bg-zinc-800/60">
          <span className="mr-1 h-4 w-4">
            <DownloadIcon />
          </span>
          Download
        </Button>
      </div>
      <Button className="bg-zinc-800 text-white hover:bg-zinc-800/60">
        Bulk Assign
      </Button>
    </div>
  )
}
