import { useAddBookingType } from "@/lib/hooks/booking-types"
import { useAddCommodityCode } from "@/lib/hooks/commodity-codes"
import { useAddCurrency } from "@/lib/hooks/currencies"
import { useAddLocation } from "@/lib/hooks/locations"
import { useAddPartnerCode } from "@/lib/hooks/partner-codes"
import { useAddPartnerPrefix } from "@/lib/hooks/partner-prefix"
import { useAddPartnerType } from "@/lib/hooks/partner-types"
import { useAddPaymentMode } from "@/lib/hooks/payment-modes"
import { useAddStatus } from "@/lib/hooks/statuses"
import { useAddTransportMethod } from "@/lib/hooks/transport-method"
import { useCustomFields } from "./custom-fields"

// Define the TabName type
type SettingsTabName =
  | "Booking Type"
  | "Partner Prefix"
  | "Partner Code"
  | "Status"
  | "Location"
  | "Commodity Code"
  | "Payment Mode"
  | "Transport Method"
  | "Partner Type"
  | "Currency"
  | "Aircrafts"

// Map of hooks based on TabName
const hooksMap: Record<SettingsTabName, () => any> = {
  "Booking Type": useAddBookingType,
  "Partner Prefix": useAddPartnerPrefix,
  "Partner Code": useAddPartnerCode,
  Status: useAddStatus,
  Location: useAddLocation,
  "Commodity Code": useAddCommodityCode,
  "Payment Mode": useAddPaymentMode,
  "Transport Method": useAddTransportMethod,
  "Partner Type": useAddPartnerType,
  Currency: useAddCurrency,
  Aircrafts: useCustomFields,
}

// Map of fields based on TabName
const fieldsMap: Record<SettingsTabName, string[]> = {
  "Booking Type": ["name"],
  "Partner Prefix": ["name"],
  "Partner Code": ["name"],
  Status: ["name"],
  Location: ["name"],
  "Commodity Code": ["name", "description"],
  "Payment Mode": ["name"],
  "Transport Method": ["name"],
  "Partner Type": ["name"],
  Currency: ["name"],
  Aircrafts: ["name"],
}

const useSettingsDynamicHook = (activeTab: SettingsTabName) => {
  const Hook = hooksMap[activeTab]
  const fields = fieldsMap[activeTab]
  return { hook: Hook ? Hook() : null, fields }
}

export default useSettingsDynamicHook

export type { SettingsTabName }
