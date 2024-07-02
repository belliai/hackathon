export const invoiceTypeList = [
    {
        key: "all",
        value: "All"
    },
    {
        key: "agent",
        value: "Agent"
    },
    {
        key: "walkin",
        value: "Walkin"
    },
    {
        key: "destination",
        value: "Destination"
    },
    {
        key: "delivery",
        value: "Delivery"
    },
    {
        key: "interline",
        value: "Interline"
    },
    {
        key: "debitNote",
        value: "Debit Note"
    },
    {
        key: "creditNote",
        value: "Credit Note"
    },
    {
        key: "revisedInvoice",
        value: "Revised Invoice"
    },
    {
        key: "proforma",
        value: "Proforma"
    },
    {
        key: "charter",
        value: "Charter"
    }
]


export const invoiceStatusList = [
    {
        key: "all",
        value: "All"
    },
    {
        key: "open",
        value: "Open"
    },
    {
        key: "close",
        value: "Close"
    },
    {
        key: "cancelled",
        value: "Cancelled"
    },
]

export const billTypeList = [
    {
        key: "all",
        value: "All"
    },
    {
        key: "daily",
        value: "Daily"
    },
    {
        key: "fortnightly",
        value: "Fortnightly"
    },
    {
        key: "monthly",
        value: "Monthly"
    },
    {
        key: "weekly",
        value: "Weekly"
    }


]


export const countryList = [
    {
        key: "all",
        value: "All"
    },
    {
        key: "CD",
        value: "Congo"
    },
    {
        key: "IN",
        value: "India"
    },
    {
        key: "ZM",
        value: "Zambia"
    },
    {
        key: "ZW",
        value: "Zimbabwe"
    }

]

export const originList = [
    {
        key: "all",
        value: "All"
    },
    {
        key: "ah1",
        value: "AH1"
    },
    {
        key: "aip",
        value: "AIP"
    },
    {
        key: "ajl",
        value: "AJL"
    },
    {
        key: "ala",
        value: "ALA"
    },
    {
        key: "amd",
        value: "AMD"
    },
    {
        key: "ams",
        value: "AMS"
    },
    {
        key: "an1",
        value: "AN1"
    }
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
    { key: "MUM", value: "Mumbai" }
];

export const dummyData = [
    {
        agentName: "John Doe",
        centralAgent: "Central Logistics",
        invoiceNumber: "INV001",
        invoiceDate: "2024-05-01",
        invoiceAmount: "1500 USD",
        collectedAmountInvoiceCurrency: "1400 USD",
        collectedAmountPaymentCurrency: "1350 EUR",
        tax: "75 USD",
        vat: "50 USD",
        paymentType: "RTGS",
        dcmAmount: "100 USD",
        dcmType: "Discount",
        chequeOrDDOrRTGSNo: "RTGS12345",
        chequeDate: "2024-05-03",
        bankName: "Bank of America",
        entryDate: "2024-05-02",
        depositDate: "2024-05-04"
    },
    {
        agentName: "Jane Smith",
        centralAgent: "Global Freight",
        invoiceNumber: "INV002",
        invoiceDate: "2024-05-02",
        invoiceAmount: "2000 USD",
        collectedAmountInvoiceCurrency: "1900 USD",
        collectedAmountPaymentCurrency: "1850 EUR",
        tax: "100 USD",
        vat: "70 USD",
        paymentType: "Cheque",
        dcmAmount: "150 USD",
        dcmType: "Refund",
        chequeOrDDOrRTGSNo: "CHQ54321",
        chequeDate: "2024-05-05",
        bankName: "Chase Bank",
        entryDate: "2024-05-03",
        depositDate: "2024-05-06"
    },
    {
        agentName: "Mike Johnson",
        centralAgent: "Express Shipping",
        invoiceNumber: "INV003",
        invoiceDate: "2024-05-03",
        invoiceAmount: "2500 USD",
        collectedAmountInvoiceCurrency: "2400 USD",
        collectedAmountPaymentCurrency: "2350 EUR",
        tax: "125 USD",
        vat: "90 USD",
        paymentType: "DD",
        dcmAmount: "200 USD",
        dcmType: "Adjustment",
        chequeOrDDOrRTGSNo: "DD67890",
        chequeDate: "2024-05-06",
        bankName: "Wells Fargo",
        entryDate: "2024-05-04",
        depositDate: "2024-05-07"
    },
    {
        agentName: "Emily Davis",
        centralAgent: "TransWorld",
        invoiceNumber: "INV004",
        invoiceDate: "2024-05-04",
        invoiceAmount: "3000 USD",
        collectedAmountInvoiceCurrency: "2900 USD",
        collectedAmountPaymentCurrency: "2850 EUR",
        tax: "150 USD",
        vat: "110 USD",
        paymentType: "RTGS",
        dcmAmount: "250 USD",
        dcmType: "Credit",
        chequeOrDDOrRTGSNo: "RTGS98765",
        chequeDate: "2024-05-07",
        bankName: "Citibank",
        entryDate: "2024-05-05",
        depositDate: "2024-05-08"
    },
    {
        agentName: "Chris Brown",
        centralAgent: "National Cargo",
        invoiceNumber: "INV005",
        invoiceDate: "2024-05-05",
        invoiceAmount: "3500 USD",
        collectedAmountInvoiceCurrency: "3400 USD",
        collectedAmountPaymentCurrency: "3350 EUR",
        tax: "175 USD",
        vat: "130 USD",
        paymentType: "Cheque",
        dcmAmount: "300 USD",
        dcmType: "Rebate",
        chequeOrDDOrRTGSNo: "CHQ24680",
        chequeDate: "2024-05-08",
        bankName: "HSBC",
        entryDate: "2024-05-06",
        depositDate: "2024-05-09"
    }
];
