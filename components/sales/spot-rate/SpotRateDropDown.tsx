import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SpotRateDropDown = ({ className }: { className?: string }) => {
  return (
    <>
      <Select>
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Option 1</SelectItem>
            <SelectItem value="banana">Option 2</SelectItem>
            <SelectItem value="blueberry">Option 3</SelectItem>
            <SelectItem value="grapes">Option 4</SelectItem>
            <SelectItem value="pineapple">Option 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default SpotRateDropDown
