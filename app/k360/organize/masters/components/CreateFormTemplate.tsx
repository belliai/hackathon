"use client"

import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TFormTextField } from "@/components/form/FormTextField"

import MastersPageForm from "./MastersPageForm"
import { SectionedFormFields } from "./MastersPageTemplate"
import SectionedForm from "./SectionedForm"

export interface CreateFormTemplateProps {
  hookForm: UseFormReturn<any>
  formFields?: TFormTextField[]
  sectionedFormFields?: SectionedFormFields[]
  customDialogContent?: React.ReactNode
  sectionsType?: "normal" | "tabs"
  className?: string
}

export default function CreateFormTemplate({
  hookForm,
  formFields,
  sectionedFormFields,
  customDialogContent,
  sectionsType = "normal",
  className,
}: CreateFormTemplateProps) {
  return (
    <div
      className={cn(
        "max-h-[75dvh] overflow-auto pr-2",
        {
          "h-[75dvh]": sectionsType === "tabs",
        },
        className
      )}
    >
      {sectionedFormFields ? (
        sectionsType === "tabs" ? (
          <Tabs
            defaultValue={sectionedFormFields[0].sectionName}
            className="mt-4"
          >
            <TabsList className="w-auto">
              {sectionedFormFields.map((section, index) => {
                return (
                  <TabsTrigger
                    key={section.sectionName}
                    value={section.sectionName!}
                  >
                    {section.sectionName}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            {sectionedFormFields.map((section, index) => {
              return (
                <TabsContent
                  key={section.sectionName}
                  value={section.sectionName!}
                >
                  <SectionedForm
                    fieldArray={section.fieldArray}
                    fields={section.fields}
                    hookForm={section.hookForm ?? hookForm}
                    sectionName={section.sectionName}
                    showRemoveButton={section.showRemoveButton}
                  />
                </TabsContent>
              )
            })}
          </Tabs>
        ) : (
          sectionedFormFields.map((section, index) => {
            return (
              <div key={index} className="mt-4">
                <SectionedForm
                  fieldArray={section.fieldArray}
                  fields={section.fields}
                  hookForm={section.hookForm ?? hookForm}
                  sectionName={section.sectionName}
                  showRemoveButton={section.showRemoveButton}
                />
              </div>
            )
          })
        )
      ) : (
        <MastersPageForm hookForm={hookForm} formFields={formFields} />
      )}
      {customDialogContent && customDialogContent}
    </div>
  )
}
