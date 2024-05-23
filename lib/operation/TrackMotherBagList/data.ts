import type { Order } from "@/components/operation/TrackMotherBagList/columns";

export const DUMMY_DATA: Order[] = [
  {
    mb_number: "DL1-24-0001010",
    truck_number: "TRK-1234",
    via_station: "EH4",
    assign_date: "2024-05-23",
    piece_per_mb: "1/1",
    axb: "775-2000721",
    origin: "DL1",
    destination: "B02",
    weight: "1.00",
    mwb: "775-20037485",
    status: "Pickup Airport Reached",
    created_at: "2024-05-23 10:00",
    updated_at: "2024-05-23 10:00"
  },
  {
    mb_number: "DL1-24-0001011",
    truck_number: "TRK-5678",
    via_station: "FQ6",
    assign_date: "2024-05-24",
    piece_per_mb: "1/2",
    axb: "775-2000722",
    origin: "DL1",
    destination: "B03",
    weight: "2.50",
    mwb: "775-20037486",
    status: "In Transit Mode",
    created_at: "2024-05-24 11:30",
    updated_at: "2024-05-24 11:30"
  },
  {
    mb_number: "DL1-24-0001012",
    truck_number: "TRK-9101",
    via_station: "UB8",
    assign_date: "2024-05-25",
    piece_per_mb: "1/3",
    axb: "775-2000723",
    origin: "DL1",
    destination: "B04",
    weight: "3.75",
    mwb: "775-20037487",
    status: "Mother Bag Generated",
    created_at: "2024-05-25 13:45",
    updated_at: "2024-05-25 13:45"
  },
  {
    mb_number: "DL1-24-0001013",
    truck_number: "TRK-2468",
    via_station: "AB7",
    assign_date: "2024-05-26",
    piece_per_mb: "1/4",
    axb: "775-2000724",
    origin: "DL1",
    destination: "B05",
    weight: "4.00",
    mwb: "775-20037488",
    status: "Destination Warehouse Reached",
    created_at: "2024-05-26 15:00",
    updated_at: "2024-05-26 15:00"
  },
  {
    mb_number: "DL1-24-0001014",
    truck_number: "TRK-1357",
    via_station: "RB0",
    assign_date: "2024-05-27",
    piece_per_mb: "1/5",
    axb: "775-2000725",
    origin: "DL1",
    destination: "B06",
    weight: "5.20",
    mwb: "775-20037489",
    status: "Warehouse to Airport",
    created_at: "2024-05-27 16:30",
    updated_at: "2024-05-27 16:30"
  },
  {
    mb_number: "DL1-24-0001015",
    truck_number: "TRK-2468",
    via_station: "ZM9",
    assign_date: "2024-05-28",
    piece_per_mb: "1/6",
    axb: "775-2000726",
    origin: "DL1",
    destination: "B07",
    weight: "6.35",
    mwb: "775-20037490",
    status: "Departed",
    created_at: "2024-05-28 17:45",
    updated_at: "2024-05-28 17:45"
  },
  {
    mb_number: "DL1-24-0001016",
    truck_number: "TRK-5791",
    via_station: "FG3",
    assign_date: "2024-05-29",
    piece_per_mb: "1/7",
    axb: "775-2000727",
    origin: "DL1",
    destination: "B08",
    weight: "7.50",
    mwb: "775-20037491",
    status: "Airport to Airport",
    created_at: "2024-05-29 19:00",
    updated_at: "2024-05-29 19:00"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
