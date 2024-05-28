import { UnbillerAwbType } from "@/components/reports/operation/UnbilledAwbReport/columns";

export const DUMMY_DATA: UnbillerAwbType[] = [
  {
    awb_number: '1234567890',
    date_shipped: '2024-05-01',
    shipper_name: 'ABC Company',
    consignee_name: 'XYZ Corporation',
    origin: 'New York',
    destination: 'Los Angeles',
    weight_kg: 50,
    dimensions: '100x50x30',
    service_type: 'Express',
    estimated_charge: 200,
  },
  {
    awb_number: '0987654321',
    date_shipped: '2024-05-05',
    shipper_name: 'DEF Corp',
    consignee_name: 'PQR Ltd',
    origin: 'London',
    destination: 'Tokyo',
    weight_kg: 30,
    dimensions: '80x40x20',
    service_type: 'Economy',
    estimated_charge: 150,
  },
  {
    awb_number: '1357924680',
    date_shipped: '2024-05-10',
    shipper_name: 'GHI Ltd',
    consignee_name: 'MNO Inc',
    origin: 'Sydney',
    destination: 'Shanghai',
    weight_kg: 70,
    dimensions: '120x60x40',
    service_type: 'Priority',
    estimated_charge: 300,
  },
  {
    awb_number: '2468013579',
    date_shipped: '2024-05-15',
    shipper_name: 'JKL Corporation',
    consignee_name: 'STU Enterprises',
    origin: 'Paris',
    destination: 'Dubai',
    weight_kg: 45,
    dimensions: '90x55x35',
    service_type: 'Standard',
    estimated_charge: 180,
  },
];

export async function getData() {
  return DUMMY_DATA;
}
