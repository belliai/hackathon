import { ConsigneeReconciliationType } from "@/components/reports/finance/ConsigneeReconciliation/columns";

export const DUMMY_DATA: ConsigneeReconciliationType[] = [
  {
    agent_code: "AGENT001",
    agent_name: "Agent One",
    execution_date: "2023-05-10",
    payment_type: "Credit",
    transaction_details: "Shipment to NY",
    awb_number: "AWB12345678",
    debit: "500.00",
    credit: "0.00",
    balance: "500.00",
    awb_status: "Delivered",
    transaction_date: "2023-05-10",
    remarks: "On time"
  },
  {
    agent_code: "AGENT002",
    agent_name: "Agent Two",
    execution_date: "2023-05-11",
    payment_type: "Debit",
    transaction_details: "Shipment to LA",
    awb_number: "AWB87654321",
    debit: "0.00",
    credit: "300.00",
    balance: "200.00",
    awb_status: "In Transit",
    transaction_date: "2023-05-11",
    remarks: "Delayed"
  },
  {
    agent_code: "AGENT003",
    agent_name: "Agent Three",
    execution_date: "2023-05-12",
    payment_type: "Credit",
    transaction_details: "Shipment to Chicago",
    awb_number: "AWB12348765",
    debit: "700.00",
    credit: "0.00",
    balance: "700.00",
    awb_status: "Delivered",
    transaction_date: "2023-05-12",
    remarks: "On time"
  },
  {
    agent_code: "AGENT004",
    agent_name: "Agent Four",
    execution_date: "2023-05-13",
    payment_type: "Debit",
    transaction_details: "Shipment to Miami",
    awb_number: "AWB87651234",
    debit: "0.00",
    credit: "450.00",
    balance: "250.00",
    awb_status: "In Transit",
    transaction_date: "2023-05-13",
    remarks: "Delayed"
  },
  {
    agent_code: "AGENT005",
    agent_name: "Agent Five",
    execution_date: "2023-05-14",
    payment_type: "Credit",
    transaction_details: "Shipment to Houston",
    awb_number: "AWB12344321",
    debit: "800.00",
    credit: "0.00",
    balance: "800.00",
    awb_status: "Delivered",
    transaction_date: "2023-05-14",
    remarks: "On time"
  },
  {
    agent_code: "AGENT006",
    agent_name: "Agent Six",
    execution_date: "2023-05-15",
    payment_type: "Debit",
    transaction_details: "Shipment to San Francisco",
    awb_number: "AWB87657890",
    debit: "0.00",
    credit: "600.00",
    balance: "400.00",
    awb_status: "In Transit",
    transaction_date: "2023-05-15",
    remarks: "Delayed"
  },
  {
    agent_code: "AGENT007",
    agent_name: "Agent Seven",
    execution_date: "2023-05-16",
    payment_type: "Credit",
    transaction_details: "Shipment to Dallas",
    awb_number: "AWB12340987",
    debit: "900.00",
    credit: "0.00",
    balance: "900.00",
    awb_status: "Delivered",
    transaction_date: "2023-05-16",
    remarks: "On time"
  },
  {
    agent_code: "AGENT008",
    agent_name: "Agent Eight",
    execution_date: "2023-05-17",
    payment_type: "Debit",
    transaction_details: "Shipment to Seattle",
    awb_number: "AWB87659012",
    debit: "0.00",
    credit: "750.00",
    balance: "150.00",
    awb_status: "In Transit",
    transaction_date: "2023-05-17",
    remarks: "Delayed"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
