"use client";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, Search, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type FilterDataType = { partner_code: string; awb: string };

type DataType = {
  document_name: string;
  uploaded: boolean;
  file_uploaded: string;
};

export default function Page() {
  const filterForm = useForm<FilterDataType>();

  const newDocumentForm = useForm<{ document_name: string }>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<{ documents: DataType[] }>({
    defaultValues: {
      documents: [
        {
          document_name: "Print Load Plan",
          file_uploaded: "-",
        },
        {
          document_name: "AWB Copy",
          file_uploaded: "-",
        },
        {
          document_name: "DG Doc",
          file_uploaded: "-",
        },
        {
          document_name: "FlightBildPlanReport",
          file_uploaded: "-",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  return (
    <PageContainer className="gap-6">
      <PageHeader title="ePouch" />
      <Card className="p-4 rounded-md transition-all">
        <Form {...filterForm}>
          <form className="flex flex-row gap-3">
            <FormField
              control={filterForm.control}
              name={"partner_code"}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Partner Code
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-32">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"774"}>{"774"}</SelectItem>
                      <SelectItem value={"732"}>{"732"}</SelectItem>
                      <SelectItem value={"6E"}>{"6E"}</SelectItem>
                      <SelectItem value={"7D"}>{"7D"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={filterForm.control}
              name={"awb"}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    AWB Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      rightIcon={
                        <SearchIcon className="size-4 text-muted-foreground" />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="inline-flex gap-3 mt-7">
              <Button
                size="icon"
                type="button"
                className="bg-button-primary  text-white hover:bg-button-primary/80 size-9"
              >
                <Search size={16} />
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    type="button"
                    className="bg-button-secondary  text-white hover:bg-button-secondary/80 size-9"
                  >
                    <PlusIcon size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Form {...newDocumentForm}>
                    <form
                      className="space-y-4"
                      onSubmit={newDocumentForm.handleSubmit(
                        ({ document_name }) => {
                          append({
                            document_name,
                            file_uploaded: "-",
                            uploaded: false,
                          });
                          setDialogOpen(false);
                        }
                      )}
                    >
                      <DialogHeader>
                        <DialogTitle>Document Type</DialogTitle>
                      </DialogHeader>
                      <div>
                        <FormField
                          control={newDocumentForm.control}
                          name={"document_name"}
                          render={({ field }) => (
                            <FormItem className="space-y-1 min-w-16">
                              <FormLabel>Document Type</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => setDialogOpen(false)}
                          type="button"
                          variant={"secondary"}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant={"button-primary"}>
                          Save
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </Card>
      <Form {...form}>
        <RadioGroup>
          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap px-4"></TableHead>
                  <TableHead className="whitespace-nowrap px-4">
                    Document Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4">
                    Uploaded
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4">
                    File Uploaded
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4">
                    Choose File
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow className="hover:bg-background" key={field.id}>
                    <TableCell className="whitespace-nowrap px-4 ">
                      <RadioGroupItem value={field.id} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 ">
                      {field.document_name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 ">
                      {field.uploaded ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 ">
                      {field.file_uploaded}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 ">
                      <Input
                        type="file"
                        {...field}
                        className="py-0 px-0 h-8 overflow-clip file:transition-colors file:h-full file:mr-5 file:py-1 file:px-3 file:text-xs file:font-medium file:bg-muted file:text-foreground hover:file:cursor-pointer hover:file:bg-muted/50"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 ">
                      <div className="inline-flex gap-2">
                        <Button size={"sm"} variant={"button-secondary"}>
                          Save
                        </Button>
                        <Button size={"sm"} variant={"destructive"}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </RadioGroup>
      </Form>
    </PageContainer>
  );
}
