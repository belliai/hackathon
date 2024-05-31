import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm, Path, UseFormReturn } from "react-hook-form"
import { ZodSchema, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forwardRef, useImperativeHandle } from "react";
import { PropsField } from "../../app/accounting/agent/debit-credit-memo/create/fields";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";



// Define the props for your component, including the schema
interface PropsFormData<T extends ZodSchema<any>> {
    schema: T;
    defaultValues: z.infer<T>;
    fields: Array<PropsField>
}

const FormFields = forwardRef(<T extends ZodSchema<any>>(
    { schema, defaultValues, fields }: PropsFormData<T>,
    ref: React.Ref<UseFormReturn<z.infer<T>> | null>
) => {
    const form = useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useImperativeHandle(ref, () => form, [form]);

    const onSubmit = (data: z.infer<T>) => {
        console.log(data);
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                    {fields && fields.map((item: PropsField) => {
                        const { type, fieldId, label, description, options } = item;

                        return (
                            <FormField
                                key={fieldId}
                                control={form.control}
                                name={fieldId as Path<z.infer<T>>}
                                render={({ field }) => (
                                    <FormItem key={fieldId}>
                                        {type === "inputText" && (
                                            <React.Fragment>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-8 min-w-40 border border-zinc-800"
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </React.Fragment>
                                        )}

                                        {type === "inputDate" && (
                                            <React.Fragment>
                                                <FormLabel>{label}</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "h-8 min-w-40 pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {description && <FormDescription>
                                                    {description}
                                                </FormDescription>}
                                                <FormMessage />
                                            </React.Fragment>
                                        )}

                                        {type === "inputSelect" && options && (
                                            <React.Fragment>
                                                <FormLabel>{label}</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? options.find(
                                                                        (language) => language.value === field.value
                                                                    )?.label
                                                                    : "Select " + label}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search .." />
                                                            <CommandEmpty>Not found.</CommandEmpty>
                                                            <CommandList>

                                                                {options && options.map((option) => (
                                                                    <CommandItem
                                                                        value={option.label}
                                                                        key={option.value}
                                                                        onSelect={() => {
                                                                            form.setValue(fieldId as Path<z.infer<T>>, option.value as z.infer<T>[typeof fieldId])
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                option.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {option.label}
                                                                    </CommandItem>
                                                                ))}

                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                {description && <FormDescription>
                                                    {description}
                                                </FormDescription>}
                                                <FormMessage />
                                            </React.Fragment>
                                        )}
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                </div>
            </form>

        </Form>

    )
});
FormFields.displayName = 'FormFields';

export default FormFields

