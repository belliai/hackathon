import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm, Path, UseFormReturn } from "react-hook-form"
import { ZodSchema, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forwardRef, useImperativeHandle } from "react";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { PropsField } from "./types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";



// Define the props for your component, including the schema
interface PropsFormData<T extends ZodSchema<any>> {
    schema?: T;
    defaultValues?: z.infer<T>;
    fields: Array<PropsField>;
    actions?: React.ReactNode
    cols?: number
}

const FormFields = forwardRef(<T extends ZodSchema<any>>(
    { schema, defaultValues, fields, actions, cols }: PropsFormData<T>,
    ref: React.Ref<UseFormReturn<z.infer<T>> | null>
) => {
    const form = useForm<z.infer<T>>({
        resolver: schema && zodResolver(schema),
        defaultValues,
    });

    useImperativeHandle(ref, () => form, [form]);

    const onSubmit = (data: z.infer<T>) => {
        console.log(data);
    };

    const RenderInput = (props: PropsField) => {
        const { type, fieldId, label, description, options, className } = props;

        return (
            <FormField
                key={fieldId}
                control={form.control}
                name={fieldId as Path<z.infer<T>>}
                render={({ field }) => (
                    <FormItem key={fieldId}>
                        {type === "inputText" && (
                            <div className={"flex flex-col h-full w-full justify-end space-y-1"}>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        className={cn("h-8 border border-zinc-800", className)}
                                        placeholder=""
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}

                        {type === "inputDate" && (
                            <div className="flex flex-col h-full justify-end space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "h-8  pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                    className
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span >Pick a date</span>
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
                            </div>
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
                                                    "justify-between h-8 w-full",
                                                    !field.value && "text-muted-foreground",
                                                    className
                                                )}
                                            >
                                                {field.value
                                                    ? options.find(
                                                        (language) => language.value === field.value
                                                    )?.label
                                                    : "Select ..."}
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

                        {type === "inputCheck" &&

                            <div className="flex space-x-2 items-end h-full">
                                <FormControl>
                                    <Checkbox
                                        className={cn("h-5 w-5", className)}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        {label}
                                    </FormLabel>
                                    {description && <FormDescription>
                                        {description}
                                    </FormDescription>}
                                </div>
                            </div>

                        }

                        {type === "inputRadio" && <div className="flex flex-col space-y-2  h-full">
                            <FormLabel>
                                {label}
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-1  h-full"
                                >
                                    {options && options.map((option, id) =>
                                        <FormItem key={id} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option.label}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </div>}
                    </FormItem>

                )}
            />

        );
    }


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className={cn("grid  gap-2", cols ? "grid-cols-" + cols : "grid-cols-4")}>
                    {fields && fields.map((item: PropsField, id) => {
                        const { children, fieldId } = item;
                        if (children) {
                            return <div className="flex space-x-1 w-full" key={fieldId + id} >
                                {children.map((item: PropsField, id) => {
                                    return <RenderInput key={item.fieldId + id} {...item} />
                                })}
                            </div>
                        } else
                            return <RenderInput key={fieldId + id} {...item} />
                    })}

                    {actions}
                </div>
            </form>

        </Form>

    )
});




FormFields.displayName = 'FormFields';

export default FormFields

