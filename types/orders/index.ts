import { Location } from "../flight-master/flight-master"

export type Order = {
  ID: string
  created_at: string
  updated_at: string
  awb: string
  is_physical: boolean | null
  booking_type: {
    ID: string
    created_at: string
    updated_at: string
    name: string
  }
  status: {
    ID: string
    created_at: string
    updated_at: string
    name: string
  }
  origin: Location
  destination: Location
  commodity_code: {
    ID: string
    created_at: string
    updated_at: string
    name: string
    description: string
  }
  payment_mode: {
    ID: string
    created_at: string
    updated_at: string
    name: string
  }
  volume_kg: string
  currency: {
    id: string
    created_at: string
    updated_at: string
    currency_code: string
    currency_name: string
    country: string
    symbol: string
    decimal: boolean
  }
  rate: number | null
  s_rate: number | null
  s_freight: number | null
  spot_id: string | null
  gs_weight_kg: string
  ch_weight_kg: string
  amount_due: string
  mode: string
  total: number | null
  activity_logs: {
    ID: string
    created_at: string
    updated_at: string
    user: {
      ID: string
      created_at: string
      updated_at: string
      name: string
      email: string
    }
    action: string
    details?: string[]
  }[]
  bill_to: {
    id: string
    name: string
  }
  shipper: {
    id: string
    name: string
  }
  consignee: null
  customer: null
  freight_forwarder: {
    id: string
    name: string
  }
  organization: null
  partner_prefix: {
    ID: string
    created_at: string
    updated_at: string
    name: string
  }
  partner_code: {
    ID: string
    created_at: string
    updated_at: string
    name: string
    description: string
  }
}
