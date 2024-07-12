import { PropsWithChildren, useState } from "react"
import { Trigger as PrimitiveTrigger } from "@radix-ui/react-accordion"
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  EditIcon,
  Loader,
  PlusCircleIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react"
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import InputSwitch, { InputSwitchProps } from "@/components/form/InputSwitch"

type CrudTableProps<T extends FieldValues> = {
  title: string
  data: T[]
  id?: string
  isLoading?: boolean
  columns: ColumnDef<T>[]
  form: InputSwitchProps<T>[]
  onSave: (data: T) => void
  onDelete: (data: T) => void
  hideAddForm?: boolean
}

const FormDialog = <T extends FieldValues>(
  props: PropsWithChildren & {
    form: CrudTableProps<T>["form"]
    onSave: CrudTableProps<T>["onSave"]
    data?: DefaultValues<T>
    title: string
  }
) => {
  const [open, setOpen] = useState(false)
  const form = useForm<T>({
    defaultValues: props.data,
  })

  const onSubmit = (data: T) => {
    props.onSave(data)
    setOpen(false)
    form.reset()
  }

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
                <InputSwitch<T> key={formField.name} {...formField} />
              ))}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  form.reset()
                  setOpen(false)
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
  )
}

const FormDropdown = <T extends FieldValues>(
  props: PropsWithChildren & {
    form: CrudTableProps<T>["form"]
    onSave: CrudTableProps<T>["onSave"]
    data?: DefaultValues<T>
  }
) => {
  const [value, setValue] = useState("")
  const form = useForm<T>({
    defaultValues: props.data,
  })

  const onSubmit = (data: T) => {
    props.onSave(data)
    setValue("")
    form.reset()
  }

  return (
    <Accordion value={value} onValueChange={setValue} collapsible type="single">
      <AccordionItem value="item" className="space-y-4 border-b-0">
        <div className="flex w-full flex-row justify-end">
          <PrimitiveTrigger asChild>
            <Button variant={"button-primary"} style={{ fontSize: "0.875rem" }}>
              Add new
            </Button>
          </PrimitiveTrigger>
        </div>
        <AccordionContent className="border-none p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <Card className="flex flex-row items-center justify-start gap-3 rounded-md p-4 shadow-md">
                {props.form.map((formField) => (
                  <InputSwitch
                    key={formField.name}
                    {...formField}
                    label={undefined}
                    placeholder={formField.label}
                  />
                ))}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    className="rounded-sm"
                    variant="secondary"
                    onClick={() => setValue("")}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="rounded-sm"
                    variant={"button-primary"}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Card>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function CrudTable<T extends FieldValues>(
  props: CrudTableProps<T>
) {
  const { data, title } = props

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
      enableSorting: false,
      header: " ",
      cell: ({ row }) => (
        <div className="flex w-full flex-row items-center justify-end">
          <FormDialog
            title={title}
            form={props.form}
            onSave={props.onSave}
            data={row.original as DefaultValues<T>}
          >
            <Button variant={"ghost"} size={"sm"}>
              <EditIcon className="mr-2 size-4" />
              Edit
            </Button>
          </FormDialog>
          <Button
            onClick={() => props.onDelete(row.original)}
            variant={"ghost"}
            size={"sm"}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Check if any columns passed from props have explicitly defined headers
  const hasExplicitHeaders = props.columns.some((column) => column.header)

  return (
    <section id={props.id} className="space-y-4">
      {!props.hideAddForm && (
        <FormDropdown form={props.form} onSave={props.onSave} />
      )}
      <Card className="overflow-clip rounded-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-card px-4 py-2">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </CardHeader>

        <Separator />
        <CardContent className="p-0">
          {props.isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader className="h-6 w-6 animate-spin text-zinc-600" />
            </div>
          ) : (
            <Table>
              {hasExplicitHeaders && (
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            className={cn(
                              "min-w-10 whitespace-nowrap text-white"
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder ? null : (
                              <div className="flex cursor-pointer items-center justify-between gap-1">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: <TriangleUpIcon />,
                                  desc: <TriangleDownIcon />,
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
              )}
              <TableBody className="leading-6 text-zinc-400">
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
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export { FormDialog, FormDropdown }
