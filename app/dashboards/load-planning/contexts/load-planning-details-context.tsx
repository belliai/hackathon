import { zodResolver } from '@hookform/resolvers/zod';
import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { LoadPlanningLeftSection, LeftFormFilter } from '../types/schemas';
import { AWBData, DeckDetails, FlightData, LoadPlanningDetailsContextType, LoadPlanningDetailsProviderProps } from '../types';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
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
import { DUMMY_FLIGHT_ITEM, DUMMY_PLANNED_AWB_DATA, DUMMY_UNPLANNED_AWB_DATA } from '../constants';

const LoadPlanningDetailsContext = createContext<LoadPlanningDetailsContextType | undefined>(undefined);

export const useLoadPlanningDetailsContext = () => {
  const context = useContext(LoadPlanningDetailsContext);
  if (context === undefined) {
    throw new Error('useLoadPlanningDetailsContext must be used within a LoadPlanningDetailsProvider');
  }
  return context;
};

export const LoadPlanningDetailsProvider: React.FC<LoadPlanningDetailsProviderProps> = ({ children }) => {
  const [droppedItems, setDroppedItems] = useState<Record<string, AWBData[]>>({})
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [activeIds, setActiveIds] = useState<string[]>([])
  const [availableOrders, setAvailableOrders] = useState<AWBData[]>(DUMMY_UNPLANNED_AWB_DATA)
  const [plannedOrders, setPlannedOrders] = useState<AWBData[]>(DUMMY_PLANNED_AWB_DATA)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [awbTab, setAwbTab] = useState('unplanned')
  const [modalDetails, setModalDetails] = useState({
    title: '',
    description: '',
  })
  const [flightDetails, setFlightDetails] = useState<FlightData & { upper_deck: DeckDetails; lower_deck: DeckDetails }>(DUMMY_FLIGHT_ITEM)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const formFilterHooks = useForm<LeftFormFilter>({
    resolver: zodResolver(LoadPlanningLeftSection),
    defaultValues: {
      unplanned_search: '',
      unplanned_priority: '',
      planned_search: '',
      planned_priority: '',
      details_search: '',
      details_priority: '',
    },
  })

  const onSubmitFilters = useCallback((data: LeftFormFilter) => {
    console.log(data)
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const draggedId = event.active.id as string
    setActiveIds((prev) => selectedItems.has(draggedId) ? Array.from(selectedItems) : [draggedId])
    setSelectedItems((prev) => new Set(prev).add(draggedId))
  }, [selectedItems])

  const handleDragEnd = useCallback((event: { over: any; active: any }) => {
    const { over } = event
    if (over && over.id === 'droppable-aircraft') {
      const dataSource = awbTab === 'unplanned' ? availableOrders : plannedOrders
      const draggedOrders = activeIds
        .map((id) => dataSource.find((order: AWBData) => `${order.awb_number}` === id))
        .filter((order): order is AWBData => order !== undefined)
      
      const description = draggedOrders.length > 1 ? `${draggedOrders.length} Airway Bills` : `Airway Bill ${draggedOrders[0].awb_number}`
      const action = awbTab === 'planned' ? 'Move' : 'Load'
      const origin = awbTab === 'planned' ? 'from Flight SQ4321 ' : ''
      setModalDetails({
        title: `${action} Airway Bills`,
        description: `You are about to ${action} ${description} ${origin}to this flight.`
      })
      setConfirmationModal(true)
    }
  }, [awbTab, availableOrders, plannedOrders, activeIds])

  const handleDragCancel = useCallback(() => {
    setActiveIds([])
  }, [])

  const handleSort = useCallback((id: string, items: AWBData[]) => {
    setDroppedItems((prev) => ({ ...prev, [id]: items }))
  }, [])

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

  const handleModalAction = useCallback(() => {
    if (modalDetails.title === 'Remove Airway Bill') return;

    const dataSource = awbTab === 'unplanned' ? availableOrders : plannedOrders
    const draggedOrders = activeIds
      .map((id) => dataSource.find((order: AWBData) => `${order.awb_number}` === id))
      .filter((order): order is AWBData => order !== undefined)

    setDroppedItems((prev) => {
      const newItems = { ...prev }
      Object.keys(newItems).forEach((container) => {
        newItems[container] = newItems[container].filter(
          (item) => !activeIds.includes(`${item.awb_number}`)
        )
      })
      newItems['droppable-aircraft'] = [...(newItems['droppable-aircraft'] || []), ...draggedOrders]
      return newItems
    })

    const totalDraggedWeight = draggedOrders.reduce((sum, order) => sum + parseFloat(order.weight), 0)
    setFlightDetails((prevFlightDetails) => {
      const currentCapacity = parseFloat(prevFlightDetails.current_capacity) + totalDraggedWeight
      const decks = currentCapacity > parseFloat(prevFlightDetails.lower_deck.maximum_capacity)
        ? {
            lower_deck: { ...prevFlightDetails.lower_deck, current_capacity: prevFlightDetails.lower_deck.maximum_capacity },
            upper_deck: { ...prevFlightDetails.upper_deck, current_capacity: (currentCapacity - parseFloat(prevFlightDetails.lower_deck.maximum_capacity)).toString() }
          }
        : {
            lower_deck: { ...prevFlightDetails.lower_deck, current_capacity: currentCapacity.toString() },
            upper_deck: { ...prevFlightDetails.upper_deck }
          }

      return {
        ...prevFlightDetails,
        current_capacity: currentCapacity.toString(),
        ...decks
      }
    })

    if (awbTab === 'unplanned') {
      setAvailableOrders((prev) => prev.filter((order) => !activeIds.includes(`${order.awb_number}`)))
    } else {
      setPlannedOrders((prev) => prev.filter((order) => !activeIds.includes(`${order.awb_number}`)))
    }

    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev)
      activeIds.forEach((id) => newSelectedItems.delete(id))
      return newSelectedItems
    })

    setActiveIds([])
  }, [modalDetails.title, awbTab, availableOrders, plannedOrders, activeIds])

  const handleButtonAction = useCallback((id: string) => {
    const dataSource = awbTab === 'unplanned' ? availableOrders : DUMMY_PLANNED_AWB_DATA;
    const selectedOrder = dataSource.find((order: AWBData) => `${order.awb_number}` === id);

    if (selectedOrder) {
      setActiveIds([id]);
      setSelectedItems(new Set([id]));

      const description = `Airway Bill ${selectedOrder.awb_number}`;
      const action = awbTab === 'planned' ? 'Move' : 'Load';
      const origin = awbTab === 'planned' ? 'from Flight SQ4321 ' : '';

      setModalDetails({
        title: `${action} Airway Bill`,
        description: `You are about to ${action} ${description} ${origin}to this flight.`
      });
      setConfirmationModal(true);
    }
  }, [awbTab, availableOrders]);

  useEffect(() => {
    console.log('LoadPlanningDetailsProvider mounted');
  }, []);

  const contextValue = useMemo<LoadPlanningDetailsContextType>(() => ({
    formFilterHooks,
    onSubmitFilters,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleSort,
    availableOrders,
    plannedOrders,
    droppedItems,
    handleSelectChange,
    selectedItems,
    flightDetails,
    setFlightDetails,
    awbTab,
    setAwbTab,
    handleButtonAction,
    setConfirmationModal,
    setModalDetails,
  }), [formFilterHooks, onSubmitFilters, handleDragStart, handleDragEnd, handleDragCancel, handleSort, availableOrders, plannedOrders, droppedItems, handleSelectChange, selectedItems, flightDetails, awbTab, handleButtonAction]);

  return (
    <>
      <LoadPlanningDetailsContext.Provider value={contextValue}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {children}
          <DragOverlay>
            {activeIds.length > 0 && (
              <div className="rounded-md bg-secondary p-2 w-fit">
                <span className="font-bold text-sm">
                  {activeIds.length} items selected
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </LoadPlanningDetailsContext.Provider>
      <AlertDialog open={confirmationModal} onOpenChange={setConfirmationModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{modalDetails.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {modalDetails.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleModalAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};