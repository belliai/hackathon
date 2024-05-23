export const masterList = [
    {
        key: "atfPrice",
        value: "ATF Price"
    },
    {
        key: "exchangeRate",
        value: "Exchange Rate"
    },
    {
        key: "oc",
        value: "OC"
    },
    {
        key: "ocdc",
        value: "OCDC"
    },
    {
        key: "prorate",
        value: "Prorate"
    },
    {
        key: "spotRate",
        value: "Cart"
    },
    {
        key: "sac",
        value: "SAC"
    },
    {
        key: "rateline",
        value: "Rateline"
    }
    
];

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
        awbFlight: "AWB123/FL123",
        origin: "JFK",
        destination: "LAX",
        messageCategory: "Notification",
        message: "Flight delay",
        recipient: "customer@example.com",
        communicationType: "Email",
        messageType: "Delay",
        type: "Automatic",
        processed: true,
        triggerDate: "2024-05-01T08:00:00Z",
        content: "Your flight has been delayed by 2 hours."
    },
    {
        awbFlight: "AWB456/FL456",
        origin: "SFO",
        destination: "ORD",
        messageCategory: "Alert",
        message: "Baggage mishandled",
        recipient: "support@example.com",
        communicationType: "SMS",
        messageType: "Issue",
        type: "Manual",
        processed: false,
        triggerDate: "2024-05-02T09:00:00Z",
        content: "There was an issue with baggage handling."
    },
    {
        awbFlight: "AWB789/FL789",
        origin: "ATL",
        destination: "DFW",
        messageCategory: "Reminder",
        message: "Check-in reminder",
        recipient: "customer@example.com",
        communicationType: "Email",
        messageType: "Reminder",
        type: "Automatic",
        processed: true,
        triggerDate: "2024-05-03T07:00:00Z",
        content: "Please check-in for your flight."
    },
    {
        awbFlight: "AWB101/FL101",
        origin: "MIA",
        destination: "SEA",
        messageCategory: "Notification",
        message: "Gate change",
        recipient: "customer@example.com",
        communicationType: "App Notification",
        messageType: "Change",
        type: "Automatic",
        processed: true,
        triggerDate: "2024-05-04T06:00:00Z",
        content: "Your gate has been changed to A23."
    },
    {
        awbFlight: "AWB202/FL202",
        origin: "ORD",
        destination: "MCO",
        messageCategory: "Alert",
        message: "Weather warning",
        recipient: "support@example.com",
        communicationType: "Email",
        messageType: "Warning",
        type: "Manual",
        processed: false,
        triggerDate: "2024-05-05T10:00:00Z",
        content: "Severe weather expected at destination."
    }
];