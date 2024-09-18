"use client"

import React, {
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Order } from "@/schemas/order/order"
import { motion } from "framer-motion"

import { Order as OrderRes } from "@/types/orders"
import { useOrders, useUpdateOrder } from "@/lib/hooks/orders"
import { useStatuses } from "@/lib/hooks/statuses"
import { mapSchemaToJson } from "@/lib/mapper/order"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import NewOrderModal from "@/components/dashboard/new-order-modal"

const columnOrder = [
  "Complete",
  "Delayed",
  "AXB Booked & Confirmed",
  "Shipped",
  "Delivered",
  "In Flight",
  "Active",
]

const CustomKanban = () => {
  const { isLoading: isLoadingStatus, data: allStatus } = useStatuses()

  const { data: ordersData, refetch } = useOrders({ page: 1, page_size: 999 })

  const cards = ordersData?.data.flatMap((item) => item.object) ?? []

  const sortedStatuses = allStatus
    .filter((status: OrderRes["status"]) => columnOrder.includes(status.name))
    .sort(
      (a: OrderRes["status"], b: OrderRes["status"]) =>
        columnOrder.indexOf(a.name) - columnOrder.indexOf(b.name)
    )

  // Add the remaining statuses that are not in the predefined order at the end
  const remainingStatuses = allStatus.filter(
    (status: OrderRes["status"]) => !columnOrder.includes(status.name)
  )

  const uniqueStatuses = [...sortedStatuses, ...remainingStatuses]

  return (
    <div className="h-screen w-full text-neutral-50">
      <Board allCards={cards} allStatus={uniqueStatuses} onRefetch={refetch} />
    </div>
  )
}

