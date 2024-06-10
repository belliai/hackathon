import { PropsField } from "@/components/track/types";

export const filterFields: Array<PropsField> = [
    {
        fieldId: "DCMAgaints",
        type: "inputRadio",
        options : [
            { label : "DCM Against AWB", value: "DCMAgaintsAWB"},
            { label : "DCM againts Deals/PLI", value: "DCMAgaintsDeals"}
        ]

    },
    {
        fieldId: "empty1",
    },
    {
        fieldId: "empty2",
    },
    {
        fieldId: "empty3",
    },

    {
        fieldId: "DCMDt",
        children: [
            {
                fieldId: "dcmFomDate",
                label: "DCM From Date",
                type: "inputDate",
            },
            {
                fieldId: "dcmToDate",
                label: "DCM To Date",
                type: "inputDate",
            },
        ]
    },
    {
        fieldId: "dcmNumber",
        label: "DCM Number",
        type: "inputText",
    },

    {
        fieldId: "dcmType",
        label: "CCA Type",
        type: "inputSelect",
        options: [
            {
                label: "All", value: "all"
            }
        ]
    },
    {
        fieldId: "empty4",
    },
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
        fieldId: "invoiceNo",
        label: "Invoice Number",
        type: "inputText",
    },

    {
        fieldId: "agent",
        label: "Agent",
        type: "inputText",
    },
    {
        fieldId: "entity",
        label: "Entity",
        type: "inputText",
    }
]
