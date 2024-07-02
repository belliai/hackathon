"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { useBookingContext } from "@/components/dashboard/BookingContext";
import ListUcrInputHeader from "@/components/uld/list-ucr-header";
import UcrDetailsTable from "@/components/uld/ucr-details-table";

export default function listUCR() {

  return (
    <PageContainer className="py-8 gap-6">
        <ListUcrInputHeader />
        <UcrDetailsTable />
    </PageContainer>
  );
}
