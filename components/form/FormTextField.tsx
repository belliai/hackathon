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
import { Info } from "lucide-react";
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

type SelectOption = {
  label: string;
  value: string;
};

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
    "bg-transparent border-zinc-700 focus:ring-zinc-800 focus-visible:ring-zinc-700",
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
            case "select":
              return (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(fieldClassName, "min-w-[202px]")}
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
          <FormItem>
            {label && (
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
