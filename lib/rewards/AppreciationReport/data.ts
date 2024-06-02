import { AppreciationReportType } from "@/components/rewards/AppreciationReport/columns";

export const DUMMY_DATA: AppreciationReportType[] = [
  {
    employee_name: "Jane Smith",
    location: "Phoenix",
    clap_count: "85",
    given_by: "Manager B",
    email_id: "jane@example.com",
    date: "31 Mei 2024",
    remarks: "Outstanding work!"
  },
  {
    employee_name: "Alice Johnson",
    location: "New York",
    clap_count: "27",
    given_by: "Manager D",
    email_id: "alice@example.com",
    date: "31 Mei 2024",
    remarks: "Well done!"
  },
  {
    employee_name: "Bob Brown",
    location: "Chicago",
    clap_count: "65",
    given_by: "Manager E",
    email_id: "bob@example.com",
    date: "31 Mei 2024",
    remarks: "Great job!"
  },
  {
    employee_name: "Charlie Davis",
    location: "Houston",
    clap_count: "42",
    given_by: "Manager A",
    email_id: "charlie@example.com",
    date: "31 Mei 2024",
    remarks: "Keep it up!"
  },
  {
    employee_name: "John Doe",
    location: "Los Angeles",
    clap_count: "78",
    given_by: "Manager C",
    email_id: "john@example.com",
    date: "31 Mei 2024",
    remarks: "Excellent performance!"
  },
  {
    employee_name: "Jane Smith",
    location: "New York",
    clap_count: "55",
    given_by: "Manager B",
    email_id: "jane@example.com",
    date: "31 Mei 2024",
    remarks: "Well done!"
  },
  {
    employee_name: "Alice Johnson",
    location: "Chicago",
    clap_count: "91",
    given_by: "Manager E",
    email_id: "alice@example.com",
    date: "31 Mei 2024",
    remarks: "Outstanding work!"
  },
  {
    employee_name: "Bob Brown",
    location: "Houston",
    clap_count: "34",
    given_by: "Manager A",
    email_id: "bob@example.com",
    date: "31 Mei 2024",
    remarks: "Great job!"
  },
  {
    employee_name: "Charlie Davis",
    location: "Los Angeles",
    clap_count: "48",
    given_by: "Manager C",
    email_id: "charlie@example.com",
    date: "31 Mei 2024",
    remarks: "Excellent performance!"
  },
  {
    employee_name: "John Doe",
    location: "Phoenix",
    clap_count: "19",
    given_by: "Manager D",
    email_id: "john@example.com",
    date: "31 Mei 2024",
    remarks: "Keep it up!"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
