import { Column, FilterMeta, Table } from "@tanstack/react-table";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


const FilterDebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    title,
    className,
    ...props
    
}: {
    title?: string,
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
    className? : string,
    [x:string]: any
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={cn("flex-col",className)}>
            <Label className="text-xs opacity-50">{title}</Label>
            <Input className="h-8 focus-visible:ring-1 focus-visible:ring-indigo-600 focus:ring-indigo-600 active:ring-indigo-600" 
            {...props} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    )
}

export default FilterDebouncedInput