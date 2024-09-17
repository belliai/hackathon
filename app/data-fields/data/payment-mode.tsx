import {
  BadgeDollarSignIcon,
  BookXIcon,
  CalendarClockIcon,
  CreditCardIcon,
} from "lucide-react"

import CancellationTerms from "../cancellation-terms"
import { DataFieldsTab } from "../components/datafields-page-template"
import Currency from "../currency"
import PaymentMode from "../payment-mode"
import PaymentTerms from "../payment-terms"

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
  {
    name: "Payment Terms",
    component: <PaymentTerms />,
    icon: CalendarClockIcon,
    tooltipId: "aircraft-settings-payment-terms",
  },
  {
    name: "Cancellation Terms",
    component: <CancellationTerms />,
    icon: BookXIcon,
    tooltipId: "aircraft-settings-cancellation-terms",
  },
]
