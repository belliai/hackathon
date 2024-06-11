"use client";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import CrudTable from "./components/crud-table";

import CrudCurrency from "./currency";
import CrudPartnerType from "./partner-type";
import CrudTransportMethod from "./transport-method";
import CrudPaymentMode from "./payment-mode";
import CrudLocation from "./location";

export default function Page() {
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Booking Modal Configuration" />
      <CrudTable
        title="Booking Type"
        columns={[{ accessorKey: "option" }]}
        form={[
          { name: "id", type: "hidden" },
          { name: "option", type: "text", label: "Booking Type" },
        ]}
        data={[
          { option: "Booking Type 1", id: "1" },
          { option: "Booking Type 2", id: "2" },
          { option: "Booking Type 3", id: "3" },
          { option: "Booking Type 4", id: "4" },
        ]}
        onSave={(data) => {
          // configure logic for add or edit, for edit the id will be zero
          console.log(data);
        }}
        onDelete={(data) => {
          // configure logic for delete
          console.log(data.id);
        }}
      />
      <CrudTable
        title="Partner Prefix"
        columns={[{ accessorKey: "option" }]}
        form={[
          { name: "id", type: "hidden" },
          { name: "option", type: "text", label: "Partner Prefix" },
        ]}
        data={[
          { option: "Prefix-1", id: "1" },
          { option: "Prefix-2", id: "2" },
          { option: "Prefix-3", id: "3" },
        ]}
        onSave={(data) => {
          // configure logic for add or edit, for edit the id will be zero
          console.log(data);
        }}
        onDelete={(data) => {
          // configure logic for delete
          console.log(data.id);
        }}
      />
      <CrudTable
        title="Partner Code"
        columns={[{ accessorKey: "option" }]}
        form={[
          { name: "id", type: "hidden" },
          { name: "option", type: "text", label: "Partner Code" },
        ]}
        data={[
          { option: "Code-1", id: "1" },
          { option: "Code-2", id: "2" },
          { option: "Code-3", id: "3" },
        ]}
        onSave={(data) => {
          // configure logic for add or edit, for edit the id will be zero
          console.log(data);
        }}
        onDelete={(data) => {
          // configure logic for delete
          console.log(data.id);
        }}
      />
      <CrudTable
        title="Status"
        columns={[{ accessorKey: "option" }]}
        form={[
          { name: "id", type: "hidden" },
          { name: "option", type: "text", label: "Status" },
        ]}
        data={[
          { option: "in Flight", id: "1" },
          { option: "Complete", id: "2" },
          { option: "Delayed", id: "3" },
        ]}
        onSave={(data) => {
          // configure logic for add or edit, for edit the id will be zero
          console.log(data);
        }}
        onDelete={(data) => {
          // configure logic for delete
          console.log(data.id);
        }}
      />
      <CrudLocation />
      
      <CrudTable
        title="Commodity Code"
        columns={[{ accessorKey: "name" }, { accessorKey: "desc" }]}
        form={[
          { name: "id", type: "hidden" },
          { name: "name", type: "text", label: "Name" },
          { name: "desc", type: "text", label: "Description" },
        ]}
        data={[
          { name: "CC-1", desc: "Description for CC-1", id: "1" },
          { name: "CC-2", desc: "Description for CC-1", id: "2" },
          { name: "CC-3", desc: "Description for CC-1", id: "3" },
        ]}
        onSave={(data) => {
          // configure logic for add or edit, for edit the id will be zero
          console.log(data);
        }}
        onDelete={(data) => {
          // configure logic for delete
          console.log(data.id);
        }}
      />

      <CrudPaymentMode />

      <CrudTransportMethod />

      <CrudPartnerType />

      <CrudCurrency />

    </PageContainer>
  );
}
