"use client"

import { ColumnDef } from "@tanstack/react-table"
import { RotateCcwIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table/data-table"
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead"
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function Page() {
  const form = useForm()
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Upload Cargo Acceptance Slip" />
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="awb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AWB Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <Form {...form}>
            <FormField
              control={form.control}
              name="doc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      className="overflow-clip px-0 py-0 file:mr-5 file:h-full file:bg-muted file:px-3 file:py-1 file:text-xs file:font-medium file:text-foreground file:transition-colors hover:file:cursor-pointer hover:file:bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="flex flex-row items-center gap-2 pt-6">
            <Button variant={"button-primary"} className="flex-grow">
              Submit
            </Button>
            <Button variant={"button-secondary"}>
              <RotateCcwIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  )
}
