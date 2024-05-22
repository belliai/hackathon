"use client"

import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface FilterDateProps {
    onChange: (value: Date | undefined) => void;
    value: any
    name: string
    className?: string
}

const FilterDatePicker = ({  value, name, onChange, className }: FilterDateProps) => {

    return (
        <div className={cn("flex flex-col space-y-1",className)}>
            <Label className="text-xs opacity-50">{name}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "pl-3 h-8 w-40 text-left font-normal bg-zinc-900 hover:bg-zinc-900 hover:text-white border-zinc-800 focus:ring-1  focus:ring-indigo-600 active:ring-indigo-600"
                        )}
                    >
                        {value ? (
                            format(value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="leading-3 ml-auto h-4 w-4 opacity-50" />
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-zinc-800" align="start">
                    <Calendar
                        className="bg-zinc-900 text-white "
                        mode="single"
                        selected={value}
                        onSelect={(date) => onChange(date)}
                        
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )

}

export default FilterDatePicker;