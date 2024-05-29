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
        centralAgent: "Central Agent 1",
        localAgent: "Local Agent A",
        invoiceNo: "INV001",
        invoiceDate: "2024-04-01",
        invoiceAmount: 1000.00,
        tds: 100.00,
        collectedAmount: 800.00,
        paymentType: "Cheque",
        dcmAmount: 50.00,
        dcmType: "Credit",
        chequeDDRTGSNo: "CHQ123",
        chequeDate: "2024-04-05",
        bankName: "Bank A",
        paymentDate: "2024-04-10",
        pendingAmount: 50.00,
        ppRemarks: "Partial payment",
        currency: "USD",
        rePrint: "No",
        tinNo: "TIN123456",
        user: "admin",
        postedStatus: "Posted",
        invoiceDetails: "Service charges",
        payMode: "Online"
    },
    {
        agentName: "Jane Smith",
        centralAgent: "Central Agent 2",
        localAgent: "Local Agent B",
        invoiceNo: "INV002",
        invoiceDate: "2024-05-01",
        invoiceAmount: 1500.00,
        tds: 150.00,
        collectedAmount: 1200.00,
        paymentType: "RTGS",
        dcmAmount: 100.00,
        dcmType: "Debit",
        chequeDDRTGSNo: "RTGS456",
        chequeDate: "2024-05-03",
        bankName: "Bank B",
        paymentDate: "2024-05-07",
        pendingAmount: 50.00,
        ppRemarks: "Partial payment",
        currency: "EUR",
        rePrint: "Yes",
        tinNo: "TIN654321",
        user: "user1",
        postedStatus: "Not Posted",
        invoiceDetails: "Consulting fees",
        payMode: "Offline"
    },
    {
        agentName: "Michael Brown",
        centralAgent: "Central Agent 3",
        localAgent: "Local Agent C",
        invoiceNo: "INV003",
        invoiceDate: "2024-06-01",
        invoiceAmount: 2000.00,
        tds: 200.00,
        collectedAmount: 1800.00,
        paymentType: "DD",
        dcmAmount: 200.00,
        dcmType: "Credit",
        chequeDDRTGSNo: "DD789",
        chequeDate: "2024-06-05",
        bankName: "Bank C",
        paymentDate: "2024-06-10",
        pendingAmount: 0.00,
        ppRemarks: "Full payment",
        currency: "GBP",
        rePrint: "No",
        tinNo: "TIN789012",
        user: "user2",
        postedStatus: "Posted",
        invoiceDetails: "Maintenance services",
        payMode: "Online"
    },
    {
        agentName: "Emily Davis",
        centralAgent: "Central Agent 4",
        localAgent: "Local Agent D",
        invoiceNo: "INV004",
        invoiceDate: "2024-07-01",
        invoiceAmount: 1200.00,
        tds: 120.00,
        collectedAmount: 1000.00,
        paymentType: "Cheque",
        dcmAmount: 50.00,
        dcmType: "Debit",
        chequeDDRTGSNo: "CHQ101",
        chequeDate: "2024-07-05",
        bankName: "Bank D",
        paymentDate: "2024-07-10",
        pendingAmount: 50.00,
        ppRemarks: "Partial payment",
        currency: "INR",
        rePrint: "Yes",
        tinNo: "TIN345678",
        user: "admin",
        postedStatus: "Not Posted",
        invoiceDetails: "Logistics charges",
        payMode: "Offline"
    },
    {
        agentName: "David Wilson",
        centralAgent: "Central Agent 5",
        localAgent: "Local Agent E",
        invoiceNo: "INV005",
        invoiceDate: "2024-08-01",
        invoiceAmount: 1800.00,
        tds: 180.00,
        collectedAmount: 1600.00,
        paymentType: "RTGS",
        dcmAmount: 100.00,
        dcmType: "Credit",
        chequeDDRTGSNo: "RTGS102",
        chequeDate: "2024-08-05",
        bankName: "Bank E",
        paymentDate: "2024-08-10",
        pendingAmount: 20.00,
        ppRemarks: "Partial payment",
        currency: "CAD",
        rePrint: "No",
        tinNo: "TIN901234",
        user: "user3",
        postedStatus: "Posted",
        invoiceDetails: "Supply services",
        payMode: "Online"
    }
];
