import { TransferListType } from "@/components/operation/Transfer/List/columns";

export const DUMMY_DATA: TransferListType[] = [
  {
    manifest_id: "MANIFEST001",
    transfer_date: "2024-06-01",
    origin: "Warehouse A",
    destination: "Warehouse B",
    shipper: "Company A",
    consignee: "Company X",
    cargo_id: "CARGO001",
    quantity: "100",
    weight: "1000kg",
    volume: "10m³",
    handling_info: "Handle with care",
    special_instructions: "Do not stack",
    status: "In Transit"
  },
  {
    manifest_id: "MANIFEST002",
    transfer_date: "2024-06-02",
    origin: "Warehouse C",
    destination: "Warehouse D",
    shipper: "Company B",
    consignee: "Company Y",
    cargo_id: "CARGO002",
    quantity: "200",
    weight: "2000kg",
    volume: "20m³",
    handling_info: "Fragile",
    special_instructions: "Keep upright",
    status: "Pending"
  },
  {
    manifest_id: "MANIFEST003",
    transfer_date: "2024-06-03",
    origin: "Warehouse E",
    destination: "Warehouse F",
    shipper: "Company C",
    consignee: "Company Z",
    cargo_id: "CARGO003",
    quantity: "150",
    weight: "1500kg",
    volume: "15m³",
    handling_info: "Temperature controlled",
    special_instructions: "Store below 25°C",
    status: "Completed"
  },
  {
    manifest_id: "MANIFEST004",
    transfer_date: "2024-06-04",
    origin: "Warehouse G",
    destination: "Warehouse H",
    shipper: "Company D",
    consignee: "Company W",
    cargo_id: "CARGO004",
    quantity: "50",
    weight: "500kg",
    volume: "5m³",
    handling_info: "Keep dry",
    special_instructions: "Avoid direct sunlight",
    status: "In Transit"
  },
  {
    manifest_id: "MANIFEST005",
    transfer_date: "2024-06-05",
    origin: "Warehouse I",
    destination: "Warehouse J",
    shipper: "Company E",
    consignee: "Company V",
    cargo_id: "CARGO005",
    quantity: "75",
    weight: "750kg",
    volume: "7.5m³",
    handling_info: "Handle with gloves",
    special_instructions: "Store in a cool place",
    status: "Pending"
  }
];


export async function getData() {
  return DUMMY_DATA;
}
