import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterForm } from "./filter-form"

const HeaderSection: React.FC = () => {
  return (
    <header className="flex justify-between sticky top-[48px] z-10 bg-background/40 px-4 py-2 backdrop-blur-sm items-center -ml-[1rem] -mr-[1rem]">
      <section className="flex flex-col">
        <h3 className="font-bold">Displaying all flights from SIN to BKK</h3>
        <p className="text-sm text-muted-foreground">Sep 14, 2024 - Sep 20, 2024</p>
      </section>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-fit" variant="secondary">
            <Filter className="size-4 mr-1" />
            <span className="font-bold">Filters</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[750px] p-4">
          <FilterForm />
        </PopoverContent>
      </Popover>
    </header>
  )
}

export { HeaderSection }