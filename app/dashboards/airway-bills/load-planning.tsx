import React, { useEffect, useState } from "react"
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { ArrowRight, PlaneIcon } from "lucide-react"

import { Order } from "@/types/orders"
import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { useOrders } from "@/lib/hooks/orders"
import { ObjectSet } from "@/lib/utils/array-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import styles from "@/app/settings/aircrafts/components/aircrafts/AirplaneInterface.module.css"

const DraggableCard: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

interface OrderType {
  ID: string
  awb: string
  booking_type: {
    name: string
  }
  origin: {
    airport_code: string
  }
  destination: {
    airport_code: string
  }
}

const DroppableArea: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`custom-scrollbar h-[150px] w-full overflow-x-auto border-r-0 pb-2`}
    >
      <div
        className={`${styles.droppableArea} flex h-full min-w-max gap-2 p-8 pl-[250px]`}
      >
        {children}
      </div>
    </div>
  )
}

const LoadPlanning = () => {
  const { data: flightsData } = useFlightList({ page: 1, page_size: 10 })
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: string[] }>(
    {}
  )

  const flights = flightsData?.data.flatMap((item) => item.object)

  const [orders, setOrders] = useState<Order[]>([])

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    page_size: 10,
  })

  const {
    isLoading,
    isPending,
    error,
    data: ordersData,
  } = useOrders(pagination)

  useEffect(() => {
    const data = ordersData?.data.flatMap((item) => item.object) ?? []
    const objectSet = new ObjectSet<Order>("ID")
    objectSet.addAll(data)
    setOrders(objectSet.getItems())
  }, [ordersData])

  const handleDragEnd = (event: { over: any; active: any }) => {
    const { over, active } = event
    if (over) {
      setDroppedItems((prev) => ({
        ...prev,
        [over.id]: [...(prev[over.id] || []), active.id],
      }))
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4">
        <div className="flex h-full w-1/6 flex-col gap-2">
          <h3 className="font-bold text-white">AWB List</h3>
          <div className="flex h-5 flex-1 flex-col gap-2 overflow-y-scroll">
            {orders?.map((order: OrderType) => (
              <DraggableCard
                id={`draggable-card-${order?.awb}`}
                key={order?.ID}
              >
                <Card className="w-full overflow-clip rounded-md bg-button-primary">
                  <CardHeader className="flex bg-button-primary px-4 py-2">
                    <CardTitle className="inline-flex items-center gap-2 text-sm font-bold">
                      {order?.awb}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="text-xs font-bold">
                        {order?.booking_type?.name}
                      </text>
                      <text className="text-xs text-white">{`${order?.origin?.airport_code}- ${order?.destination?.airport_code}`}</text>
                    </div>
                  </CardContent>
                </Card>
              </DraggableCard>
            ))}
          </div>
        </div>
        <div className="grid w-5/6 grid-cols-1 gap-4">
          {flights?.map((flight) => (
            <Card className="overflow-clip rounded-md" key={flight.id}>
              <CardHeader className="flex bg-card px-4 py-2">
                <CardTitle className="inline-flex items-center gap-2 text-base font-bold">
                  <PlaneIcon className="size-4" />
                  {flight.flight_number}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex w-full gap-2">
                <div className="w-1/3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Flight Status</text>
                      <text className="text-muted-foreground">Planned</text>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Route</text>
                      <div className="flex items-center gap-1">
                        <span className="w-14 whitespace-nowrap rounded-sm bg-accent px-1 py-0.5 text-center text-sm text-white">
                          {flight?.origin?.name}
                        </span>
                        <ArrowRight className="size-4" />
                        <span className="w-14 whitespace-nowrap rounded-sm bg-accent px-1 py-0.5 text-center text-sm text-white">
                          {flight?.destination?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Airplane Type</text>
                      <text className="text-muted-foreground">
                        {flight.tail.aircraft_type.name}
                      </text>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Cargo Capacity</text>
                      <text className="text-muted-foreground">
                        {flight?.specification?.cargo_capacity.toLocaleString()}
                      </text>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Departure</text>
                      <text className="text-muted-foreground">
                        {flight.departure_date}
                      </text>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <text className="font-bold">Arrival</text>
                      <text className="text-muted-foreground">
                        {flight.arrival_date}
                      </text>
                    </div>
                  </div>
                </div>
                <div className="max-w-2/3 w-2/3 overflow-x-auto p-4">
                  <DroppableArea id={`droppable-${flight.id}`}>
                    {droppedItems[`droppable-${flight.id}`]?.map(
                      (itemId, index) => (
                        <div
                          key={itemId}
                          className="flex aspect-square h-full flex-col items-center justify-center rounded-sm bg-button-primary p-2"
                        >
                          <div className="text-sm font-bold">{`AWB${index + 1}`}</div>
                          <div className="text-sm">
                            {Math.floor(Math.random() * 101)}%
                          </div>
                        </div>
                      )
                    )}
                  </DroppableArea>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DndContext>
  )
}

export default LoadPlanning
