"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DataTable } from "@components/data-table/data-table"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { PlusIcon } from "@radix-ui/react-icons"
import { PaginationState } from "@tanstack/react-table"
import {
  CogIcon,
  HomeIcon,
  KanbanSquare,
  Loader,
  SquareKanban,
  SquareKanbanIcon,
} from "lucide-react"

import { getData } from "@/lib/data"
import { useOrders, useRemoveOrder } from "@/lib/hooks/orders"
import { useStatuses } from "@/lib/hooks/statuses"
import { onExport } from "@/lib/utils/export"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import NewOrderModal from "@/components/dashboard/new-order-modal"
import LiveCursorHoc from "@/components/liveblocks/live-cursor-hoc"
import BookingType from "@/app/data-fields/booking-type"
import CommodityCode from "@/app/data-fields/commodity-code"
import Location from "@/app/data-fields/location"
import Status from "@/app/data-fields/status"
import TimeZone from "@/app/data-fields/time-zone"
import TransportMethod from "@/app/data-fields/transport-method"

import CustomKanban, { Shipment } from "./kanban"

const SETTING_OPTIONS = [
  {
    label: "Airway Bills",
    value: "",
    child: [
      {
        label: "Booking Type",
        value: "booking-type",
      },
      {
        label: "Status",
        value: "status",
      },
      {
        label: "Location",
        value: "location",
      },
      {
        label: "Commodity Code",
        value: "commodity-code",
      },
      {
        label: "Transport Method",
        value: "transport-method",
      },
      {
        label: "Time Zone",
        value: "time-zone",
      },
    ],
  },
]

const SETTING_LIST = {
  width: "w-[128px]",
  data: [
    {
      label: "Airway Bills",
      value: "",
      child: [
        {
          label: "Booking Type",
          value: "/data-fields/airway-bills?tab=booking-type",
        },
        {
          label: "Status",
          value: "/data-fields/airway-bills?tab=status",
        },
        {
          label: "Location",
          value: "/data-fields/airway-bills?tab=location",
        },
        {
          label: "Commodity Code",
          value: "/data-fields/airway-bills?tab=commodity-code",
        },
        {
          label: "Transport Method",
          value: "/data-fields/airway-bills?tab=transport-method",
        },
        {
          label: "Time Zone",
          value: "/data-fields/airway-bills?tab=time-zone",
        },
      ],
    },
  ],
}

