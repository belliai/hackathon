"use client"

import { RefreshCw } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormTextField from "@/components/form/FormTextField"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function DBChangesPage() {
  const dbChangeForm = useForm()

  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title="DB Changes" />
      <div className="rounded-md border p-4">
        <Form {...dbChangeForm}>
          <form className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-full md:max-w-60">
              <FormTextField
                form={dbChangeForm}
                name="awbNumber"
                placeholder="AWB Number"
                type="text"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-button-primary text-white hover:bg-button-primary/80 hover:text-white"
                type="button"
              >
                Upload
              </Button>
              <Button
                size="icon"
                className="bg-button-secondary text-white hover:bg-button-secondary/80 hover:text-white"
                type="button"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  )
}
