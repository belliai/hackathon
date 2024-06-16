"use client";

import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function UploadMasterPage() {
  const formFields: TFormTextField[] = [
    {
      name: "uploadType",
      label: "Upload Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "file",
      label: "Browse File",
      type: "file",
      orientation: "horizontal",
    },
    {
      name: "selectFile",
      label: "Select File",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Upload Master"
      hookForm={form}
      formFields={formFields}
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Upload</Button>
          <Button variant="button-primary">List</Button>
          <Button variant="button-primary">Download</Button>
        </div>
      }
    />
  );
}
