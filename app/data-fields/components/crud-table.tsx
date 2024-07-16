import { PropsWithChildren, useState } from "react"
import { Trigger as PrimitiveTrigger } from "@radix-ui/react-accordion"
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
  PlusIcon,
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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import InputSwitch, { InputSwitchProps } from "@/components/form/InputSwitch"
import { DataTable } from "@/components/data-table/data-table"

type CrudTableProps<T extends FieldValues> = {
  title: string
  data: T[]
  id?: string
  isLoading?: boolean
  columns: ColumnDef<T>[]
  form: InputSwitchProps<T>[]
  onSave: (data: T) => void
  onDelete: (data: T) => void
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
            <Button variant={"button-primary"} style={{ fontSize: '0.875rem' }}>Add New</Button>
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
    ...props.columns,
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex w-full flex-row items-center gap-3">
          <FormDialog
            title={title}
            form={props.form}
            onSave={props.onSave}
            data={row.original as DefaultValues<T>}
          >
            <Button variant={"ghost"} size={"fit"}>
              <EditIcon className="mr-2 size-4" />
              Edit
            </Button>
          </FormDialog>
          <Button
            onClick={() => props.onDelete(row.original)}
            variant={"ghost"}
            size={"fit"}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <section id={props.id} className="space-y-4">
      {props.isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : (
        <DataTable
          showToolbarOnlyOnHover={true}
          columns={columns}
          data={data}
          extraRightComponents={<FormDialog
            title={title}
            form={props.form}
            onSave={props.onSave}
          >
            <Button variant="button-primary" size="sm">
              <PlusIcon className="size-4" />
              Add New
            </Button>
          </FormDialog>}
          className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
        />
      )}
    </section>
  )
}
