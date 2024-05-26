"use client";

import FilterBar from "@/components/dashboard/filterbar";
import Stats from "@/components/dashboard/stats";
import { DataTable } from "@components/data-table/data-table";
import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react";
import NewOrderModal from "@/components/dashboard/new-order-modal";
import { useState } from "react";
export default function Dashboard() {
  const data = getData();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (data: Order) => {
    setModalOpen(true);
  };

  return (
    <PageContainer className="py-8 gap-6">
      <Stats />
      <div>
        <DataTable
          extraToolbarButtons={[
            {
              label: "Filter",
              icon: FilterIcon,
            },
            {
              label: "Refresh",
              icon: RefreshCcwIcon,
            },
            {
              label: "Download",
              icon: DownloadIcon,
            },
          ]}
          columns={columns}
          onRowClick={openModal}
          data={data}
          className="border-none [&_th]:text-foreground [&_th]:py-2 [&_th]:px-3 [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground"
        />
      </div>
      <NewOrderModal
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      />
    </PageContainer>
  );
}
