"use client";

import { DataTable } from "@/components/data-table/data-table";
import DataTableFilterForm from "@/components/data-table/data-table-filter-form";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { PackageIcon, PlaneIcon, Plus, ScrollTextIcon, SquarePenIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal";
import { useState } from "react";
import DimensionsCard from "@/components/dashboard/dimensions-card";
import BalanceCard from "@/components/dashboard/balance-card";
import { Button } from "@/components/ui/button";
import OrderSummaryCard from "@/components/dashboard/order-summary-card";
import FlightMasterForm from "./components/FlightMasterForm";
import { DUMMY_DATA, columns } from "./components/column";
import { formFilters } from "./components/filter";

const formDefaultValues = {
  flightNo: '',
  source: '',
  destination: '',
  fromDate: '',
  toDate: '',
  deptDay: '',
  deptHour: '',
  deptMinute: '',
  arrivalDay: '',
  arrivalHour: '',
  arrivalMinute: '',
  frequencyItems: ['mon'],
  aircraftType: '',
  tailNo: '',
  capacity: '',
  uom: '',
  sector: '',
  status: '',
  flightType: '',
};

export default function Page() {
  const [openModal, setOpenModal] = useState<string | boolean>(false);
  const hookFilter = useForm();
  const sectionedHookForm = useForm({
    defaultValues: formDefaultValues,
  });

  console.log(sectionedHookForm.watch())

  const sectionedFormFields = [
    {
      label: "Booking Details",
      value: "booking-details",
      icon: <SquarePenIcon />,
      content: (
        <FlightMasterForm
          hookForm={sectionedHookForm} 
        />
      )
    },
    {
      label: "Consignment Details",
      value: "consignment-details",
      icon: <PlaneIcon />,
      FormFields:[],
    },
    {
      label: "Shipper Details",
      value: "shipper-details",
      icon: <UserIcon />,
      formFields: [],
    },
    {
      label: "Process Rates",
      value: "process-rates",
      icon: <PackageIcon />,
      formFields: [],
    },
  ];

  return (
    <>
      <PageContainer className="gap-6">
        <PageHeader title="Flight Master" />
        <DataTableFilterForm form={hookFilter} formFilters={formFilters} />
        <DataTable
          columns={columns}
          data={DUMMY_DATA}
          onRowClick={(data) => {
            setOpenModal('Edit');
            sectionedHookForm.reset(formDefaultValues);
          }}
          extraToolbarButtons={[
            {
              label: "Create New Flight",
              icon: Plus,
              variant: "button-primary",
              onClick: () => setOpenModal(true),
            },
          ]}
        />
      </PageContainer>

      <CreateEditModal
        title={
          typeof openModal === "string"
            ? "Edit Flight"
            : openModal
            ? "Create New Flight"
            : ""
        }
        open={openModal !== false}
        form={sectionedHookForm}
        onSubmit={(data) => console.log(data)}
        setOpen={(open) => {
          if (open) {
            setOpenModal(openModal);
          } else {
            sectionedHookForm.reset(formDefaultValues);
            setOpenModal(false);
          }
        }}
        tabItems={sectionedFormFields}
        rightComponent={
          // This is a dummy component, will replace once there is a use for this
          <>
            <div className="space-y-4">
              <OrderSummaryCard
                bookingType="37ce1cdf-cd24-4a6a-895e-5e513b175ce6"
                partnerPrefix="d3139164-9222-4a76-b1fe-c076314d5542"
                axb="112233"
                origin="9bb940c1-0bc2-417a-a975-6811d5c0b7ea"
                destination="5de641cd-f699-4fcd-9efc-ea9f6db039a2"
                commodityCode="5ec17d70-3da8-4c32-ac15-8b2eaeae162f"
              />
              <DimensionsCard />
              <BalanceCard />
            </div>
            <div className="space-y-4">
              <Button
                type="button"
                variant={"button-secondary"}
                className="w-full"
              >
                <ScrollTextIcon className="w-4 h-4 mr-2" />
                View Invoice
              </Button>
              <Button
                isLoading={false}
                variant={"button-primary"}
                className="w-full"
                type="submit"
              >
                Save Reservation
              </Button>
            </div>
          </>
        }
      />
    </>
  );
}
