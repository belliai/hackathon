import { ExportInventoryType } from "@/components/operation/Export/ExportInventory/columns";

export const DUMMY_DATA: ExportInventoryType[] = [
  {
    warehouse_id: "WH001",
    cargo_id: "CARGO001",
    description: "Electronics",
    quantity: "100",
    weight: "1000kg",
    volume: "10m³",
    location: "A1",
    arrival_date: "2024-06-01",
    status: "Stored",
    owner: "Company A"
  },
  {
    warehouse_id: "WH002",
    cargo_id: "CARGO002",
    description: "Clothing",
    quantity: "200",
    weight: "500kg",
    volume: "5m³",
    location: "B2",
    arrival_date: "2024-06-02",
    status: "Stored",
    owner: "Company B"
  },
  {
    warehouse_id: "WH003",
    cargo_id: "CARGO003",
    description: "Furniture",
    quantity: "50",
    weight: "700kg",
    volume: "7m³",
    location: "C3",
    arrival_date: "2024-06-03",
    status: "Stored",
    owner: "Company C"
  },
  {
    warehouse_id: "WH004",
    cargo_id: "CARGO004",
    description: "Toys",
    quantity: "300",
    weight: "300kg",
    volume: "3m³",
    location: "D4",
    arrival_date: "2024-06-04",
    status: "Pending",
    owner: "Company D"
  },
  {
    warehouse_id: "WH005",
    cargo_id: "CARGO005",
    description: "Books",
    quantity: "150",
    weight: "400kg",
    volume: "4m³",
    location: "E5",
    arrival_date: "2024-06-05",
    status: "Stored",
    owner: "Company E"
  },
  {
    warehouse_id: "WH006",
    cargo_id: "CARGO006",
    description: "Machinery",
    quantity: "20",
    weight: "2000kg",
    volume: "20m³",
    location: "F6",
    arrival_date: "2024-06-06",
    status: "Stored",
    owner: "Company F"
  },
  {
    warehouse_id: "WH007",
    cargo_id: "CARGO007",
    description: "Food Products",
    quantity: "500",
    weight: "600kg",
    volume: "6m³",
    location: "G7",
    arrival_date: "2024-06-07",
    status: "Stored",
    owner: "Company G"
  },
  {
    warehouse_id: "WH008",
    cargo_id: "CARGO008",
    description: "Medical Supplies",
    quantity: "75",
    weight: "350kg",
    volume: "3.5m³",
    location: "H8",
    arrival_date: "2024-06-08",
    status: "Stored",
    owner: "Company H"
  },
  {
    warehouse_id: "WH009",
    cargo_id: "CARGO009",
    description: "Chemicals",
    quantity: "40",
    weight: "800kg",
    volume: "8m³",
    location: "I9",
    arrival_date: "2024-06-09",
    status: "Pending",
    owner: "Company I"
  },
  {
    warehouse_id: "WH010",
    cargo_id: "CARGO010",
    description: "Construction Materials",
    quantity: "25",
    weight: "1200kg",
    volume: "12m³",
    location: "J10",
    arrival_date: "2024-06-10",
    status: "Stored",
    owner: "Company J"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
