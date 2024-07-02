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
import BarGraph from "@/components/dashboard/bar-graph-wpm";
import { BookingCount } from "@/components/dashboard/booking-count";

export default function WPM() {
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

  const handleSelect = (option: string) => {
    console.log("Selected option:", option);
  };

  return (
    <PageContainer className="py-8 gap-6">
      <BarGraph onSelect={handleSelect} />
      <div className="flex ml-4 justify-between w-full">
      <h2 className="text-xl font-semibold mb-2">A2A Bookings Count</h2>
      <h2 className="text-xl font-semibold mb-2">D2D Bookings Count</h2>
      </div>
      <div className="flex ml-4">
          <BookingCount />
          <BookingCount />
        </div>
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} />
    </PageContainer>
  );
}
