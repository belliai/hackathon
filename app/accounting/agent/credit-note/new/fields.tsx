import { PropsField } from "@/components/track/types";

export const filterFields: Array<PropsField> = [
    {
        fieldId: "awbNumber",
        label: "AWB Number",
        type: "inputText",
        children: [
            {
                fieldId: "awbPrefix",
                label: "AWB Prefix",
                type: "inputText",
            },
            {
                fieldId: "awbNo",
                label: "AWB Number",
                type: "inputText",
            },
        ]
    },
    {
        fieldId: "payMode",
        label: "Pay Mode",
        type: "inputSelect",
        options: [
            { label: "All", value: "all" },
            { label: "Agent", value: "agent" }
        ]
    },

    {
        fieldId: "chargeAt",
        label: "Date",
        type: "inputDate",
    },
    {
        fieldId: "invoiceNo",
        label: "Invoice No",
        type: "inputText",
    },
    {
        fieldId: "invoiceDate",
        label: "Invoice Date",
        type: "inputDate",
    },
    {
        fieldId: "CCANumber",
        label: "CCA Number",
        type: "inputText",
    },
    {
        fieldId: "status",
        label: "Status",
        type: "inputSelect",
        options: [
            {
                label: "All", value: "all"
            }
        ]
    },
    {
        fieldId: "awbIssueDate",
        label: "Date Of AWB Issue",
        type: "inputDate",
    },
    {
        fieldId: "agentCode",
        label: "Agent's Code",
        type: "inputText",
    },
    {
        fieldId: "airlineCode",
        label: "Airline's Code",
        type: "inputText",
    },
    {
        fieldId: "origin",
        label: "Origin",
        type: "inputText",
    },
    {
        fieldId: "destination",
        label: "Destination",
        type: "inputText",
    },
]


export const airwaybillFields: Array<PropsField> = [
    {
        fieldId: "weightUnit",
        label: "Weight Unit",
        options: [
            { label: "Kilo", value: "kg" },
            { label: "Pound", value: "pound" }
        ],
        type: "inputRadio",
    },
    {
        fieldId: "revisedWeight",
        label: "Revised / Corrected Weight",
        type: "inputText",
    },
    {
        fieldId: "originalWeight",
        label: "Original / Incorrect Weight",
        type: "inputText",
    }
]


export const originalFields: Array<PropsField> = [
    {
        fieldId: "currency",
        label: "Currency",
        options: [
            { label: "USD", value: "usd" },
            { label: "AUD", value: "aud" },
            { label: "SGD", value: "sgd" }
        ],
        type: "inputSelect",
    },
    {
        fieldId: "commCode",
        label: "Comm. Code",
        type: "inputText",
    },
    {
        fieldId: "weightChartParent",
        children: [
            {
                fieldId: "weightChart",
                label: "Weight Chart",
                type: "inputText",


            },
            {
                fieldId: "collectWeightChart",
                label: "Collect Weight Chart",
                type: "inputText",


            }
        ]
    },
    {
        fieldId: "commision",
        label: "Commission",
        type: "inputText",
    },
    {
        fieldId: "incentive",
        label: "Incentive",
        type: "inputText",
    },
    {
        fieldId: "netAmount",
        label: "Net Amount",
        type: "inputText",
    },
    {
        fieldId: "tdsCommission",
        label: "TDS Commission",
        type: "inputText",
    },
    {
        fieldId: "stCommission",
        label: "STCommission",
        type: "inputText",
    },
    {
        fieldId: "totalOtherChargesDueAgentParent",
        label: "Total Other Charge Due Airline",
        type: "inputText",
        children: [
            {
                fieldId: "totalOtherChargesDueAgent",
                label: "Total Other Charge Due Agent",
                type: "inputText",
            },
            {
                fieldId: "collectTotalOtherChargesDueAgent",
                label: "Collect",
                type: "inputText",
            }
        ]
    },
    {
        fieldId: "totalOtherChargesDueAirlineParent",
        label: "Total Other Charge Due Airline",
        type: "inputText",
        children: [
            {
                fieldId: "totalOtherChargesDue",
                label: "Total Other Charge Due Airline",
                type: "inputText",
            },
            {
                fieldId: "collectTotalOtherChargesDueAirline",
                label: "Collect",
                type: "inputText",
            }
        ]
    },
    {
        fieldId: "tax",
        label: "Tax",
        type: "inputText",
    }

]
