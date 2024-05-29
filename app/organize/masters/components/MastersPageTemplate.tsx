"use client";

import { DataTable } from "@/components/data-table/data-table";
import FormTextField, { TFormTextField } from "@/components/form/FormTextField";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Search } from "lucide-react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import MastersPageForm from "./MastersPageForm";
import { Separator } from "@/components/ui/separator";
import MastersPageFieldArrayForm from "./MastersPageFieldArrayForm";
import { cn } from "@/lib/utils";

export type FieldArrayProps = {
  fieldArray: UseFieldArrayReturn<any>;
  fields: TFormTextField[];
  fieldArrayName?: string;
};

export type SectionedFormFields = {
  sectionName?: string;
  fields?: TFormTextField[];
  fieldArray?: FieldArrayProps;
};

interface MastersPageTemplateProps {
  heading: string;
  buttonText?: string;
  hookForm?: UseFormReturn<any>;
  filterHookForm: UseFormReturn<any>;
  formFields?: TFormTextField[];
  sectionedFormFields?: SectionedFormFields[];
  filterFormFields: TFormTextField[];
  columns: ColumnDef<any>[];
  data: any[];
  pageActions?: React.ReactNode;
  canCreate?: boolean;
  customDialogContent?: React.ReactNode;
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
}: MastersPageTemplateProps) {
  return (
    <PageContainer className="gap-6">
      <PageHeader
        title={heading}
        actions={
          <>
            {pageActions}
            {canCreate && hookForm && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                    <Plus size={16} className="mr-2" />
                    <span className="hidden md:block">{buttonText}</span>
                    <span className="block md:hidden">Create</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-3xl">
                  <DialogTitle>{buttonText}</DialogTitle>
                  <div className="max-h-[75dvh] overflow-auto pr-2">
                    {sectionedFormFields ? (
                      sectionedFormFields.map((section, index) => {
                        return (
                          <div className="pt-4" key={index}>
                            {/* For normal form fields  */}
                            {section.sectionName && (
                              <div className="flex flex-col gap-2 py-2 pb-4">
                                <h2 className="font-semibold text-white">
                                  {section.sectionName}
                                </h2>
                                <Separator />
                              </div>
                            )}
                            {section.fields && (
                              <MastersPageForm
                                hookForm={hookForm}
                                formFields={section.fields}
                              />
                            )}

                            {/* For many to one relationnships */}
                            {section.fieldArray && (
                              <MastersPageFieldArrayForm
                                fieldArrayProps={section.fieldArray}
                                hookForm={hookForm}
                              />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <MastersPageForm
                        hookForm={hookForm}
                        formFields={formFields}
                      />
                    )}
                    {customDialogContent && customDialogContent}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
                        Create
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        }
      />
      <div className="p-4 border rounded-md">
        <Form {...filterHookForm}>
          <form
            className={cn("grid sm:grid-cols-2 gap-4 items-end w-full", {
              "md:grid-cols-5": filterFormFields.length > 2,
              "md:grid-cols-2": filterFormFields.length <= 2,
            })}
          >
            {filterFormFields.map((field) => {
              return (
                <div key={field.name} className="md:max-w-72 w-full">
                  <FormTextField {...field} form={filterHookForm} />
                </div>
              );
            })}
            <div className="flex gap-2">
              <Button
                size="icon"
                type="button"
                className="bg-button-primary  text-white hover:bg-button-primary/80"
              >
                <Search size={16} />
              </Button>
              <Button
                size="icon"
                type="button"
                className="bg-button-secondary  text-white hover:bg-button-secondary/80"
              >
                <Download size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <DataTable columns={columns} data={data} hideToolbar />
    </PageContainer>
  );
}
