import { OffloadReportType } from "@/components/reports/operation/Offload/columns";

export const DUMMY_DATA: OffloadReportType[] = [
  {
    axb_number: "AXB12345",
    origin: "JFK",
    destination: "LAX",
    booked_pcs: "100",
    booked_wt: "1000 kg",
    charged_wt: "950 kg",
    offload_pcs: "10",
    offload_wt: "100 kg",
    reason: "Overweight",
    offloaded_flight: "FL123",
    offloaded_by: "Agent1",
    offloaded_at: "2023-05-01 10:00"
  },
  {
    axb_number: "AXB12346",
    origin: "ORD",
    destination: "DFW",
    booked_pcs: "200",
    booked_wt: "2000 kg",
    charged_wt: "1950 kg",
    offload_pcs: "20",
    offload_wt: "200 kg",
    reason: "Security",
    offloaded_flight: "FL124",
    offloaded_by: "Agent2",
    offloaded_at: "2023-05-02 12:00"
  },
  {
    axb_number: "AXB12347",
    origin: "LAX",
    destination: "JFK",
    booked_pcs: "150",
    booked_wt: "1500 kg",
    charged_wt: "1450 kg",
    offload_pcs: "15",
    offload_wt: "150 kg",
    reason: "Damage",
    offloaded_flight: "FL125",
    offloaded_by: "Agent3",
    offloaded_at: "2023-05-03 14:00"
  },
  {
    axb_number: "AXB12348",
    origin: "MIA",
    destination: "ATL",
    booked_pcs: "120",
    booked_wt: "1200 kg",
    charged_wt: "1150 kg",
    offload_pcs: "12",
    offload_wt: "120 kg",
    reason: "Mislabeling",
    offloaded_flight: "FL126",
    offloaded_by: "Agent4",
    offloaded_at: "2023-05-04 16:00"
  },
  {
    axb_number: "AXB12349",
    origin: "SEA",
    destination: "DEN",
    booked_pcs: "180",
    booked_wt: "1800 kg",
    charged_wt: "1750 kg",
    offload_pcs: "18",
    offload_wt: "180 kg",
    reason: "Late Arrival",
    offloaded_flight: "FL127",
    offloaded_by: "Agent5",
    offloaded_at: "2023-05-05 18:00"
  },
  {
    axb_number: "AXB12350",
    origin: "SFO",
    destination: "BOS",
    booked_pcs: "140",
    booked_wt: "1400 kg",
    charged_wt: "1350 kg",
    offload_pcs: "14",
    offload_wt: "140 kg",
    reason: "Customs Issue",
    offloaded_flight: "FL128",
    offloaded_by: "Agent6",
    offloaded_at: "2023-05-06 20:00"
  },
  {
    axb_number: "AXB12351",
    origin: "LAX",
    destination: "ORD",
    booked_pcs: "160",
    booked_wt: "1600 kg",
    charged_wt: "1550 kg",
    offload_pcs: "16",
    offload_wt: "160 kg",
    reason: "Technical Issue",
    offloaded_flight: "FL129",
    offloaded_by: "Agent7",
    offloaded_at: "2023-05-07 22:00"
  },
  {
    axb_number: "AXB12352",
    origin: "JFK",
    destination: "SFO",
    booked_pcs: "130",
    booked_wt: "1300 kg",
    charged_wt: "1250 kg",
    offload_pcs: "13",
    offload_wt: "130 kg",
    reason: "Operational Constraints",
    offloaded_flight: "FL130",
    offloaded_by: "Agent8",
    offloaded_at: "2023-05-08 10:00"
  },
  {
    axb_number: "AXB12353",
    origin: "DFW",
    destination: "MIA",
    booked_pcs: "170",
    booked_wt: "1700 kg",
    charged_wt: "1650 kg",
    offload_pcs: "17",
    offload_wt: "170 kg",
    reason: "Overbooking",
    offloaded_flight: "FL131",
    offloaded_by: "Agent9",
    offloaded_at: "2023-05-09 12:00"
  },
  {
    axb_number: "AXB12354",
    origin: "ATL",
    destination: "SEA",
    booked_pcs: "190",
    booked_wt: "1900 kg",
    charged_wt: "1850 kg",
    offload_pcs: "19",
    offload_wt: "190 kg",
    reason: "Weather Delay",
    offloaded_flight: "FL132",
    offloaded_by: "Agent10",
    offloaded_at: "2023-05-10 14:00"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
