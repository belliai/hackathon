export const dummyData = [
    {
        messageType: "Notification",
        message: "Your order has been shipped.",
        mailID: "order123@example.com",
        processed: true,
        status: "Success",
        updatedBy: "system",
        updatedDate: "2024-05-01",
        error: ""
    },
    {
        messageType: "Alert",
        message: "Your password will expire in 5 days.",
        mailID: "security@example.com",
        processed: false,
        status: "Pending",
        updatedBy: "admin",
        updatedDate: "2024-05-02",
        error: ""
    },
    {
        messageType: "Error",
        message: "Failed to process payment.",
        mailID: "billing@example.com",
        processed: false,
        status: "Failed",
        updatedBy: "system",
        updatedDate: "2024-05-03",
        error: "Payment gateway timeout"
    },
    {
        messageType: "Reminder",
        message: "Your subscription is due for renewal.",
        mailID: "subscription@example.com",
        processed: true,
        status: "Success",
        updatedBy: "user",
        updatedDate: "2024-05-04",
        error: ""
    },
    {
        messageType: "Info",
        message: "New features have been added to your account.",
        mailID: "support@example.com",
        processed: true,
        status: "Success",
        updatedBy: "admin",
        updatedDate: "2024-05-05",
        error: ""
    }
];
