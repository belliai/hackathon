"use client";

import DataTableFilterForm, { FormFieldOption } from "@/components/data-table/data-table-filter-form";
import { AWBDetailReportType } from "./column";

export type FilterDataType = Partial<AWBDetailReportType> & {
  from_date?: string;
  to_date?: string;
  payment_type?: string;
  controlling_location_code?: string;
  level?: string;
  level_code?: string;
  awb_status?: string;
  based_on?: string;
};

export const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "agent_code",
    type: "text",
    label: "Agent Code",
    placeholder: "",
  },
  {
    key: "payment_type",
    type: "select",
    label: "Payment Type",
    selectOptions: [
      { value: "all", label: "All" },
      { value: "PX", label: "PX" },
      { value: "PP", label: "PP" },
      { value: "CC", label: "CC" },
      { value: "CX", label: "CX" },
      { value: "FOC", label: "FOC" },
    ],
    placeholder: "Select Payment Type",
  },
  {
    key: "controlling_location_code",
    type: "select",
    label: "Controlling Location Code",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
    placeholder: "Select Option",
  },
  {
    key: "level",
    type: "select",
    label: "Level",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Airport", label: "Airport" },
      { value: "Region", label: "Region" },
      { value: "Country", label: "Country" },
    ],
    placeholder: "Select Level",
  },
  {
    key: "level_code",
    type: "select",
    label: "Level Code",
    selectOptions: [
      { label: 'ATL', value: 'ATL' },
      { label: 'PEK', value: 'PEK' },
      { label: 'LAX', value: 'LAX' },
      { label: 'HND', value: 'HND' },
      { label: 'DXB', value: 'DXB' },
      { label: 'ORD', value: 'ORD' },
      { label: 'LHR', value: 'LHR' },
      { label: 'HKG', value: 'HKG' },
      { label: 'PVG', value: 'PVG' },
      { label: 'CDG', value: 'CDG' },
      { label: 'DFW', value: 'DFW' },
      { label: 'CAN', value: 'CAN' },
      { label: 'IST', value: 'IST' },
      { label: 'AMS', value: 'AMS' },
      { label: 'FRA', value: 'FRA' },
      { label: 'ICN', value: 'ICN' },
      { label: 'SIN', value: 'SIN' },
      { label: 'DEN', value: 'DEN' },
      { label: 'BKK', value: 'BKK' },
      { label: 'JFK', value: 'JFK' },
    ],
    placeholder: "Select Level Code",
  },
  {
    key: "awb_status",
    type: "select",
    label: "AWB Status",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Booked", label: "Booked" },
      { value: "Executed", label: "Executed" },
      { value: "Accepted", label: "Accepted" },
      { value: "Reopened", label: "Reopened" },
      { value: "Voided", label: "Voided" },
      { value: "Departed", label: "Departed" },
      { value: "Arrived", label: "Arrived" },
      { value: "Delivered", label: "Delivered" },
    ],
    placeholder: "Select AWB Status",
  },
  {
    key: "based_on",
    type: "select",
    label: "Based On",
    selectOptions: [
      { value: "booking-date", label: "Booking Date" },
      { value: "execution-date", label: "Execution Date" },
      { value: "acceptance-date", label: "Acceptance Date" },
      { value: "flight-date", label: "Flight Date" },
    ],
    placeholder: "Select Based On",
  },
  {
    key: "from_date",
    type: "date",
    label: "From Date",
    placeholder: "Select From Date",
  },
  {
    key: "to_date",
    type: "date",
    label: "To Date",
    placeholder: "Select To Date",
  },
];
