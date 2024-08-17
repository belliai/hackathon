import { Key } from "lucide-react"

export const dataDisplay = [
  {
    label: "Volume",
    key: "volume",
    children: [
      {
        label: "Utilization",
        fullLabel: "Volume (Utilization %)",
        key: "volume-utilization",
        dataKey: "volumeUtilization",
        formatter: "percentage",
      },
      {
        label: "Value",
        fullLabel: "Volume (by m³)",
        key: "volume-value",
        dataKey: "volume",
        formatter: "volume",
      },
    ],
  },
  {
    label: "Weight",
    key: "weight",
    children: [
      {
        label: "Utilization",
        fullLabel: "Weight (Utilization %)",
        key: "weight-utilization",
        dataKey: "weightUtilization",
        formatter: "percentage",
      },
      {
        label: "Value",
        fullLabel: "Weight  (by kg)",
        key: "weight-value",
        dataKey: "weight",
        formatter: "weight",
      },
    ],
  },
  {
    label: "Revenue",
    key: "revenue",
    children: [
      {
        label: "Per Kg",
        fullLabel: "Revenue (per kg sold)",
        key: "revenue-per-kg",
        dataKey: "revenuePerKg",
        formatter: "currency",
      },
      {
        label: "Per Flight",
        fullLabel: "Revenue (by flight)",
        key: "revenue-per-flight",
        dataKey: "revenuePerFlight",
        formatter: "currency",
      },
    ],
  },
] as const