const AWBTabsList = ({ tabValue }: { tabValue: string }) => (
  <TabsList className="gap-2 bg-transparent p-0">
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="list-view"
    >
      <HomeIcon className="mr-2 size-4" />
      List View
    </TabsTrigger>
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="kanban-view"
    >
      <SquareKanbanIcon className="mr-2 size-4" />
      Kanban View
    </TabsTrigger>
    {/* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-8 border border-secondary ${tabValue !== 'airway-bills' ? 'border-muted-foreground/40 bg-secondary text-white' : ''}`}
        >
          <CogIcon className="mr-2 size-4" />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuGroup>
          {SETTING_OPTIONS.map((item, index) => {
            if (item.child) {
              return (
                <DropdownMenuSub key={`setting-${index}`}>
                  <DropdownMenuSubTrigger>
                    <span>{item.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="ml-2">
                      {item.child.map((childMenu, childId) => (
                        <DropdownMenuItem key={`child-${index}-${childId}`} className="cursor-pointer">
                          <TabsTrigger
                            value={childMenu.value}
                            className="data-[state=active]:bg-transparent"
                          >
                            {childMenu.label}
                          </TabsTrigger>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )
            }
            return (
              <DropdownMenuItem key={`setting-${index}`} className="cursor-pointer">
                <TabsTrigger
                  value={item.value}
                >
                  {item.label}
                </TabsTrigger>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu> */}
  </TabsList>
)

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"edit" | "create">("create")
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState("")
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [tabValue, setTabValue] = useState("list-view") // If no tabParam, default to list-view

  // const { data: allStatus } = useStatuses()

  const {
    isLoading,
    isPending,
    error,
    data: ordersData,
  } = useOrders({ pagination })
  const remove = useRemoveOrder()

  const [cards, setCards] = useState<Shipment[]>(ordersData?.data || [])

  useEffect(() => {
    setCards(ordersData?.data || [])
  }, [ordersData])

  const openModal = (data: Order, columnId: string) => {
    console.error("opening modal from airwaybill", data)
    setSelectedBooking(data)
    setSelectedColumnId(columnId)
    setModalOpen(true)
    if (data) setModalType("edit")
  }

  const onShowDelete = (data: any) => {
    setSelectedBooking(data)
    setDeleteConfirm(true)
  }

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setSelectedColumnId("")
  }, [])

  const onDelete = (data: any) => {
    if (data.ID) remove.mutate({ id: data.ID })
    setSelectedBooking(undefined)
  }

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const generateButton = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => {
        setModalOpen(true)
        setModalType("create")
      }}
      style={{ fontSize: "0.875rem" }}
    >
      <PlusIcon className="mr-2 size-4" />
      New Order
    </Button>
  )

  const columnWithActions = columns.map((column) => ({
    ...column,
    cell: ({
      row: { original, getValue },
      column: { id },
    }: {
      row: { original: any; getValue: (id: string) => any }
      column: { id: string }
    }) => {
      const columnValue =
        original.booking_type?.name?.toLowerCase() === "mawb" && id === "hawb"
          ? "567-56789012"
          : original.booking_type?.name?.toLowerCase() === "hawb" &&
              id === "mawb"
            ? "345-34567890"
            : getValue(id)

      return (
        <div onClick={() => openModal(original, id)} className="cursor-pointer">
          {columnValue}
        </div>
      )
    },
  }))

  const memoizedTabsList = useMemo(
    () => <AWBTabsList tabValue={tabValue} />,
    [tabValue]
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value))
  }

  // useEffect(() => {
  //   if (tabParam) {
  //     setTabValue(tabParam)
  //   }
  // }, [tabParam])

  // useEffect(() => {
  //   setSearchParams("tab", tabValue)
  // }, [tabValue])

  return (
    <div>
      <ClientSideSuspense fallback={<></>}>
        <LiveCursorHoc />
      </ClientSideSuspense>
      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsContent value="list-view" asChild>
          <DataTable
            initialPinning={{
              left: [],
              right: ["actions"],
            }}
            columns={columnWithActions}
            // onRowClick={openModal}
            data={isLoading ? [] : ordersData?.data}
            pageCount={isLoading ? 1 : ordersData.total_pages}
            manualPagination={true}
            tableState={tableState}
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
            menuId="airway-bill-dashboard"
            showToolbarOnlyOnHover={true}
            extraRightComponents={generateButton}
            isCanExport={true}
            onExport={() =>
              onExport({ data: ordersData.data, filename: "AirwaybillsData" })
            }
            extraLeftComponents={memoizedTabsList}
            // settingOptions={SETTING_LIST}
          />
        </TabsContent>
        <TabsContent value="kanban-view" asChild>
          <>
            <div className="flex justify-between gap-2">
              {memoizedTabsList}
              {generateButton}
            </div>

            <CustomKanban
              ordersData={ordersData}
              cards={cards}
              setCards={setCards}
            />
          </>
        </TabsContent>
        <TabsContent value="status" asChild>
          <Status tabComponent={memoizedTabsList} />
        </TabsContent>
        <TabsContent value="location" asChild>
          <Location tabComponent={memoizedTabsList} />
        </TabsContent>
        <TabsContent value="commodity-code" asChild>
          <CommodityCode tabComponent={memoizedTabsList} />
        </TabsContent>
        <TabsContent value="transport-method" asChild>
          <TransportMethod tabComponent={memoizedTabsList} />
        </TabsContent>
        <TabsContent value="time-zone" asChild>
          <TimeZone tabComponent={memoizedTabsList} />
        </TabsContent>
      </Tabs>
      <NewOrderModal
        open={modalOpen}
        onOpenChange={onOpenChange}
        mode={modalType}
        selectedColumnId={selectedColumnId}
      />
      <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the order
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(selectedBooking)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
