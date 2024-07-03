"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function UploadServiceablePostalCodePage() {
  const uploadServiceableForm = useForm()

  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title="Upload Serviceable Postal Code" />
      <div className="rounded-md border p-4">
        <Form {...uploadServiceableForm}>
          <form className="flex flex-col gap-4 md:flex-row">
            <div className="flex gap-2">
              <Button
                className="bg-button-primary text-white hover:bg-button-primary/80 hover:text-white"
                type="button"
              >
                Upload CSV
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  )
}
