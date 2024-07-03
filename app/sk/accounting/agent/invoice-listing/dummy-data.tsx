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
    origin: "JFK",
    agentName: "John Doe",
    invoiceNo: "INV001",
    invoiceCreateDate: "2024-04-01",
    closedDate: "2024-04-15",
    invoiceAmount: 1000.0,
    collectedAmount: 800.0,
    credit: 200.0,
    debit: 0.0,
    invoiceBalance: 200.0,
    status: "Open",
    countryCode: "US",
    cassAgent: "Agent123",
    exportSwanErp: "Yes",
    salesMonth: "April",
    actualInvoiceNo: "ACT001",
    irnNo: "IRN001",
  },
  {
    origin: "LAX",
    agentName: "Jane Smith",
    invoiceNo: "INV002",
    invoiceCreateDate: "2024-05-01",
    closedDate: "2024-05-10",
    invoiceAmount: 1500.0,
    collectedAmount: 1500.0,
    credit: 0.0,
    debit: 0.0,
    invoiceBalance: 0.0,
    status: "Closed",
    countryCode: "US",
    cassAgent: "Agent456",
    exportSwanErp: "No",
    salesMonth: "May",
    actualInvoiceNo: "ACT002",
    irnNo: "IRN002",
  },
  {
    origin: "ORD",
    agentName: "Michael Brown",
    invoiceNo: "INV003",
    invoiceCreateDate: "2024-06-01",
    closedDate: "2024-06-20",
    invoiceAmount: 2000.0,
    collectedAmount: 1800.0,
    credit: 200.0,
    debit: 0.0,
    invoiceBalance: 200.0,
    status: "Open",
    countryCode: "US",
    cassAgent: "Agent789",
    exportSwanErp: "Yes",
    salesMonth: "June",
    actualInvoiceNo: "ACT003",
    irnNo: "IRN003",
  },
  {
    origin: "SFO",
    agentName: "Emily Davis",
    invoiceNo: "INV004",
    invoiceCreateDate: "2024-07-01",
    closedDate: "2024-07-15",
    invoiceAmount: 1200.0,
    collectedAmount: 1200.0,
    credit: 0.0,
    debit: 0.0,
    invoiceBalance: 0.0,
    status: "Closed",
    countryCode: "US",
    cassAgent: "Agent101",
    exportSwanErp: "No",
    salesMonth: "July",
    actualInvoiceNo: "ACT004",
    irnNo: "IRN004",
  },
  {
    origin: "SEA",
    agentName: "David Wilson",
    invoiceNo: "INV005",
    invoiceCreateDate: "2024-08-01",
    closedDate: "2024-08-25",
    invoiceAmount: 1800.0,
    collectedAmount: 1600.0,
    credit: 200.0,
    debit: 0.0,
    invoiceBalance: 200.0,
    status: "Open",
    countryCode: "US",
    cassAgent: "Agent102",
    exportSwanErp: "Yes",
    salesMonth: "August",
    actualInvoiceNo: "ACT005",
    irnNo: "IRN005",
  },
]