const Board = ({
  allCards,
  allStatus,
  onRefetch,
}: {
  allCards: OrderRes[]
  allStatus: OrderRes["status"][]
  onRefetch: VoidFunction
}) => {
  const [cards, setCards] = useState<OrderRes[]>(allCards)

  useEffect(() => {
    setCards(allCards)
  }, [allCards])

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-2">
      {allStatus.map((status: OrderRes["status"]) => (
        <Column
          onRefetch={onRefetch}
          key={status.ID}
          title={status.name}
          status={status}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  )
}

type ColumnProps = {
  title: string
  cards: OrderRes[]
  setCards: Dispatch<SetStateAction<OrderRes[]>>
  status: OrderRes["status"]
  onRefetch: VoidFunction
}

const Column = ({ title, cards, status, setCards, onRefetch }: ColumnProps) => {
  const [active, setActive] = useState(false)
  // Filter cards for the specific column internally
  const update = useUpdateOrder()

  const handleDragStart = (e: DragEvent, card: OrderRes) => {
    e.dataTransfer.setData("cardId", card.ID)
  }

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId")

    setActive(false)
    clearHighlights()

    const indicators = getIndicators()
    const { element } = getNearestIndicator(e, indicators)

    const before = element.dataset.before || "-1"

    if (before !== cardId) {
      let copy = [...cards]
      let cardToTransfer = copy.find((c) => c.ID === cardId)
      if (!cardToTransfer) return
      cardToTransfer = { ...cardToTransfer, status }

      copy = copy.filter((c) => c.ID !== cardId)

      const moveToBack = before === "-1"

      if (moveToBack) {
        copy.push(cardToTransfer)
      } else {
        const insertAtIndex = copy.findIndex((el) => el.ID === before)
        if (insertAtIndex === undefined) return

        copy.splice(insertAtIndex, 0, cardToTransfer)
      }
      const dataMapped = mapSchemaToJson(mapShipmentToOrder(cardToTransfer))

      await update.mutateAsync(
        { ...(dataMapped as Order), id: cardId },
        { onError: onRefetch }
      )

      setCards(copy)
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    highlightIndicator(e)

    setActive(true)
  }

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators()

    indicators.forEach((i) => {
      i.style.opacity = "0"
    })
  }

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators()

    clearHighlights(indicators)

    const el = getNearestIndicator(e, indicators)

    el.element.style.opacity = "1"
  }

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()

        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    )

    return el
  }

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${status.name}"]`
      ) as unknown as HTMLElement[]
    )
  }

  const handleDragLeave = () => {
    clearHighlights()
    setActive(false)
  }

  const filteredCards = cards.filter((c) => c.status?.name === status.name)

  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const handleCardClick = (ID: string) => {
    const cardFound = cards.find((c) => c.ID === ID)
    if (cardFound) {
      // openModal(mapShipmentToOrder(cardFound), ID)
      openModal(cardFound, ID)
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"edit" | "create">("edit")
  const [selectedColumnId, setSelectedColumnId] = useState("booking_type_name")

  const onOpenChange = useCallback((open: boolean) => {
    // refetchOrders() // Refetch the orders after updating

    setModalOpen(open)
    if (!open) setSelectedColumnId("")
  }, [])

  const openModal = (data: any, columnId: string) => {
    setSelectedBooking(data)
    setSelectedColumnId(columnId)
    setModalOpen(true)
    setModalType("edit")
  }
  return (
    <>
      <NewOrderModal
        selectedColumnId={selectedColumnId}
        open={modalOpen}
        onOpenChange={onOpenChange}
        mode={modalType}
      />

      <div className="min w-64 shrink-0">
        <div className="mb-3 flex w-full items-center justify-between">
          <h3 className={`font-medium text-white`}>{title}</h3>
          <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
          </span>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            active ? "dark:bg-neutral-800/50" : "dark:bg-neutral-800/0"
          }`}
        >
          {filteredCards.map((c) => {
            return (
              <Card
                key={c.ID}
                {...c}
                handleDragStart={handleDragStart}
                handleCardClick={handleCardClick}
              />
            )
          })}
          <DropIndicator beforeId={null} status={status} />
        </div>
      </div>
    </>
  )
}

type CardProps = OrderRes & {
  handleDragStart: Function
  handleCardClick: (ID: string) => void
}

const Card = ({
  awb,
  origin,
  destination,
  ID,
  status,
  updated_at,
  shipper,
  handleDragStart,
  handleCardClick,
}: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={ID} status={status} />
      <motion.div
        layout
        layoutId={ID}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { awb, ID, status })}
        transition={{ duration: 0.1 }} // Adjust the duration as needed
        className="h-25 w-64 cursor-grab rounded border border-neutral-700 dark:bg-neutral-800 p-3 active:cursor-grabbing"
        onClick={() => handleCardClick(ID)}
      >
        <p className="text-sm font-medium text-muted-foreground">AWB: {awb}</p>
        <p className="text-sm font-medium text-muted-foreground">
          Dest: {destination?.name} → Origin: {origin?.name}
        </p>
        <p className="text-sm font-normal text-muted-foreground/50">
          {formatDate(updated_at)}
        </p>
        <p className="text-sm font-medium text-muted-foreground/50">
          {shipper?.name}
        </p>
      </motion.div>
    </>
  )
}

function formatDate(isoString: string | number | Date | undefined) {
  const date = new Date(isoString || "")

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-indexed
  const year = date.getFullYear()

  // Extract time components
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"

  // Convert 24-hour time to 12-hour time
  hours = hours % 12
  hours = hours ? hours : 12 // If hour is 0, make it 12

  return `${day}/${month}/${year}, ${hours}:${minutes}${ampm}`
}

type DropIndicatorProps = {
  beforeId: string | null
  status: OrderRes["status"]
}

const DropIndicator = ({ beforeId, status }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={status.name}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  )
}

export default CustomKanban

// Function to map OrderRes to Order
const mapShipmentToOrder = (shipment: OrderRes): Order => {
  return {
    ID: shipment.ID,
    amount_due: shipment.amount_due ? String(shipment.amount_due) : undefined,
    activity_logs: shipment.activity_logs?.map((log) => ({
      ID: log.ID,
      created_at: log.created_at,
      updated_at: log.updated_at,
      user: log.user
        ? {
            ID: log.user.ID,
            name: log.user.name,
            email: log.user.email,
          }
        : undefined,
      action: log.action,
    })),
    awb: shipment.awb,
    bill_to_id: shipment.bill_to?.id,
    bill_to_name: shipment.bill_to?.name,
    booking_type_id: shipment.booking_type.ID,
    ch_weight_kg: shipment.ch_weight_kg
      ? String(shipment.ch_weight_kg)
      : undefined,
    commodity_code_id: shipment.commodity_code?.ID,
    consignee_id: shipment.consignee?.id,
    currency_id: shipment.currency?.ID,
    customer_id: shipment.customer?.id,
    destination_id: shipment.destination?.ID,
    freight_forwarder_id: shipment.freight_forwarder?.id,
    gs_weight_kg: shipment.gs_weight_kg
      ? String(shipment.gs_weight_kg)
      : undefined,
    is_physical: shipment.is_physical
      ? String(shipment.is_physical)
      : undefined,
    mode: shipment.mode,
    organization_id: shipment.organization?.id,
    origin_id: shipment.origin.ID,
    partner_code_id: shipment.partner_code.ID,
    partner_prefix_id: shipment.partner_prefix?.ID,
    payment_mode_id: shipment.payment_mode?.ID,
    rate: shipment.rate ? String(shipment.rate) : undefined,
    s_freight: shipment.s_freight ? String(shipment.s_freight) : undefined,
    s_rate: shipment.s_rate ? String(shipment.s_rate) : undefined,
    shipper_id: shipment.shipper?.id,
    spot_id: shipment.spot_id ? String(shipment.spot_id) : undefined,
    status_id: shipment.status.ID,
    total: shipment.total ? String(shipment.total) : undefined,
    volume_kg: shipment.volume_kg ? String(shipment.volume_kg) : undefined,
    use_freight_forwarder: shipment.freight_forwarder
      ? String(!!shipment.freight_forwarder)
      : undefined,
    weight_and_volume_type: undefined, // Not available in Shipment
    hawb_form: {
      booking_type_id: shipment.booking_type?.ID,
      partner_prefix_id: shipment.partner_prefix?.ID,
      awb: shipment.awb,
      partner_code_id: shipment.partner_code?.ID,
      origin_id: shipment.origin?.ID,
      destination_id: shipment.destination?.ID,
      consignor_id: shipment.shipper?.id, // Assuming shipper is consignor
      consignee_id: shipment.consignee?.id,
      weight: shipment.gs_weight_kg ? String(shipment.gs_weight_kg) : undefined,
      weight_unit: undefined, // Not available in Shipment
      volume: shipment.volume_kg ? String(shipment.volume_kg) : undefined,
      volume_unit: undefined, // Not available in Shipment
    },
    individual_parcel_form: {
      description: undefined, // Not available in Shipment
      internal_id: undefined, // Not available in Shipment
      external_id: undefined, // Not available in Shipment
      weight: shipment.gs_weight_kg ? String(shipment.gs_weight_kg) : undefined,
      weight_unit: undefined, // Not available in Shipment
      volume: shipment.volume_kg ? String(shipment.volume_kg) : undefined,
      volume_unit: undefined, // Not available in Shipment
      commodity_code_id: shipment.commodity_code?.ID,
    },
    weight_and_volume_table: [], // Assuming this information is not available in Shipment
    total_weight: shipment.gs_weight_kg
      ? String(shipment.gs_weight_kg)
      : undefined,
    total_volume: shipment.volume_kg ? String(shipment.volume_kg) : undefined,
    payment_form: {}, // Assuming this information is not available in Shipment
    payment_table: undefined, // Assuming this information is not available in Shipment
    total_paid: undefined, // Assuming this information is not available in Shipment
  }
}
