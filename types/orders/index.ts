import { Location } from "../flight-master/flight-master"

export type Order = {
  activity_logs: {
    action: string
    created_at: string
    details: string[]
    ID: string
    updated_at: string
    user: {
      created_at: string
      email: string
      ID: string
      name: string
      updated_at: string
    }
  }[]
  amount_due: string
  awb: string
  bill_to: {
    id: string
    name: string
  }
  booking_type: {
    created_at: string
    ID: string
    name: string
    updated_at: string
  }
  ch_weight_kg: string
  commodity_code: {
    created_at: string
    description: string
    ID: string
    name: string
    updated_at: string
  }
  consignee: {
    id: string
    name: string
  }
  created_at: string
  currency: {
    country: string
    created_at: string
    currency_code: string
    currency_name: string
    decimal: boolean
    ID: string
    symbol: string
    updated_at: string
  }
  customer: {
    code: string
    id: string
    name: string
  }
  destination: Location
  freight_forwarder: {
    id: string
    name: string
  }
  gs_weight_kg: string
  ID: string
  is_physical: boolean
  mode: string
  organization: {
    id: string
    name: string
  }
  origin: Location
  partner_code: {
    description: string
    ID: string
    name: string
  }
  partner_prefix: {
    ID: string
    name: string
  }
  payment_mode: {
    created_at: string
    ID: string
    name: string
    updated_at: string
  }
  rate: string
  s_freight: string
  s_rate: string
  shipper: {
    id: string
    name: string
  }
  shipper_details: {
    allotment_code: string
    created_at: string
    date: string
    destination: {
      airport_code: string
      city: string
      country: string
      created_at: string
      ID: string
      timezone: {
        abbreviation: string
        created_at: string
        ID: string
        name: string
        offset: string
        updated_at: string
      }
      updated_at: string
    }
    flight_code: string
    ID: string
    origin: {
      airport_code: string
      city: string
      country: string
      created_at: string
      ID: string
      timezone: {
        abbreviation: string
        created_at: string
        ID: string
        name: string
        offset: string
        updated_at: string
      }
      updated_at: string
    }
    partner_code: {
      airline_name: string
      awb_prefix: string
      created_at: string
      iata: string
      icao: string
      ID: string
      updated_at: string
    }
    partner_type: {
      created_at: string
      ID: string
      name: string
      updated_at: string
    }
    status: {
      created_at: string
      ID: string
      name: string
      updated_at: string
    }
    transport_method: {
      created_at: string
      ID: string
      name: string
      updated_at: string
    }
    updated_at: string
  }[]
  spot_id: string
  status: {
    created_at: string
    ID: string
    name: string
    updated_at: string
  }
  total: string
  updated_at: string
  volume_kg: string
}
