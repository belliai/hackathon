import { NotocDetailType } from "@/components/operation/Export/NotocDetail/columns";

export const DUMMY_DATA: NotocDetailType[] = [
  {
    item_no: "001",
    description: "Lithium Batteries",
    quantity: "50",
    weight: "500kg",
    volume: "5m³",
    location: "Cargo Hold A",
    handling_info: "Handle with care",
    special_instructions: "Do not stack",
    hazard_class: "9",
    un_number: "UN3480"
  },
  {
    item_no: "002",
    description: "Flammable Liquids",
    quantity: "100",
    weight: "1000kg",
    volume: "10m³",
    location: "Cargo Hold B",
    handling_info: "Keep away from heat",
    special_instructions: "Ventilated storage",
    hazard_class: "3",
    un_number: "UN1263"
  },
  {
    item_no: "003",
    description: "Compressed Gas",
    quantity: "20",
    weight: "200kg",
    volume: "2m³",
    location: "Cargo Hold C",
    handling_info: "Secure cylinders",
    special_instructions: "Avoid direct sunlight",
    hazard_class: "2.1",
    un_number: "UN1950"
  },
  {
    item_no: "004",
    description: "Corrosive Substances",
    quantity: "30",
    weight: "300kg",
    volume: "3m³",
    location: "Cargo Hold D",
    handling_info: "Wear protective gear",
    special_instructions: "Separate from food",
    hazard_class: "8",
    un_number: "UN1760"
  },
  {
    item_no: "005",
    description: "Toxic Materials",
    quantity: "10",
    weight: "100kg",
    volume: "1m³",
    location: "Cargo Hold E",
    handling_info: "Use fume hood",
    special_instructions: "Emergency shower nearby",
    hazard_class: "6.1",
    un_number: "UN2810"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
