import { WHAppTrafficReportType } from "@/components/reports/Standard/WhAppTrafficReport/columns"

export const DUMMY_DATA: WHAppTrafficReportType[] = [
  {
    date: "2024-06-01",
    time: "08:00",
    vehicle_number: "AB123CD",
    driver_name: "John Doe",
    entry_time: "08:00",
    exit_time: "10:00",
    duration: "2h",
    cargo_type: "Electronics",
    cargo_weight: "500kg",
    origin: "Station A",
    destination: "Station B",
    status: "Completed",
    station: "Station A",
    updated_on: "2024-06-01 10:05",
  },
  {
    date: "2024-06-01",
    time: "09:00",
    vehicle_number: "EF456GH",
    driver_name: "Jane Smith",
    entry_time: "09:00",
    exit_time: "11:00",
    duration: "2h",
    cargo_type: "Furniture",
    cargo_weight: "800kg",
    origin: "Station C",
    destination: "Station D",
    status: "Completed",
    station: "Station C",
    updated_on: "2024-06-01 11:05",
  },
  {
    date: "2024-06-01",
    time: "10:00",
    vehicle_number: "IJ789KL",
    driver_name: "Mike Johnson",
    entry_time: "10:00",
    exit_time: "12:00",
    duration: "2h",
    cargo_type: "Food",
    cargo_weight: "1000kg",
    origin: "Station E",
    destination: "Station F",
    status: "Completed",
    station: "Station E",
    updated_on: "2024-06-01 12:05",
  },
  {
    date: "2024-06-01",
    time: "11:00",
    vehicle_number: "MN012OP",
    driver_name: "Emma Brown",
    entry_time: "11:00",
    exit_time: "13:00",
    duration: "2h",
    cargo_type: "Textiles",
    cargo_weight: "600kg",
    origin: "Station G",
    destination: "Station H",
    status: "Completed",
    station: "Station G",
    updated_on: "2024-06-01 13:05",
  },
  {
    date: "2024-06-01",
    time: "12:00",
    vehicle_number: "QR345ST",
    driver_name: "Chris Green",
    entry_time: "12:00",
    exit_time: "14:00",
    duration: "2h",
    cargo_type: "Machinery",
    cargo_weight: "1200kg",
    origin: "Station I",
    destination: "Station J",
    status: "Completed",
    station: "Station I",
    updated_on: "2024-06-01 14:05",
  },
  {
    date: "2024-06-01",
    time: "13:00",
    vehicle_number: "UV678WX",
    driver_name: "Alice White",
    entry_time: "13:00",
    exit_time: "15:00",
    duration: "2h",
    cargo_type: "Chemicals",
    cargo_weight: "700kg",
    origin: "Station K",
    destination: "Station L",
    status: "Completed",
    station: "Station K",
    updated_on: "2024-06-01 15:05",
  },
  {
    date: "2024-06-01",
    time: "14:00",
    vehicle_number: "YZ901AB",
    driver_name: "Bob Black",
    entry_time: "14:00",
    exit_time: "16:00",
    duration: "2h",
    cargo_type: "Pharmaceuticals",
    cargo_weight: "500kg",
    origin: "Station M",
    destination: "Station N",
    status: "Completed",
    station: "Station M",
    updated_on: "2024-06-01 16:05",
  },
  {
    date: "2024-06-01",
    time: "15:00",
    vehicle_number: "CD234EF",
    driver_name: "Carol Grey",
    entry_time: "15:00",
    exit_time: "17:00",
    duration: "2h",
    cargo_type: "Automotive Parts",
    cargo_weight: "900kg",
    origin: "Station O",
    destination: "Station P",
    status: "Completed",
    station: "Station O",
    updated_on: "2024-06-01 17:05",
  },
  {
    date: "2024-06-01",
    time: "16:00",
    vehicle_number: "GH567IJ",
    driver_name: "Dave Blue",
    entry_time: "16:00",
    exit_time: "18:00",
    duration: "2h",
    cargo_type: "Garments",
    cargo_weight: "700kg",
    origin: "Station Q",
    destination: "Station R",
    status: "Completed",
    station: "Station Q",
    updated_on: "2024-06-01 18:05",
  },
  {
    date: "2024-06-01",
    time: "17:00",
    vehicle_number: "KL890MN",
    driver_name: "Eve Pink",
    entry_time: "17:00",
    exit_time: "19:00",
    duration: "2h",
    cargo_type: "Books",
    cargo_weight: "300kg",
    origin: "Station S",
    destination: "Station T",
    status: "Completed",
    station: "Station S",
    updated_on: "2024-06-01 19:05",
  },
]

export async function getData() {
  return DUMMY_DATA
}
