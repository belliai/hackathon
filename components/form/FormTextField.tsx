import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "../ui/input";
import { CalendarIcon, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

type SelectOption = {
  label: string;
  value: string;
};

export type TFormTextField = Omit<FormTextFieldProps, "form">;

export interface FormTextFieldProps {
  name: string;
  type: string;
  label?: string;
  description?: string;
  form: UseFormReturn<any>;
  required?: boolean;
  options?: SelectOption[];
  endIcon?: React.ReactNode;
  hasList?: boolean;
  toolTipContent?: string;
  hideTooltip?: boolean;
  placeholder?: string;
}

export default function FormTextField({
  name,
  type,
  label,
  description,
  form,
  required,
  options,
  endIcon,
  hasList,
  toolTipContent = "This is a tooltip",
  hideTooltip,
  placeholder,
}: FormTextFieldProps) {
  const fieldClassName = cn(
    "bg-transparent border-zinc-700 focus:ring-zinc-800 focus-visible:ring-zinc-700 w-full",
    {
      "pr-8": endIcon,
    }
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        function conditionalRender() {
          switch (type) {
            case "date":
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(fieldClassName,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{placeholder ?? "Pick a date"}</span>
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
              );

            case "checkbox":
              return (
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0 leading-none">
                    <FormLabel className="text-zinc-400">
                      {label} {required ? "*" : ""}
                    </FormLabel>
                    <FormDescription>{description}</FormDescription>
                  </div>
                </div>
              );

            case "select":
              return (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(fieldClassName, {
                        "text-zinc-400": !field.value,
                      })}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-zinc-500 border-zinc-700 bg-zinc-800">
                    {options?.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            default:
              return (
                <FormControl>
                  <div className="flex gap-1 items-center">
                    <div className="relative w-full">
                      <Input
                        {...field}
                        type={type}
                        className={fieldClassName}
                        placeholder={placeholder}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-zinc-400">
                        {endIcon}
                      </span>
                    </div>
                    {hasList && (
                      <Button
                        size="icon"
                        type="button"
                        className="text-zinc-400"
                      >
                        <ListBulletIcon className="w-6 h-6" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              );
          }
        }
        return (
          <FormItem className="w-full space-y-2">
            {label && type !== "checkbox" && (
              <div className="flex items-center gap-1 text-zinc-50">
                <FormLabel className="text-sm">
                  {label} {required ? "*" : ""}{" "}
                </FormLabel>
                {toolTipContent && !hideTooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <Info size={16} />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex flex-col gap-2 text-sm"
                      >
                        <span className="text-black">{label}</span>
                        <span className="text-zinc-500">{toolTipContent}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
            {conditionalRender()}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
