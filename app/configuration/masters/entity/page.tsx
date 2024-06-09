"use client";

import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterEntityPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "entityName",
      header: "Entity Name",
    },
    {
      accessorKey: "entityCode",
      header: "Entity Code",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    {
      accessorKey: "entityAddress",
      header: "Entity Address",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "bankName",
      header: "Bank Name",
    },
    {
      accessorKey: "bankAccountNumber",
      header: "Bank Account Number",
    },
    {
      accessorKey: "branch",
      header: "Branch",
    },
    {
      accessorKey: "swiftCode",
      header: "Swift Code",
    },
    {
      accessorKey: "faxNumber",
      header: "Fax Number",
    },
    {
      accessorKey: "gstCode",
      header: "GST Code",
    },
    {
      accessorKey: "gstCodeVal",
      header: "GST Code Value",
    },
    {
      accessorKey: "updatedDate",
      header: "Updated Date",
    },
    actionColumn,
  ];

  const data = [
    {
      entityName: "Berger-Perez",
      entityCode: "XCR-69222",
      status: "Inactive",
      entityAddress: "06826 Garrett Forges\nReevesville, WV 88739",
      country: "Sri Lanka",
      bankName: "Sanders Inc",
      bankAccountNumber: "YMXF29657507567445",
      branch: "West Kristinashire",
      swiftCode: "WVKXGBL9",
      faxNumber: "430.108.9329",
      gstCode: "yAn-######",
      gstCodeVal: "IZw-######",
      updatedDate: "1988-02-12",
    },
    {
      entityName: "Hammond Inc",
      entityCode: "ajm-43542",
      status: "Inactive",
      entityAddress: "960 Ryan Ville Apt. 870\nPort Bianca, LA 96045",
      country: "Micronesia",
      bankName: "Blevins and Sons",
      bankAccountNumber: "WUQI16073690959970",
      branch: "Heatherborough",
      swiftCode: "DAOBGBZU",
      faxNumber: "071-505-7461x449",
      gstCode: "mQE-######",
      gstCodeVal: "UVV-######",
      updatedDate: "2002-12-13",
    },
    {
      entityName: "Brewer, Valdez and Hanson",
      entityCode: "XUO-15318",
      status: "Inactive",
      entityAddress: "895 Clifford Land Suite 825\nWrightstad, SD 63721",
      country: "Heard Island and McDonald Islands",
      bankName: "Carroll, Wilson and Cervantes",
      bankAccountNumber: "HQOB86535037516892",
      branch: "Juliamouth",
      swiftCode: "MSWEGB7J",
      faxNumber: "776.194.7770",
      gstCode: "htE-######",
      gstCodeVal: "XXR-######",
      updatedDate: "2018-06-05",
    },
    {
      entityName: "Thompson LLC",
      entityCode: "CIR-90950",
      status: "Active",
      entityAddress: "PSC 8064, Box 5527\nAPO AE 02875",
      country: "Guyana",
      bankName: "Diaz Ltd",
      bankAccountNumber: "KHYD35343894737091",
      branch: "Hammondstad",
      swiftCode: "MEZRGB7S",
      faxNumber: "+1-802-478-3081",
      gstCode: "HFM-######",
      gstCodeVal: "FQs-######",
      updatedDate: "2006-04-20",
    },
    {
      entityName: "Evans PLC",
      entityCode: "ygq-60575",
      status: "Active",
      entityAddress: "029 Shawn Street\nGarcialand, AR 09015",
      country: "Puerto Rico",
      bankName: "Sanchez-Fitzpatrick",
      bankAccountNumber: "SKKN20281114324254",
      branch: "South Amanda",
      swiftCode: "XCWQGB1E",
      faxNumber: "588.521.8974",
      gstCode: "JGy-######",
      gstCodeVal: "lRy-######",
      updatedDate: "2020-01-10",
    },
    {
      entityName: "Mcclure-Larson",
      entityCode: "szV-22366",
      status: "Inactive",
      entityAddress: "147 Angelica Crossing\nSanchezton, CA 39314",
      country: "Thailand",
      bankName: "Shepherd, Alexander and Coleman",
      bankAccountNumber: "FBGR47896702789661",
      branch: "South Jeffreychester",
      swiftCode: "IWBIGBHV",
      faxNumber: "(221)207-0455x00757",
      gstCode: "PBZ-######",
      gstCodeVal: "tPi-######",
      updatedDate: "1984-05-11",
    },
    {
      entityName: "Bautista, Clay and Flores",
      entityCode: "FVB-70677",
      status: "Active",
      entityAddress: "2277 Jenna Meadows Apt. 903\nPort Matthewview, NM 15739",
      country: "Ethiopia",
      bankName: "Harmon-Jones",
      bankAccountNumber: "GLWS08343591043537",
      branch: "Port Michaelmouth",
      swiftCode: "ILFBGBW5",
      faxNumber: "001-975-825-5398",
      gstCode: "Fax-######",
      gstCodeVal: "ZEP-######",
      updatedDate: "2009-05-08",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "entityName",
      label: "Entity Name *",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "entityCode",
      label: "Entity Code *",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "entityAddress",
      label: "Entity Address *",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      orientation: "horizontal",
    },

    {
      name: "bankName",
      label: "Bank Name",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "bankAccountNumber",
      label: "Bank Account Number",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "branch",
      label: "Branch",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "swiftCode",
      label: "Swift Code",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "emailID",
      label: "Email ID",
      type: "email",
      orientation: "horizontal",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "faxNumber",
      label: "FAX Number",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "gstCode",
      label: "GST Code",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "gstCodeValue",
      label: "GST Code Value",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Entity Master"
      formFields={formFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  );
}
