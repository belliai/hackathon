import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EditIcon, PlusCircleIcon, SaveIcon, TrashIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CrudTableProps<T extends FieldValues> = {
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
  form: {
    name: Path<T>;
    label?: string;
    type: "text" | "select" | "hidden";
    selectOptions?: { label: string; value: string }[];
  }[];
  onSave: (data: T) => void;
  onDelete: (data: T) => void;
};

function InputSwitch<T extends FieldValues>(props: {
  formField: CrudTableProps<T>["form"][0];
}) {
  const form = useFormContext<T>();
  const { label, name, type, selectOptions } = props.formField;
  switch (type) {
    case "select":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold text-muted-foreground">
                {label}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "hidden":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
      );
    default:
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold text-muted-foreground">
                {label}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
  }
}

const FormDialog = <T extends FieldValues>(
  props: PropsWithChildren & {
    form: CrudTableProps<T>["form"];
    onSave: CrudTableProps<T>["onSave"];
    data?: DefaultValues<T>;
    title: string;
  }
) => {
  const [open, setOpen] = useState(false);
  const form = useForm<T>({
    defaultValues: props.data,
  });

  const onSubmit = (data: T) => {
    props.onSave(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>
                {Boolean(props.data)
                  ? `Edit ${props.title}`
                  : `Add ${props.title}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-1">
              {props.form.map((formField) => (
                <InputSwitch key={formField.name} formField={formField} />
              ))}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                type="button"
                variant={"secondary"}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"button-primary"}>
                <SaveIcon className="mr-2 size-4" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default function CrudTable<T extends FieldValues>(
  props: CrudTableProps<T>
) {
  const { data, title } = props;

  const columns: ColumnDef<T>[] = [
    {
      id: "number",
      header: ({ table }) => <>No.</>,
      cell: ({ row }) => <>{row.index + 1}</>,
      enableSorting: false,
      enableHiding: false,
    },
    ...props.columns,
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-row items-center justify-end w-full">
          <FormDialog
            title={title}
            form={props.form}
            onSave={props.onSave}
            data={row.original as DefaultValues<T>}
          >
            <Button variant={"ghost"} size={"sm"}>
              <EditIcon className="size-4 mr-2" />
              Edit
            </Button>
          </FormDialog>
          <Button
            onClick={() => props.onDelete(row.original)}
            variant={"ghost"}
            size={"sm"}
          >
            <TrashIcon className="size-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="rounded-md overflow-clip">
      <CardHeader className="flex flex-row space-y-0 items-center justify-between py-2  px-4 bg-card">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <FormDialog title={title} form={props.form} onSave={props.onSave}>
          <Button className="rounded-sm" variant={"button-primary"} size={"sm"}>
            <PlusCircleIcon className="mr-2 size-4" />
            Add new
          </Button>
        </FormDialog>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <Table>
          <TableBody className=" leading-6 text-zinc-400">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      className={cn("px-4 py-1", index === 0 && "w-10")}
                      style={{ width: `${cell.column.getSize()}` }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 px-4 py-1 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
