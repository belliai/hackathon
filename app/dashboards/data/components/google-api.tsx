"use client"

import { DotsVerticalIcon } from "@radix-ui/react-icons"
import {
  CloudDownloadIcon,
  CloudUploadIcon,
  FileSpreadsheetIcon,
  Trash2Icon,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { string } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form } from "@/components/ui/form"
import InputSwitch from "@/components/form/InputSwitch"

type GoogleApi = {
  sheets: {
    name: string
    autoSync: boolean
    dateRange?: { from: string; to: string }
    rangeStart: string
    rangeEnd: string
    spreadsheetKey: string
    sheetId: string
  }[]
}

const initialSheetData: GoogleApi["sheets"][0] = {
  name: "Flight Data Sheet",
  dateRange: {
    from: "2024-09-05T16:00:00.000Z",
    to: "2024-09-08T16:00:00.000Z",
  },
  autoSync: false,
  rangeStart: "A",
  rangeEnd: "G",
  spreadsheetKey: "YjsuWUhejq90123jdsaASswfasad",
  sheetId: "558823232",
}

const blankSheetData: GoogleApi["sheets"][0] = {
  name: "",
  dateRange: undefined,
  autoSync: false,
  rangeStart: "",
  rangeEnd: "",
  spreadsheetKey: "",
  sheetId: "",
}

export default function GoogleAPI() {
  const form = useForm<GoogleApi>({
    defaultValues: { sheets: [initialSheetData] },
  })
  const fieldArray = useFieldArray({ control: form.control, name: "sheets" })

  const columnOptions = generateAlphabetOptions()

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-row items-end justify-between">
          <span className="text-xl font-semibold">Google API Integration</span>
          <Button
            type="button"
            size={"sm"}
            onClick={() => fieldArray.append(blankSheetData)}
          >
            <FileSpreadsheetIcon className="mr-2 size-4" />
            Add new Sheet
          </Button>
        </div>
        <div className="space-y-2">
          {fieldArray.fields.map((field, index) => (
            <Card key={field.id} className="divide-y">
              <CardHeader className="flex flex-row items-end justify-between gap-4 space-y-0">
                <InputSwitch<GoogleApi>
                  className="h-6 border-0 px-0 py-0 text-lg font-semibold focus-visible:ring-0"
                  name={`sheets.${index}.name`}
                  type="text"
                  placeholder="Enter name..."
                />
                <div className="inline-flex items-center gap-2">
                  <div className="mr-2">
                    <InputSwitch<GoogleApi>
                      type="switch"
                      label="Auto Sync"
                      name={`sheets.${index}.autoSync`}
                    />
                  </div>
                  <Button type="button" size={"sm"} className="h-6 rounded-sm">
                    <CloudUploadIcon className="mr-1 size-3" />
                    Push
                  </Button>
                  <Button type="button" size={"sm"} className="h-6 rounded-sm">
                    <CloudDownloadIcon className="mr-1 size-3" />
                    Pull
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size={"icon"}
                        className="h-6 w-6 rounded-sm"
                        variant={"secondary"}
                      >
                        <DotsVerticalIcon className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="h-6 items-center"
                        onClick={() => fieldArray.remove(index)}
                      >
                        <Trash2Icon className="mr-2 size-3" />
                        <span className="text-xs">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid w-full grid-cols-4 gap-2">
                  <InputSwitch<GoogleApi>
                    name={`sheets.${index}.rangeStart`}
                    label="Range Start"
                    type="select"
                    selectOptions={columnOptions}
                  />
                  <InputSwitch<GoogleApi>
                    name={`sheets.${index}.rangeEnd`}
                    label="Range End"
                    type="select"
                    disabled={!form.watch(`sheets.${index}.rangeStart`)}
                    selectOptions={columnOptions.filter(
                      (option) =>
                        option.value >= form.watch(`sheets.${index}.rangeStart`)
                    )}
                  />
                  <div className="col-span-2">
                    <InputSwitch<GoogleApi>
                      type="date"
                      mode="range"
                      label="Date Range"
                      disabledMatcher={(date) => false}
                      name={`sheets.${index}.dateRange`}
                    />
                  </div>
                  <div className="col-span-2">
                    <InputSwitch<GoogleApi>
                      name={`sheets.${index}.spreadsheetKey`}
                      label="Spreadsheet Key"
                      type="text"
                    />
                  </div>
                  <div className="col-span-2">
                    <InputSwitch<GoogleApi>
                      name={`sheets.${index}.sheetId`}
                      label="Sheet ID"
                      type="text"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </form>
    </Form>
  )
}

function generateAlphabetOptions() {
  const options = []
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i)
    options.push({
      value: letter,
      label: letter,
    })
  }
  return options
}
