import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils";

interface SelectProps {
    onChange: (value: string) => void;
    value: string
    name: string
    options: Array<{ key: string; value: string }>;
    className?: string
}


const FilterSelect = (props: SelectProps) => {
    const { onChange, value, name, options, className } = props

    return (
        <div >
            <Label className="text-xs opacity-50">{name}</Label>
            <Select  onValueChange={onChange} value={value}>
                <SelectTrigger className={cn("h-8  focus-visible:ring-1 focus-visible:ring-indigo-600 focus:ring-1 focus:ring-indigo-600 active:ring-indigo-600",className)}>
                    <SelectValue  placeholder={``} >
                        {options && options.find((item: any) => item.value === value)?.value}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-[20rem]">
                    {/* <SelectItem value=""></SelectItem> */}
                    {options.map((item) => {
                        return (<SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>)
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterSelect