import { Company } from "@/types/partner/company"
import { Person } from "@/types/partner/person"

export const DUMMY_COMPANIES_DATA: Company[] = [
  {
    id: "1",
    company_code: "FWD123",
    company_name: "Global Freight Forwarders",
    people_count: 250,
    type: "forwarder",
    address: "123 Logistics Avenue, New York, NY, 10001",
  },
  {
    id: "2",
    company_code: "CNS456",
    company_name: "Acme Consignors Inc.",
    people_count: 150,
    type: "consignor",
    address: "456 Commerce Street, San Francisco, CA, 94103",
  },
  {
    id: "3",
    company_code: "CNE789",
    company_name: "Worldwide Consignees Ltd.",
    people_count: 100,
    type: "consignee",
    address: "789 Trade Road, Miami, FL, 33101",
  },
  {
    id: "4",
    company_code: "FWD321",
    company_name: "Speedy Forwarding Services",
    people_count: 300,
    type: "forwarder",
    address: "321 Transport Lane, Chicago, IL, 60604",
  },
  {
    id: "5",
    company_code: "CNS654",
    company_name: "Express Consignors Co.",
    people_count: 200,
    type: "consignor",
    address: "654 Cargo Boulevard, Dallas, TX, 75201",
  },
]

export const PEOPLE_DUMMY_DATA: Person[] = [
  {
    id: "1",
    name: "John Doe",
    company: {
      id: "1",
      name: "Global Freight Forwarders",
    },
    jobTitle: "Logistics Manager",
    email: "john.doe@globalfreight.com",
    phone: "555-1234",
  },
  {
    id: "2",
    name: "Jane Smith",
    company: {
      id: "2",
      name: "Acme Consignors Inc.",
    },
    jobTitle: "Consignment Specialist",
    email: "jane.smith@acmeconsignors.com",
    phone: "555-5678",
  },
  {
    id: "3",
    name: "Robert Johnson",
    company: {
      id: "3",
      name: "Worldwide Consignees Ltd.",
    },
    jobTitle: "Receiving Supervisor",
    email: "robert.johnson@worldwideconsignees.com",
    phone: "555-9101",
  },
  {
    id: "4",
    name: "Emily Davis",
    company: {
      id: "4",
      name: "Speedy Forwarding Services",
    },
    jobTitle: "Operations Coordinator",
    email: "emily.davis@speedyforwarding.com",
    phone: "555-1122",
  },
  {
    id: "5",
    name: "Michael Brown",
    company: {
      id: "5",
      name: "Express Consignors Co.",
    },
    jobTitle: "Shipping Manager",
    email: "michael.brown@expressconsignors.com",
    phone: "555-3344",
  },
  {
    id: "6",
    name: "Lisa Wilson",
    company: {
      id: "1",
      name: "Global Freight Forwarders",
    },
    jobTitle: "Freight Coordinator",
    email: "lisa.wilson@globalfreight.com",
    phone: "555-5566",
  },
  {
    id: "7",
    name: "James Taylor",
    company: {
      id: "2",
      name: "Acme Consignors Inc.",
    },
    jobTitle: "Warehouse Manager",
    email: "james.taylor@acmeconsignors.com",
    phone: "555-7788",
  },
  {
    id: "8",
    name: "Patricia Martinez",
    company: {
      id: "3",
      name: "Worldwide Consignees Ltd.",
    },
    jobTitle: "Inventory Analyst",
    email: "patricia.martinez@worldwideconsignees.com",
    phone: "555-9900",
  },
]
