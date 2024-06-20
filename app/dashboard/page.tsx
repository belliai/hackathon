"use client";

import { DataTable } from "@components/data-table/data-table";
import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import { Loader } from "lucide-react";
import NewOrderModal from "@/components/dashboard/new-order-modal";
import { useState, useCallback } from "react";
import { useBookingContext } from "@/components/dashboard/BookingContext";
import LiveCursorHoc from "@/components/liveblocks/live-cursor-hoc";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

export default function Dashboard() {
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
    <div className="relative">
      <ClientSideSuspense
        fallback={
          <Loader className="absolute size-5 text-muted-foreground animate-spin" />
        }
      >
        <LiveCursorHoc />
      </ClientSideSuspense>
      <DataTable
        initialPinning={{
          left: [],
          right: ["actions"],
        }}
        columns={columns}
        onRowClick={openModal}
        data={data}
        className="border-none [&_th]:text-foreground [&_th]:py-2 [&_th]:px-3 [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground"
      />
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} mode="edit" />
    </div>
  );
}
