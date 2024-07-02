"use client";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function UploadServiceablePostalCodePage() {
  const uploadServiceableForm = useForm();

  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title="Upload Serviceable Postal Code" />
      <div className="p-4 border rounded-md">
        <Form {...uploadServiceableForm}>
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <Button
                className="bg-button-primary hover:bg-button-primary/80 text-white hover:text-white"
                type="button"
              >
                Upload CSV
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
