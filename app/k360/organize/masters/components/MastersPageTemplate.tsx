"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Download, Plus, RefreshCcw, Search } from "lucide-react"
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { DataTable, DataTableProps } from "@/components/data-table/data-table"
import { DataTableToolbarProps } from "@/components/data-table/data-table-toolbar"
import FormTextField, { TFormTextField } from "@/components/form/FormTextField"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

import CreateFormTemplate from "./CreateFormTemplate"

export type FieldArrayProps = {
  fieldArray: UseFieldArrayReturn<any>
  fields: TFormTextField[]
  fieldArrayName?: string
}

export type SectionedFormFields = {
  sectionName?: string
  fields?: TFormTextField[]
  fieldArray?: FieldArrayProps
  hookForm?: UseFormReturn<any>
  showRemoveButton?: boolean
  additionalColumns?: ColumnDef<any>[]
}

interface MastersPageTemplateProps extends DataTableProps<any, any> {
  heading: string
  buttonText?: string
  hookForm?: UseFormReturn<any>
  filterHookForm: UseFormReturn<any>
  formFields?: TFormTextField[]
  sectionedFormFields?: SectionedFormFields[]
  filterFormFields: TFormTextField[]
  pageActions?: React.ReactNode
  canCreate?: boolean
  customDialogContent?: React.ReactNode
  sectionsType?: "normal" | "tabs"
  customFilterButtons?: React.ReactNode
  customComponent?: React.ReactNode
  bottomCustomComponent?: React.ReactNode
  extraTableToolbarButtons?: DataTableToolbarProps<any>["extraButtons"]
  onSave?: () => void
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>
  openForm?: boolean
  activeData?: any
}

export default function MastersPageTemplate({
  heading,
  buttonText = "Create " + heading,
  hookForm,
  filterHookForm,
  formFields,
  sectionedFormFields,
  filterFormFields,
  columns,
  data,
  pageActions,
  canCreate = true,
  customDialogContent,
  sectionsType,
  customFilterButtons,
  customComponent,
  bottomCustomComponent,
  extraTableToolbarButtons,
  onRowClick,
  onSave,
  setOpenForm,
  openForm,
  activeData,
}: MastersPageTemplateProps) {
  return (
    <PageContainer className="gap-6">
      <PageHeader
        title={heading}
        actions={
          <>
            {pageActions}
            {canCreate && hookForm && (
              <Dialog open={openForm} onOpenChange={setOpenForm}>
                <DialogTrigger asChild>
                  <Button className="bg-button-primary text-white hover:bg-button-primary/80">
                    <Plus size={16} className="mr-2" />
                    <span className="hidden md:block">{buttonText}</span>
                    <span className="block md:hidden">Create</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-3xl">
                  <DialogTitle>
                    {activeData ? "Update" : "Create"} {heading}
                  </DialogTitle>
                  <DialogTitle>
                    {activeData ? "Update" : "Create"} {heading}
                  </DialogTitle>
                  <CreateFormTemplate
                    hookForm={hookForm}
                    formFields={formFields}
                    sectionedFormFields={sectionedFormFields}
                    customDialogContent={customDialogContent}
                    sectionsType={sectionsType}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        onSave && onSave()
                      }}
                      className="bg-button-primary text-white hover:bg-button-primary/80"
                    >
                      {activeData ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        }
      />
      <div className="rounded-md border p-4">
        <Form {...filterHookForm}>
          <form
            className={cn("grid w-full items-end gap-4 sm:grid-cols-2", {
              "md:grid-cols-5": filterFormFields.length > 2,
              "flex flex-col md:flex-row": filterFormFields.length <= 2,
            })}
          >
            {filterFormFields.map((field) => {
              return (
                <div key={field.name} className="w-full md:max-w-72">
                  <FormTextField {...field} form={filterHookForm} />
                </div>
              )
            })}
            {customFilterButtons ? (
              customFilterButtons
            ) : (
              <div className="flex gap-2">
                <Button
                  size="icon"
                  type="button"
                  className="bg-button-primary text-white hover:bg-button-primary/80"
                >
                  <Search size={16} />
                </Button>
                <Button
                  size="icon"
                  type="button"
                  className="bg-button-primary text-white hover:bg-button-primary/80"
                >
                  <RefreshCcw size={16} />
                </Button>
                <Button
                  size="icon"
                  type="button"
                  className="bg-button-secondary text-white hover:bg-button-secondary/80"
                >
                  <Download size={16} />
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
      {customComponent}
      <DataTable
        columns={columns}
        onRowClick={onRowClick}
        data={data}
        extraToolbarButtons={extraTableToolbarButtons}
      />
      {bottomCustomComponent}
    </PageContainer>
  )
}
