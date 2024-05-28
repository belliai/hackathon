import { EpouchReportType } from "@/components/reports/operation/EpouchReport/columns";

export const DUMMY_DATA: EpouchReportType[] = [
  {
    awb_number: "AWB12345601",
    agent_code: "AG001",
    agent_name: "Agent One",
    airport_type: "Airport",
    origin: "JFK",
    destination: "LAX",
    doc: "Invoice"
  },
  {
    awb_number: "AWB12345602",
    agent_code: "AG002",
    agent_name: "Agent Two",
    airport_type: "Warehouse",
    origin: "ORD",
    destination: "DFW",
    doc: "Packing List"
  },
  {
    awb_number: "AWB12345603",
    agent_code: "AG003",
    agent_name: "Agent Three",
    airport_type: "Airport",
    origin: "LAX",
    destination: "JFK",
    doc: "Proof of Delivery"
  },
  {
    awb_number: "AWB12345604",
    agent_code: "AG004",
    agent_name: "Agent Four",
    airport_type: "Warehouse",
    origin: "MIA",
    destination: "ATL",
    doc: "Manifest"
  },
  {
    awb_number: "AWB12345605",
    agent_code: "AG005",
    agent_name: "Agent Five",
    airport_type: "Airport",
    origin: "SEA",
    destination: "DEN",
    doc: "AWB"
  },
  {
    awb_number: "AWB12345606",
    agent_code: "AG006",
    agent_name: "Agent Six",
    airport_type: "Warehouse",
    origin: "SFO",
    destination: "BOS",
    doc: "Scanned DO"
  },
  {
    awb_number: "AWB12345607",
    agent_code: "AG007",
    agent_name: "Agent Seven",
    airport_type: "Airport",
    origin: "LAS",
    destination: "PHX",
    doc: "DG_Non DG Declaration"
  },
  {
    awb_number: "AWB12345608",
    agent_code: "AG008",
    agent_name: "Agent Eight",
    airport_type: "Warehouse",
    origin: "DTW",
    destination: "MSP",
    doc: "Permit Form"
  },
  {
    awb_number: "AWB12345609",
    agent_code: "AG009",
    agent_name: "Agent Nine",
    airport_type: "Airport",
    origin: "CLT",
    destination: "MCO",
    doc: "Customer Invoice Copy Delivery"
  },
  {
    awb_number: "AWB12345610",
    agent_code: "AG010",
    agent_name: "Agent Ten",
    airport_type: "Warehouse",
    origin: "IAD",
    destination: "EWR",
    doc: "Additional"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
