import React, { useCallback, useEffect, useState } from "react"
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ArrowRight,
  CheckIcon,
  PlaneIcon,
  RouteIcon,
  WeightIcon,
} from "lucide-react"

import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { useOrders } from "@/lib/hooks/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderType {
  ID: string
  awb: string
  booking_type?: {
    name: string
  }
  origin?: {
    airport_code: string
  }
  destination?: {
    airport_code: string
  }
  gs_weight_kg?: number
}

const SortableCard: React.FC<{
  id: string
  order: OrderType
  isSelected: boolean
  onSelectChange: (id: string) => void
}> = ({ id, order, isSelected, onSelectChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSelectChange(id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={`w-full overflow-clip rounded-md ${isSelected ? "bg-secondary" : "bg-card"} z-[2] cursor-pointer hover:bg-secondary`}
    >
      <Card className="border bg-transparent">
        <CardHeader className="flex px-4 py-2">
          <div className="flex items-center space-x-2">
            <CardTitle className="inline-flex items-center gap-2 text-sm">
              <text className="font-bold">{order.awb}</text>
              <text className="text-muted-foreground">
                {order.booking_type?.name}
              </text>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <text className="inline-flex gap-1 text-xs text-white">
              <RouteIcon className="size-4 text-muted-foreground" />{" "}
              {`${order.origin?.airport_code}- ${order.destination?.airport_code}`}
            </text>
            <text className="inline-flex gap-1 text-xs text-white">
              <WeightIcon className="size-4 text-muted-foreground" />{" "}
              {`${order.gs_weight_kg || "0"}Kg`}
            </text>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const DroppableArea: React.FC<{
  id: string
  items: OrderType[]
  onSort: (id: string, items: OrderType[]) => void
}> = ({ id, items, onSort }) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[280px] w-fit items-center border-r-0 pb-2`}
    >
      <div className="h-[190px] w-fit shrink-0">
        <svg
          className="h-full w-fit"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 150C0 139.254 11.1932 111.557 59.0328 89.9089C118.8313 62.7863 221.1738 10.9195 313.1807 10.9195H400V289.081H313.1807C221.1738 289.081 118.8313 237.214 59.0328 210.091C11.1932 188.443 0 160.746 0 150Z"
            fill="#4D4D4D"
          />

          <path
            transform="translate(130, 80)"
            d="M70.5857 135.481L70.5857 136.947L53.4372 136.947C47.8273 136.947 27.6826 128.976 13.594 110.1L12.7015 108.888L31.6987 108.888L31.89 109.207C45.4685 127.382 65.2945 135.481 70.5857 135.481ZM15.6977 110.355C29.2125 127.701 48.2735 135.417 53.4372 135.417L64.1471 135.417C55.5409 132.356 41.5799 124.385 31.0613 110.355L15.6977 110.355Z"
            fill="url(#paint0_linear_1_15298)"
          />
          <path
            transform="translate(130, 80)"
            d="M30.2964 31.0249L29.5315 32.1727C22.3916 43.1412 18.7579 55.5126 18.7579 68.9681C18.7579 82.4236 22.3916 94.7952 29.5315 105.764L30.2964 106.911L11.3629 106.911L11.1717 106.593C3.84055 95.3689 0.143126 82.7425 0.143126 68.9681C0.143125 55.1937 3.84055 42.5673 11.1717 31.3437L11.3629 31.0249L30.2964 31.0249ZM17.2916 68.9681C17.2916 55.7039 20.7341 43.3962 27.5552 32.4915L12.1917 32.4915C5.1793 43.3325 1.60933 55.6401 1.60933 68.9681C1.60933 82.2961 5.1793 94.54 12.1917 105.445L27.5552 105.445C20.7341 94.4762 17.2916 82.2323 17.2916 68.9681Z"
            fill="url(#paint1_linear_1_15298)"
          />
          <path
            transform="translate(130, 80)"
            d="M70.5858 0.925292L70.5858 2.39188C65.3584 2.39188 45.4687 10.4909 31.9539 28.6654L31.7626 28.9842L12.7654 28.9842L13.6579 27.7725C27.6827 8.89652 47.8274 0.925293 53.5011 0.925293L70.5858 0.925292ZM30.9976 27.5174C41.58 13.4879 55.4773 5.51669 64.0834 2.45571L53.3736 2.45572C48.2099 2.45572 29.1489 10.1719 15.6341 27.5174L30.9976 27.5174Z"
            fill="url(#paint2_linear_1_15298)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_15298"
              x1="41.6404"
              y1="136.947"
              x2="41.6404"
              y2="108.89"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1_15298"
              x1="15.207"
              y1="106.896"
              x2="15.207"
              y2="30.9962"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1_15298"
              x1="41.6405"
              y1="29.0014"
              x2="41.6405"
              y2="0.945063"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative -ml-1 h-[176px] w-fit min-w-[650px] items-center bg-[#4D4D4D]">
        <div className="absolute -top-[156px] left-[200px] -translate-y-1/2">
          <svg
            width="315"
            height="224"
            viewBox="0 0 315 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-translate-x-[145px] -rotate-90"
          >
            <path d="M314.5 172L1 1V204L314.5 223V172Z" fill="#303030" />
          </svg>
        </div>
        <div className="absolute -left-[92px] top-[333px] -translate-y-1/2">
          <svg
            width="315"
            height="224"
            viewBox="0 0 315 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-x-[145px] -rotate-90"
          >
            <path d="M1 172L314.5 1V204L1 223V172Z" fill="#303030" />
          </svg>
        </div>
        <SortableContext
          items={items.map((item) => item.ID)}
          strategy={verticalListSortingStrategy}
        >
          <div className="relative grid h-full w-fit grid-flow-col grid-rows-2 gap-2 p-4">
            {items.map((item) => (
              <div
                key={item.ID}
                className="flex aspect-video h-full w-32 flex-col items-center justify-center overflow-hidden rounded-sm bg-button-primary p-2"
              >
                <div
                  className="w-full truncate text-center text-sm font-bold"
                  title={item.awb}
                >
                  {item.awb}
                </div>
                <div className="text-xs">
                  {Math.floor(Math.random() * 101)}%
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </div>

      <div className="z-0 h-[190px] w-fit shrink-0">
        <svg
          className="h-full w-fit rotate-180"
          viewBox="0 0 500 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 150C0 142.627 16.7898 114.93 88.5492 93.2822C178.247 65.5726 331.7608 10.9195 469.771 10.9195H500V289.081H469.771C331.7608 289.081 178.247 234.427 88.5492 206.718C16.7898 185.07 0 157.373 0 150Z"
            fill="#4D4D4D"
          />
        </svg>
      </div>
    </div>
  )
}

const LoadPlanning = () => {
  const { data: flights } = useFlightList({ page: 1, page_size: 10 })
  const [droppedItems, setDroppedItems] = useState<{
    [key: string]: OrderType[]
  }>({})
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [activeIds, setActiveIds] = useState<string[]>([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: ordersData } = useOrders({ pagination })

  const [availableOrders, setAvailableOrders] = useState<OrderType[]>(
    ordersData?.data || []
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px tolerance before drag starts
      },
    })
  )

  const handleSelectChange = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev)
      if (newSelectedItems.has(id)) {
        newSelectedItems.delete(id)
      } else {
        newSelectedItems.add(id)
      }
      return newSelectedItems
    })
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    const draggedId = event.active.id as string
    if (selectedItems.has(draggedId)) {
      setActiveIds(Array.from(selectedItems))
    } else {
      setActiveIds([draggedId])
      setSelectedItems((prev) => new Set(prev).add(draggedId))
    }
  }

  const handleDragEnd = (event: { over: any; active: any }) => {
    const { over, active } = event

    if (over) {
      const overContainer = over.id

      setDroppedItems((prev) => {
        const newItems = { ...prev }
        const draggedOrders = activeIds
          .map((id) =>
            availableOrders.find(
              (order: OrderType) => `draggable-card-${order.awb}` === id
            )
          )
          .filter((order): order is OrderType => order !== undefined)

        Object.keys(newItems).forEach((container) => {
          newItems[container] = newItems[container].filter(
            (item) => !activeIds.includes(`draggable-card-${item.awb}`)
          )
        })

        if (!newItems[overContainer]) {
          newItems[overContainer] = []
        }
        newItems[overContainer] = [...newItems[overContainer], ...draggedOrders]

        return newItems
      })

      // Remove dropped items from availableOrders
      setAvailableOrders((prev) =>
        prev.filter(
          (order) => !activeIds.includes(`draggable-card-${order.awb}`)
        )
      )

      setSelectedItems((prev) => {
        const newSelectedItems = new Set(prev)
        activeIds.forEach((id) => newSelectedItems.delete(id))
        return newSelectedItems
      })
    }

    setActiveIds([])
  }

  const handleDragCancel = () => {
    setActiveIds([])
  }

  const handleSort = (id: string, items: OrderType[]) => {
    setDroppedItems((prev) => ({ ...prev, [id]: items }))
  }

  useEffect(() => {
    setAvailableOrders(ordersData?.data || [])
  }, [ordersData])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4">
        <div className="flex w-1/6 flex-col gap-2">
          <h3 className="mb-2 font-bold text-white">AWB List</h3>
          <SortableContext
            items={availableOrders.map(
              (order: OrderType) => `draggable-card-${order.awb}`
            )}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {availableOrders.map((order: OrderType) => (
                <SortableCard
                  id={`draggable-card-${order.awb}`}
                  key={order.ID}
                  order={order}
                  isSelected={selectedItems.has(`draggable-card-${order.awb}`)}
                  onSelectChange={handleSelectChange}
                />
              ))}
            </div>
          </SortableContext>
        </div>
        <div className="grid w-5/6 grid-cols-1 gap-4">
          <h3 className="font-bold text-white">Flight List</h3>
          {flights?.data?.map((flight) => (
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
                <div className="max-w-2/3 custom-scrollbar w-2/3 overflow-x-auto overflow-y-hidden p-4">
                  <DroppableArea
                    id={`droppable-${flight.id}`}
                    items={droppedItems[`droppable-${flight.id}`] || []}
                    onSort={(id, items) => handleSort(id, items)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeIds.length > 0 && (
          <div className="rounded-md bg-secondary p-2">
            <span className="font-bold text-white">
              {activeIds.length} items selected
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export default LoadPlanning
