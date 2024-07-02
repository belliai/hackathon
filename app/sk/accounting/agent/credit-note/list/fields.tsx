import { PropsField } from "@/components/track/types";

export const filterFields: Array<PropsField> = [
    {
        fieldId: "CCADates",
        children: [
            {
                fieldId: "ccaFomDate",
                label: "CCA From Date",
                type: "inputDate",
            },
            {
                fieldId: "ccaToDate",
                label: "CCA To Date",
                type: "inputDate",
            },
        ]
    },
    {
        fieldId: "ccaNumber",
        label: "CCA Number",
        type: "inputText",
    },
    {
        fieldId: "ccaType",
        label: "CCA Type",
        type: "inputSelect",
        options: [
            {
                label: "All", value: "all"
            }
        ]
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
        fieldId: "agent",
        label: "Agent",
        type: "inputText",
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
        label: "Invoice",
        type: "inputText",
    },
    {
        fieldId: "entity",
        label: "Entity",
        type: "inputText",
    }
]
