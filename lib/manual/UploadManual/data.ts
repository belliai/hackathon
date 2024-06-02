import { UploadManualType } from "@/components/manual/UploadManual/columns";

export const DUMMY_DATA: UploadManualType[] = [
  {
    module_name: "Billing",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Customer Service",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Order Processing",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Inventory Management",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Shipping",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Returns",
    date_time: "31 Mei 2024 14:30:00"
  },
  {
    module_name: "Reports",
    date_time: "31 Mei 2024 14:30:00"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
