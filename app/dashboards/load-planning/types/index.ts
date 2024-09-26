import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { DragStartEvent } from "@dnd-kit/core";
import { LeftFormFilter } from './schemas';

export interface LoadPlanningContextType {
  formFilterHooks: any;
  onSubmitFilters: () => {};
}

export interface LoadPlanningProviderProps {
  children: ReactNode;
}

type DroppedItemsType = {
  [key: string]: AWBData[];
};

export type DeckDetails = {
  maximum_capacity: string;
  current_capacity: string;
};

export interface LoadPlanningDetailsContextType {
  formFilterHooks: UseFormReturn<LeftFormFilter>;
  onSubmitFilters: (data: LeftFormFilter) => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: { over: any; active: any }) => void;
  handleDragCancel: () => void;
  handleSort: (id: string, items: AWBData[]) => void;
  availableOrders: AWBData[];
  plannedOrders: AWBData[];
  droppedItems: Record<string, AWBData[]>;
  handleSelectChange: (id: string) => void;
  selectedItems: Set<string>;
  flightDetails: FlightData & { upper_deck: DeckDetails; lower_deck: DeckDetails };
  setFlightDetails: React.Dispatch<React.SetStateAction<FlightData & { upper_deck: DeckDetails; lower_deck: DeckDetails }>>;
  awbTab: string;
  setAwbTab: React.Dispatch<React.SetStateAction<string>>;
  handleButtonAction: (id: string) => void;
  setConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalDetails: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
}

export interface LoadPlanningDetailsProviderProps {
  children: ReactNode;
}

export type ULD = {
  id: string;
  current_capacity: string;
};

export type FlightData = {
  id: string;
  flight_code: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  aircraft: string;
  tail_number: string;
  status: string;
  maximum_capacity: string;
  unit: string;
  current_capacity: string;
  uld: ULD[];
};

export type AWBData = {
  id: string;
  awb_number: string;
  weight: string;
  unit: string;
  consignor: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  booking_type: 'MAWB' | 'HAWB';
};
