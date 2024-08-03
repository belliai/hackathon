import { PropsWithChildren, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
  UseFormReturn,
} from "react-hook-form"
import { ZodSchema } from "zod"

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
import { DataTable } from "@/components/data-table/data-table"
import InputSwitch, { InputSwitchProps } from "@/components/form/InputSwitch"

import { SearchDataField } from "./SearchDataField"

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
  hideCardHeader?: boolean
  searchOptions?: any
  canSearch?: boolean
  validationSchema?: ZodSchema<T>
  tabComponent?: React.ReactNode
}

const FormDialog = <T extends FieldValues>(
  props: PropsWithChildren & {
    form: CrudTableProps<T>["form"]
    onSave: CrudTableProps<T>["onSave"]
    data?: DefaultValues<T>
    title: string
    open: boolean
    setOpen: (open: boolean) => void
    onDelete?: (data: T) => void
    validationSchema?: CrudTableProps<T>["validationSchema"]
    isNew?: boolean
  }
) => {
  const form = useForm<T>({
    defaultValues: props.data,
    resolver: props.validationSchema
      ? zodResolver(props.validationSchema)
      : undefined,
  })

  const onSubmit = (data: T) => {
    props.onSave(data)
    props.setOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (props.data) {
      form.reset(props.data)
    }
  }, [props.data])

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>
                {Boolean(props.data) && !props.isNew
                  ? `Edit ${props.title}`
                  : `Add ${props.title}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-1">
              {props.form.map((formField) => (
                <InputSwitch<T> key={formField.name} {...formField} />
              ))}
            </div>
            {props.onDelete && props.data && (
              <Button
                onClick={() => props.onDelete?.(props.data as T)}
                variant={"ghost"}
                size={"fit"}
                type="button"
                className="mt-4"
              >
                <TrashIcon className="mr-2 size-4" />
                Delete
              </Button>
            )}
            <DialogFooter>
              <Button
                onClick={() => {
                  form.reset()
                  props.setOpen(false)
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

interface FormDropdownProps<T extends FieldValues> {
  form: InputSwitchProps<T>[]
  onSave: CrudTableProps<T>["onSave"]
  data?: DefaultValues<T>
  className?: string
  validationSchema?: CrudTableProps<T>["validationSchema"]
  fieldsDirection?: "horizontal" | "vertical"
  buttonText?: string
  buttonVariant?: "button-primary" | "secondary"
}

const FormDropdown = <T extends FieldValues, K extends FieldValues>(
  props: FormDropdownProps<T> & {
    secondFormProps?: FormDropdownProps<K>
  }
) => {
  const [value, setValue] = useState("")
  const [openContent, setOpenContent] = useState("")

  const form = useForm<T>({
    defaultValues: props.data,
    resolver: props.validationSchema
      ? zodResolver(props.validationSchema)
      : undefined,
  })

  const secondForm = useForm<K>({
    defaultValues: props.secondFormProps?.data,
    resolver: props.secondFormProps?.validationSchema
      ? zodResolver(props.secondFormProps?.validationSchema)
      : undefined,
  })

  const onSubmit = (data: T) => {
    props.onSave(data)
    setValue("")
    form.reset()
  }

  const secondOnSubmit = (data: K) => {
    props?.secondFormProps?.onSave(data)
    setValue("")
    secondForm.reset()
  }

  return (
    <Accordion value={value} onValueChange={setValue} collapsible type="single">
      <AccordionItem value="item" className="space-y-4 border-b-0">
        <div className="flex w-full flex-row justify-end gap-2">
          {props.secondFormProps && (
            <PrimitiveTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="data-[state=open]:pointer-events-none data-[state=open]:opacity-50"
                onClick={() => setOpenContent("secondary")}
              >
                {props.secondFormProps.buttonText || "Add"}
              </Button>
            </PrimitiveTrigger>
          )}
          <PrimitiveTrigger asChild>
            <Button
              variant={props.buttonVariant || "button-primary"}
              size="sm"
              className="data-[state=open]:pointer-events-none data-[state=open]:opacity-50"
              onClick={() => setOpenContent("primary")}
            >
              {props.buttonText || "Add New"}
            </Button>
          </PrimitiveTrigger>
        </div>
        <AccordionContent className="border-none p-0">
          {openContent === "secondary" ? (
            props.secondFormProps && (
              <FormDropdownContent
                {...props.secondFormProps}
                // The props below shouldn't be passed since they are already defined in the secondFormProps
                // So it's redundant. I didn't want to deal with adjusting the types. Sorry
                hookForm={secondForm}
                onSubmit={secondOnSubmit}
                value={value}
                setValue={setValue}
              />
            )
          ) : (
            <FormDropdownContent
              {...props}
              hookForm={form}
              onSubmit={onSubmit}
              value={value}
              setValue={setValue}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function FormDropdownContent<T extends FieldValues>(props: {
  form: InputSwitchProps<T>[]
  onSave: CrudTableProps<T>["onSave"]
  data?: DefaultValues<T>
  value: string
  setValue: (value: string) => void
  hookForm: UseFormReturn<T>
  onSubmit: (data: T) => void
  className?: string
  fieldsDirection?: FormDropdownProps<T>["fieldsDirection"]
}) {
  return (
    <Form {...props.hookForm}>
      <form
        onSubmit={props.hookForm.handleSubmit(props.onSubmit)}
        className="space-y-3"
      >
        <Card
          className={cn(
            "flex flex-row items-center justify-start gap-4 rounded-md bg-zinc-900/50 p-4 px-3 py-1.5 shadow-md",
            props.className
          )}
        >
          <div
            className={cn("flex w-full items-center gap-3", {
              "flex-col items-start [&>div]:w-full":
                props.fieldsDirection === "vertical",
            })}
          >
            {props.form.map((formField) => (
              <InputSwitch
                className={cn("flex h-9 w-full", {
                  "max-w-none": props.fieldsDirection === "vertical",
                })}
                key={formField.name}
                {...formField}
                label={undefined}
                placeholder={formField.label}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="rounded-sm"
              variant="secondary"
              onClick={() => props.setValue("")}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              className="rounded-sm"
              variant={"button-primary"}
              type="submit"
              size="sm"
            >
              Save
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}

export default function CrudTable<T extends FieldValues>(
  props: CrudTableProps<T>
) {
  const [openForm, setOpenForm] = useState<T | boolean>(false)

  const {
    data,
    title,
    searchOptions,
    canSearch = false,
    validationSchema,
    tabComponent,
    ...tableProps
  } = props

  const columns: ColumnDef<T>[] = props.columns

  function handleRowClick(row: T) {
    setOpenForm(row)
  }

  function handleDelete(row: T) {
    props.onDelete(row)
    setOpenForm(false)
  }

  // Check if any columns passed from props have explicitly defined headers
  const hasExplicitHeaders = props.columns.some((column) => column.header)

  const handleSearch = (id: string) => {
    setOpenForm(data.find((item) => item.id === id) || false)
  }

  return (
    <section id={props.id} className="space-y-4">
      {props.isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : (
        <>
          <DataTable
            hidePagination={true}
            pageCount={1}
            pageSize={20}
            showToolbarOnlyOnHover={true}
            {...tableProps}
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            extraRightComponents={
              !props.hideAddForm && (
                <FormDialog
                  title={title}
                  form={props.form}
                  onSave={props.onSave}
                  open={openForm === true}
                  setOpen={(open) => setOpenForm(open)}
                  validationSchema={validationSchema}
                >
                  <Button variant="button-primary" size="sm">
                    <PlusIcon className="size-4" />
                    Add New
                  </Button>
                </FormDialog>
              )
            }
            extraLeftComponents={
              tabComponent && canSearch ? (
                <>
                  <SearchDataField
                    selectOptions={searchOptions}
                    label={`Search ${title}`}
                    onChangeValue={handleSearch}
                  />
                  {tabComponent}
                </>
              ) : tabComponent && !canSearch ? tabComponent : (
                canSearch && (
                  <SearchDataField
                    selectOptions={searchOptions}
                    label={`Search ${title}`}
                    onChangeValue={handleSearch}
                  />
                )
              )
            }
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
          />
          <FormDialog
            title={title}
            form={props.form}
            onSave={props.onSave}
            onDelete={handleDelete}
            open={typeof openForm !== "boolean"}
            data={openForm as DefaultValues<T>}
            setOpen={(open) => setOpenForm(open ? openForm : false)}
            validationSchema={validationSchema}
          >
            <></>
          </FormDialog>
        </>
      )}
    </section>
  )
}

export { FormDialog, FormDropdown }
