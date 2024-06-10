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
        awbNo: "1234567890",
        awbDate: "2024-05-01",
        billTo: "ABC Corp",
        shippingAgent: "XYZ Logistics",
        shipperCode: "SHIP001",
        commCode: "COMM001",
        org: "JFK",
        dest: "LAX",
        chargeWt: "1500 kg",
        iataFreight: "2000 USD",
        mktFreight: "2100 USD",
        spotFreight: "1900 USD",
        ocdc: "50 USD",
        subtotal: "2050 USD",
        tax: "102.50 USD",
        comm: "30 USD",
        incentive: "20 USD",
        iataTotal: "2202.50 USD",
        mktTotal: "2252.50 USD",
        final: "2182.50 USD",
        status: "Pending",
        spotRate: "18.50 USD/kg",
        invoiceNo: "INV001",
        mode: "Air",
        interlineStatus: "Confirmed"
    },
    {
        awbNo: "0987654321",
        awbDate: "2024-05-02",
        billTo: "DEF Inc.",
        shippingAgent: "LMN Transport",
        shipperCode: "SHIP002",
        commCode: "COMM002",
        org: "ATL",
        dest: "ORD",
        chargeWt: "1200 kg",
        iataFreight: "1600 USD",
        mktFreight: "1650 USD",
        spotFreight: "1500 USD",
        ocdc: "40 USD",
        subtotal: "1540 USD",
        tax: "77 USD",
        comm: "25 USD",
        incentive: "15 USD",
        iataTotal: "1662 USD",
        mktTotal: "1712 USD",
        final: "1632 USD",
        status: "Confirmed",
        spotRate: "17.50 USD/kg",
        invoiceNo: "INV002",
        mode: "Air",
        interlineStatus: "Pending"
    },
    {
        awbNo: "1122334455",
        awbDate: "2024-05-03",
        billTo: "GHI LLC",
        shippingAgent: "OPQ Freight",
        shipperCode: "SHIP003",
        commCode: "COMM003",
        org: "SFO",
        dest: "SEA",
        chargeWt: "1800 kg",
        iataFreight: "2400 USD",
        mktFreight: "2500 USD",
        spotFreight: "2300 USD",
        ocdc: "60 USD",
        subtotal: "2360 USD",
        tax: "118 USD",
        comm: "35 USD",
        incentive: "25 USD",
        iataTotal: "2518 USD",
        mktTotal: "2568 USD",
        final: "2483 USD",
        status: "Completed",
        spotRate: "19.00 USD/kg",
        invoiceNo: "INV003",
        mode: "Air",
        interlineStatus: "Confirmed"
    },
    {
        awbNo: "6677889900",
        awbDate: "2024-05-04",
        billTo: "JKL Ltd.",
        shippingAgent: "RST Shipping",
        shipperCode: "SHIP004",
        commCode: "COMM004",
        org: "MIA",
        dest: "DFW",
        chargeWt: "1700 kg",
        iataFreight: "2200 USD",
        mktFreight: "2250 USD",
        spotFreight: "2100 USD",
        ocdc: "55 USD",
        subtotal: "2155 USD",
        tax: "107.75 USD",
        comm: "33 USD",
        incentive: "23 USD",
        iataTotal: "2395.75 USD",
        mktTotal: "2445.75 USD",
        final: "2370.75 USD",
        status: "In Transit",
        spotRate: "18.75 USD/kg",
        invoiceNo: "INV004",
        mode: "Air",
        interlineStatus: "Pending"
    },
    {
        awbNo: "3344556677",
        awbDate: "2024-05-05",
        billTo: "MNO Enterprises",
        shippingAgent: "UVW Cargo",
        shipperCode: "SHIP005",
        commCode: "COMM005",
        org: "DEN",
        dest: "BOS",
        chargeWt: "1600 kg",
        iataFreight: "2100 USD",
        mktFreight: "2150 USD",
        spotFreight: "2000 USD",
        ocdc: "52 USD",
        subtotal: "2052 USD",
        tax: "102.60 USD",
        comm: "32 USD",
        incentive: "22 USD",
        iataTotal: "2306.60 USD",
        mktTotal: "2356.60 USD",
        final: "2282.60 USD",
        status: "Delivered",
        spotRate: "18.00 USD/kg",
        invoiceNo: "INV005",
        mode: "Air",
        interlineStatus: "Confirmed"
    }
];
