"use client"

import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { PlusCircle, SaveIcon, ShieldCheck, ShieldX } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/data-table/data-table"
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead"
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow"
import InputSwitch from "@/components/form/InputSwitch"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

interface MSDSApplication {
  applicationRefNo?: string
  pointOfOrigin?: string
  pointOfDestination: string
  routeDetails?: string
  commodityDescription: string
  carriers?: string
  totalWeight: string
  totalPieces: string
  dimension?: string
  applicationSubmittedDate: string
  agentCode?: string
  applicantFullName: string
  applicantPhone?: string
  applicantMobile: string
  applicantEmail: string
  applicantFax?: string
  applicantAddress?: string
  unNumber: string
  dgClassDiv: string
  formOfChemical: string
  remark?: string
  agentName: string
  materialSafetyDataSheet: boolean
  imageOfPackage: boolean
  productListOrInvoice: boolean
  dateApproved: string
  dateExpiry?: string
  approvalPeriodDays?: number
  applicationApprovedOrRejectDate: string
  applicationStatus: string
  approvedOrRejectedBy: string
  disclaimer?: string
  requirements?: string
}

const columns: ColumnDef<Partial<MSDSApplication>>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pointOfOrigin",
    header: "Point of Origin",
  },
  {
    accessorKey: "pointOfDestination",
    header: "Point of Destination",
  },
  {
    accessorKey: "agentCode",
    header: "Agent Code",
  },
  {
    accessorKey: "applicationRefNo",
    header: "Application Ref No",
  },
  {
    accessorKey: "totalWeight",
    header: "Total Weight",
  },
  {
    accessorKey: "applicantFullName",
    header: "Applicant Name",
  },
  {
    accessorKey: "applicationSubmittedDate",
    header: "Application Submitted Date",
    meta: { isDateFilter: true },
  },
  {
    accessorKey: "applicationStatus",
    header: "Status",
    meta: {
      filterSelectOptions: [
        { value: "All", label: "All" },
        { value: "new", label: "New" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
]

const data: Partial<MSDSApplication>[] = [
  {
    pointOfOrigin: "JFK",
    pointOfDestination: "LAX",
    agentCode: "AG123",
    applicationRefNo: "807",
    totalWeight: "1000kg",
    applicationSubmittedDate: "2024-05-20",
    applicationStatus: "New",
    applicantFullName: "John Doe",
    applicantMobile: "1234567890",
    applicantEmail: "john.doe@example.com",
    unNumber: "UN1234",
    dgClassDiv: "Class 3",
    formOfChemical: "Liquid",
    agentName: "Agent Smith",
    materialSafetyDataSheet: true,
    imageOfPackage: false,
    productListOrInvoice: true,
    dateApproved: "2024-06-01",
    applicationApprovedOrRejectDate: "2024-05-25",
    approvedOrRejectedBy: "Manager",
  },
  {
    pointOfOrigin: "LHR",
    pointOfDestination: "JFK",
    agentCode: "AG456",
    applicationRefNo: "808",
    totalWeight: "2000kg",
    applicationSubmittedDate: "2024-05-21",
    applicationStatus: "Approved",
    applicantFullName: "Jane Smith",
    applicantMobile: "0987654321",
    applicantEmail: "jane.smith@example.com",
    unNumber: "UN5678",
    dgClassDiv: "Class 2",
    formOfChemical: "Gas",
    agentName: "Agent Brown",
    materialSafetyDataSheet: true,
    imageOfPackage: true,
    productListOrInvoice: true,
    dateApproved: "2024-06-02",
    applicationApprovedOrRejectDate: "2024-05-26",
    approvedOrRejectedBy: "Supervisor",
  },
  {
    pointOfOrigin: "ATL",
    pointOfDestination: "ORD",
    agentCode: "AG789",
    applicationRefNo: "809",
    totalWeight: "1500kg",
    applicationSubmittedDate: "2024-05-22",
    applicationStatus: "Rejected",
    applicantFullName: "Alice Johnson",
    applicantMobile: "1122334455",
    applicantEmail: "alice.johnson@example.com",
    unNumber: "UN9101",
    dgClassDiv: "Class 8",
    formOfChemical: "Solid",
    agentName: "Agent White",
    materialSafetyDataSheet: false,
    imageOfPackage: true,
    productListOrInvoice: false,
    dateApproved: "2024-06-03",
    applicationApprovedOrRejectDate: "2024-05-27",
    approvedOrRejectedBy: "Admin",
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  return (
    <PageContainer className="gap-4">
      <PageHeader title="MSDS" />
      {/* <DataTableFilterForm form={form} formFilters={formFilters} /> */}
      <DataTable
        extraToolbarButtons={[
          { label: "New", icon: PlusCircle, onClick: () => setOpen(true) },
        ]}
        initialPinning={{
          left: ["select"],
          right: ["action"],
        }}
        columns={columns}
        data={data}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[830px] max-w-3xl gap-0 space-y-0 p-0">
          <DialogHeader className="p-4">
            <DialogTitle>MSDS Application</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="custom-scrollbar h-[85dvh] overflow-y-auto p-4">
            <ApplicationForm />
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

function ApplicationForm() {
  const form = useForm<MSDSApplication>({
    defaultValues: {
      pointOfDestination: "",
      commodityDescription: "",
      totalWeight: "",
      totalPieces: "",
      applicantFullName: "",
      applicantMobile: "",
      applicantEmail: "",
      unNumber: "",
      dgClassDiv: "NONDG",
      formOfChemical: "",
      agentName: "Test",
      materialSafetyDataSheet: false,
      imageOfPackage: false,
      productListOrInvoice: false,
      applicationStatus: "In-Progress",
      approvedOrRejectedBy: "johnny",
    },
  })

  return (
    <Form {...form}>
      <form action="" className="space-y-4">
        <div className="space-y-2">
          <span className="font-semibold">MSDS Details</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InputSwitch<MSDSApplication>
              name="pointOfOrigin"
              label="Point of Origin"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="pointOfDestination"
              label="Point of Destination"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="routeDetails"
              label="Route Details"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="commodityDescription"
              label="Commodity Description"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="carriers"
              label="Carriers"
              type="text"
              withDialog
            />
            <InputSwitch<MSDSApplication>
              name="totalWeight"
              label="Total Weight"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="totalPieces"
              label="Total Pieces"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="dimension"
              label="Dimension"
              type="text"
              readOnly
              disabled
              withDialog
            />
            <InputSwitch<MSDSApplication>
              name="applicationSubmittedDate"
              label="Application Submitted Date"
              type="date"
            />
            <InputSwitch<MSDSApplication>
              name="agentCode"
              label="Agent Code"
              type="text"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold">Additional Details</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InputSwitch<MSDSApplication>
              name="unNumber"
              label="UN Number"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="dgClassDiv"
              label="DG Class/Div"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="formOfChemical"
              label="Form of Chemical"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="remark"
              label="Remark"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="agentName"
              label="Agent Name"
              type="text"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold">Applicant Details</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InputSwitch<MSDSApplication>
              name="applicantFullName"
              label="Applicant Full Name"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicantPhone"
              label="Applicant Phone"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicantMobile"
              label="Applicant Mobile"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicantEmail"
              label="Applicant e-mail"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicantFax"
              label="Applicant Fax"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicantAddress"
              label="Applicant Address"
              type="text"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold">Mandatory Document Check List</span>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2">
            <InputSwitch<MSDSApplication>
              name="materialSafetyDataSheet"
              label="Material Safety Data Sheet"
              type="checkbox"
            />
            <InputSwitch<MSDSApplication>
              name="imageOfPackage"
              label="Image of Package"
              type="checkbox"
            />
            <InputSwitch<MSDSApplication>
              name="productListOrInvoice"
              label="Product list or invoice"
              type="checkbox"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold">MSDS Approval</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InputSwitch<MSDSApplication>
              name="dateApproved"
              label="Date Approved"
              type="date"
            />
            <InputSwitch<MSDSApplication>
              name="dateExpiry"
              label="Date Expiry"
              type="date"
            />
            <InputSwitch<MSDSApplication>
              name="approvalPeriodDays"
              label="Approval Period (Days)"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="applicationApprovedOrRejectDate"
              label="Application Approved or Reject Date"
              type="date"
            />
            <InputSwitch<MSDSApplication>
              name="applicationStatus"
              label="Application Status"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="approvedOrRejectedBy"
              label="Approved or Rejected By"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="disclaimer"
              label="Disclaimer"
              type="text"
            />
            <InputSwitch<MSDSApplication>
              name="requirements"
              label="Requirements"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 pt-4">
          <Button type="button" variant={"secondary"}>
            Approve
          </Button>
          <Button type="button" variant={"secondary"}>
            Reject
          </Button>
          <Button type="button" variant={"secondary"}>
            Reopen
          </Button>
          <Separator orientation="vertical" />
          <Button type="button" variant={"button-secondary"}>
            ePouch
          </Button>
          <Button type="button" variant={"button-secondary"}>
            Clear
          </Button>
          <Button type="submit" variant={"button-primary"}>
            <SaveIcon className="mr-2 size-4" />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
