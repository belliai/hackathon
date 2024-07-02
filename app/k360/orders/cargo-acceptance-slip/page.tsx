"use client";

import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTable } from "@/components/data-table/data-table";
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { RotateCcwIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();
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
                      className="py-0 px-0 overflow-clip file:transition-colors file:h-full file:mr-5 file:py-1 file:px-3 file:text-xs file:font-medium file:bg-muted file:text-foreground hover:file:cursor-pointer hover:file:bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="flex flex-row items-center pt-6 gap-2">
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
  );
}
