export const invoiceTypeList = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "agent",
    value: "Agent",
  },
  {
    key: "walkin",
    value: "Walkin",
  },
  {
    key: "destination",
    value: "Destination",
  },
  {
    key: "delivery",
    value: "Delivery",
  },
  {
    key: "interline",
    value: "Interline",
  },
  {
    key: "debitNote",
    value: "Debit Note",
  },
  {
    key: "creditNote",
    value: "Credit Note",
  },
  {
    key: "revisedInvoice",
    value: "Revised Invoice",
  },
  {
    key: "proforma",
    value: "Proforma",
  },
  {
    key: "charter",
    value: "Charter",
  },
]

export const invoiceStatusList = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "open",
    value: "Open",
  },
  {
    key: "close",
    value: "Close",
  },
  {
    key: "cancelled",
    value: "Cancelled",
  },
]

export const billTypeList = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "daily",
    value: "Daily",
  },
  {
    key: "fortnightly",
    value: "Fortnightly",
  },
  {
    key: "monthly",
    value: "Monthly",
  },
  {
    key: "weekly",
    value: "Weekly",
  },
]

export const countryList = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "CD",
    value: "Congo",
  },
  {
    key: "IN",
    value: "India",
  },
  {
    key: "ZM",
    value: "Zambia",
  },
  {
    key: "ZW",
    value: "Zimbabwe",
  },
]

export const originList = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "ah1",
    value: "AH1",
  },
  {
    key: "aip",
    value: "AIP",
  },
  {
    key: "ajl",
    value: "AJL",
  },
  {
    key: "ala",
    value: "ALA",
  },
  {
    key: "amd",
    value: "AMD",
  },
  {
    key: "ams",
    value: "AMS",
  },
  {
    key: "an1",
    value: "AN1",
  },
]

export const locations = [
  { key: "DMU", value: "Dmanpur" },
  { key: "JKT", value: "Jakarta" },
  { key: "NYC", value: "New York City" },
  { key: "LON", value: "London" },
  { key: "PAR", value: "Paris" },
  { key: "BER", value: "Berlin" },
  { key: "TOK", value: "Tokyo" },
  { key: "SYD", value: "Sydney" },
  { key: "TOR", value: "Toronto" },
  { key: "MUM", value: "Mumbai" },
]

export const dummyData = [
  {
    referenceNo: "REF001",
    invoiceNo: "INV001",
    invoiceDate: "2024-01-01",
    supplierOrigin: "Supplier A",
    freight: 1000,
    ocdc: 50,
    agentName: "Agent X",
    flightNo: "FL001",
    flightDate: "2024-01-02",
    origin: "NYC",
    destination: "LAX",
    currency: "USD",
    status: "Completed",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-03",
    action: "View",
  },
  {
    referenceNo: "REF002",
    invoiceNo: "INV002",
    invoiceDate: "2024-01-02",
    supplierOrigin: "Supplier B",
    freight: 1200,
    ocdc: 60,
    agentName: "Agent Y",
    flightNo: "FL002",
    flightDate: "2024-01-03",
    origin: "SFO",
    destination: "ORD",
    currency: "USD",
    status: "Pending",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-04",
    action: "View",
  },
  {
    referenceNo: "REF003",
    invoiceNo: "INV003",
    invoiceDate: "2024-01-03",
    supplierOrigin: "Supplier C",
    freight: 1400,
    ocdc: 70,
    agentName: "Agent Z",
    flightNo: "FL003",
    flightDate: "2024-01-04",
    origin: "LAX",
    destination: "MIA",
    currency: "USD",
    status: "In Progress",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-05",
    action: "View",
  },
  {
    referenceNo: "REF004",
    invoiceNo: "INV004",
    invoiceDate: "2024-01-04",
    supplierOrigin: "Supplier D",
    freight: 1600,
    ocdc: 80,
    agentName: "Agent W",
    flightNo: "FL004",
    flightDate: "2024-01-05",
    origin: "MIA",
    destination: "DFW",
    currency: "USD",
    status: "Cancelled",
    createdAt: "2024-01-04",
    updatedAt: "2024-01-06",
    action: "View",
  },
  {
    referenceNo: "REF005",
    invoiceNo: "INV005",
    invoiceDate: "2024-01-05",
    supplierOrigin: "Supplier E",
    freight: 1800,
    ocdc: 90,
    agentName: "Agent V",
    flightNo: "FL005",
    flightDate: "2024-01-06",
    origin: "DFW",
    destination: "JFK",
    currency: "USD",
    status: "Completed",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-07",
    action: "View",
  },
]
