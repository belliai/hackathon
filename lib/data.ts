import { Order } from "@/schemas/order/order";

export const orders: any[] = [
  {
    amount_due: "string",
    awb: "string",
    bill_to: { id: "string", name: "string" },
    booking_type: { id: "00000000-0000-0000-0000-000000000000", name: "Booking type 1" },
    ch_weight_kg: "string",
    commodity_code: { description: "string", id: "00000000-0000-0000-000000000000", name: "string" },
    consignee: { id: "string", name: "string" },
    currency: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    customer: { code: "string", id: "string", name: "string" },
    destination: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    freight_forwarder: { id: "string", name: "string" },
    gs_weight_kg: "string",
    id: "00000000-0000-0000-0000-000000000000",
    is_physical: true,
    mode: "string",
    organization: { id: "string", name: "string" },
    origin: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    partner_code: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    partner_prefix: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    payment_mode: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    rate: "string",
    s_freight: "string",
    s_rate: "string",
    shipper: { id: "string", name: "string" },
    shipper_details: [
      {
        allotment_code: "string",
        date: "string",
        destination: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
        flight_code: "string",
        id: "00000000-0000-0000-0000-000000000000",
        origin: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
        partner_code: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
        partner_type: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
        status: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
        transport_method: { id: "00000000-0000-0000-0000-000000000000", name: "string" }
      }
    ],
    spot_id: "string",
    status: { id: "00000000-0000-0000-0000-000000000000", name: "string" },
    total: "string",
    volume_kg: "string"
  }
];

export function getData() {
  return orders;
}

export const bookingDetails = {
  bookingTypeOptions: ["Select", "Type 1", "Type 2"],
  partnerPrefixOptions: ["Select", "Prefix 1", "Prefix 2"],
  awbOptions: ["Select", "AWB1", "AWB2"],
  partnerCodeOptions: ["Select", "Code 1", "Code 2"],
};

export const amountDue = {
  bookingCode: "AAC0FE",
  bookingID: "IP-4372-1501421737",
  amountPaid: "$20.00",
};

export const subtotal = "$20.00";
export const grandTotal = "$20.00";

export const balanceDetails = {
  customerName: "Elroy Carreen",
  individualBalance: "$0.00",
};
