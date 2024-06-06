"use client";

import { Separator } from "@/components/ui/separator";
import { SectionedFormFields } from "./MastersPageTemplate";
import MastersPageForm from "./MastersPageForm";
import MastersPageFieldArrayForm from "./MastersPageFieldArrayForm";

export default function SectionedForm({
  sectionName,
  fields,
  hookForm,
  fieldArray,
}: SectionedFormFields) {
  return (
    <div key={fields?.[0].name} className="flex flex-col gap-4">
      {/* For normal form fields  */}
      {sectionName && (
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="font-semibold text-white">{sectionName}</h2>
          <Separator />
        </div>
      )}
      {fields && <MastersPageForm hookForm={hookForm!} formFields={fields} />}

      {/* For many to one relationnships */}
      {fieldArray && (
        <MastersPageFieldArrayForm
          fieldArrayProps={fieldArray}
          hookForm={hookForm!}
        />
      )}
    </div>
  );
}
