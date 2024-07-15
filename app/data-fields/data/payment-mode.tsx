import { BadgeDollarSignIcon, CreditCardIcon } from "lucide-react"

import { DataFieldsTab } from "../components/datafields-page-template"
import Currency from "../currency"
import PaymentMode from "../payment-mode"

export const tabs: DataFieldsTab[] = [
  {
    name: "Payment Mode",
    component: <PaymentMode />,
    icon: CreditCardIcon,
    tooltipId: "aircraft-settings-payment-mode",
  },
  {
    name: "Currency",
    component: <Currency />,
    icon: BadgeDollarSignIcon,
    tooltipId: "aircraft-settings-currency",
  },
]
