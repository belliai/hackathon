"use client";

import FilterBar from "@/components/dashboard/filterbar";
import Stats from "@/components/dashboard/stats";
import { DataTable } from "@components/data-table/data-table";
import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react";
import NewOrderModal from "@/components/dashboard/new-order-modal";
import { useState, useCallback } from "react";
import { useBookingContext } from "@/components/dashboard/BookingContext";
import DelivertyStatus from "@/components/dashboard/delivery-status"
import PendingDeliveriesA2A from "@/components/dashboard/pending-deliveries-a2a";
import SummaryBar from "@/components/dashboard/select-summary";

export default function A2A() {
  const data = getData();
  const { setSelectedBooking } = useBookingContext();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (data: Order) => {
    setSelectedBooking(data);
    setModalOpen(true);
  };

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open);
  }, []);

  return (
    <PageContainer className="py-8 gap-6">
      <SummaryBar 
        onTypeChange={(type: string) => {
          // handle change of type
        }} 
        onDateButtonClick={(date: string) => {
          // handle date selection
        }} 
      />
      <DelivertyStatus />
      <Stats />
      <div>
        <PendingDeliveriesA2A />
      </div>
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} />
    </PageContainer>
  );
}
