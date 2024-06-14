"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { useBookingContext } from "@/components/dashboard/BookingContext";
import ListUldInputHeader from "@/components/uld/list-uld-header";
import UldDetailsTable from "@/components/uld/uld-details-table";

export default function listULD() {

  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">List ULD</h2>
      </div>
      <ListUldInputHeader/>
      <UldDetailsTable/>
    </PageContainer>
  );
}
