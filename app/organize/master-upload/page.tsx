"use client";

import FormTextField from "@/components/form/FormTextField";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";

export default function MasterUploadPage() {
  const masterUploadForm = useForm();

  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title="Master Uploads" />
      <div className="p-4 border rounded-md">
        <Form {...masterUploadForm}>
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex md:max-w-60 w-full">
              <FormTextField
                form={masterUploadForm}
                name="masterUploadType"
                placeholder="Upload Master Type"
                type="select"
                options={[
                  {
                    label: "Option 1",
                    value: "option1",
                  },
                  {
                    label: "Option 2",
                    value: "option2",
                  },
                ]}
              />
            </div>
            <div className="flex md:max-w-60 w-full ">
              <FormTextField
                form={masterUploadForm}
                name="masterUploadFile"
                placeholder="Upload Master File"
                type="file"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-button-primary hover:bg-button-primary/80 text-white hover:text-white"
                type="button"
              >
                Upload
              </Button>
              <Button
                size="icon"
                className="bg-button-secondary hover:bg-button-secondary/80 text-white hover:text-white"
                type="button"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
