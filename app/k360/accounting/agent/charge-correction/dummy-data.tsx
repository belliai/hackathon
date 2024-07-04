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
    select: false,
    ccaNo: "CCA001",
    awbNo: "AWB001",
    paymode: "Credit",
    invoiceNo: "INV001",
    agentCode: "AGT001",
    ccaDate: "2024-01-01",
    status: "Pending",
    currentGrossWt: 500,
    currentChargableWt: 480,
    currentFreight: 1500,
    currentOcdc: 50,
    currentOcda: 20,
    currentSt: 30,
    currentTotal: 1600,
    revisedGrossWt: 520,
    revisedChargableWt: 500,
    revisedFreight: 1550,
    revisedOcdc: 55,
    revisedOcda: 25,
    revisedSt: 35,
    revisedTotal: 1650,
    action: "Review",
  },
  {
    select: false,
    ccaNo: "CCA002",
    awbNo: "AWB002",
    paymode: "Cash",
    invoiceNo: "INV002",
    agentCode: "AGT002",
    ccaDate: "2024-02-01",
    status: "Approved",
    currentGrossWt: 600,
    currentChargableWt: 580,
    currentFreight: 1800,
    currentOcdc: 60,
    currentOcda: 25,
    currentSt: 35,
    currentTotal: 1920,
    revisedGrossWt: 620,
    revisedChargableWt: 600,
    revisedFreight: 1850,
    revisedOcdc: 65,
    revisedOcda: 30,
    revisedSt: 40,
    revisedTotal: 1990,
    action: "Finalize",
  },
  {
    select: false,
    ccaNo: "CCA003",
    awbNo: "AWB003",
    paymode: "Debit",
    invoiceNo: "INV003",
    agentCode: "AGT003",
    ccaDate: "2024-03-01",
    status: "Rejected",
    currentGrossWt: 700,
    currentChargableWt: 680,
    currentFreight: 2100,
    currentOcdc: 70,
    currentOcda: 35,
    currentSt: 40,
    currentTotal: 2245,
    revisedGrossWt: 720,
    revisedChargableWt: 700,
    revisedFreight: 2150,
    revisedOcdc: 75,
    revisedOcda: 40,
    revisedSt: 45,
    revisedTotal: 2310,
    action: "Review",
  },
  {
    select: false,
    ccaNo: "CCA004",
    awbNo: "AWB004",
    paymode: "Credit",
    invoiceNo: "INV004",
    agentCode: "AGT004",
    ccaDate: "2024-04-01",
    status: "Pending",
    currentGrossWt: 800,
    currentChargableWt: 780,
    currentFreight: 2400,
    currentOcdc: 80,
    currentOcda: 45,
    currentSt: 50,
    currentTotal: 2575,
    revisedGrossWt: 820,
    revisedChargableWt: 800,
    revisedFreight: 2450,
    revisedOcdc: 85,
    revisedOcda: 50,
    revisedSt: 55,
    revisedTotal: 2640,
    action: "Approve",
  },
  {
    select: false,
    ccaNo: "CCA005",
    awbNo: "AWB005",
    paymode: "Cash",
    invoiceNo: "INV005",
    agentCode: "AGT005",
    ccaDate: "2024-05-01",
    status: "Approved",
    currentGrossWt: 900,
    currentChargableWt: 880,
    currentFreight: 2700,
    currentOcdc: 90,
    currentOcda: 55,
    currentSt: 60,
    currentTotal: 2905,
    revisedGrossWt: 920,
    revisedChargableWt: 900,
    revisedFreight: 2750,
    revisedOcdc: 95,
    revisedOcda: 60,
    revisedSt: 65,
    revisedTotal: 2970,
    action: "Finalize",
  },
]
