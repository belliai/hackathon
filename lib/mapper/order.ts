import { format } from "date-fns"

// Helper function to extract ID from nested objects
const extractId = (nestedObj: any) =>
  nestedObj ? nestedObj.ID || nestedObj.id : ""

const extractFormatDate = (date: Date, formatStr: string) =>
  date ? format(date, formatStr) : null

//load data from API
export const mapJsonToSchema = (data: any) => {
  if (!data) return {}

  // Transform shipper_details
  const shipperDetailsTransformed =
    data &&
    data.shipper_details &&
    data.shipper_details.map((detail: any) => ({
      ID: detail.ID || "",
      transport_method_id: extractId(detail.transport_method),
      origin_id: extractId(detail.origin),
      destination_id: extractId(detail.destination),
      partner_type_id: extractId(detail.partner_type),
      partner_code_id: extractId(detail.partner_code),
      date:
        (detail.date &&
          extractFormatDate(new Date(detail.date), "yyyy-MM-dd")) ||
        "",
      flight_code: detail.flight_code || "",
      allotment_code: detail.allotment_code || "",
      status_id: extractId(detail.status) || "",
    }))

  // Map the JSON data to the schema
  const mappedData = {
    ID: data.ID || "",
    amount_due: data.amount_due || "",
    awb: data.awb || "",
    bill_to_id: extractId(data.bill_to) || "",
    bill_to_name: data.bill_to?.name || "",
    bill_to_old_name: data.bill_to?.name || "",
    booking_type_id: data.booking_type?.ID || "",
    ch_weight_kg: data.ch_weight_kg || "",
    created_at:
      (data.created_at &&
        extractFormatDate(new Date(data.created_at), "dd-MM-yyyy HH:mm")) ||
      "",
    commodity_code_id: extractId(data.commodity_code) || "",
    consignee_id: extractId(data.consignee) || "",
    currency_id: extractId(data.currency),
    customer_id: extractId(data.customer) || "",
    destination_id: extractId(data.destination),
    freight_forwarder_id: extractId(data.freight_forwarder) || "",
    gs_weight_kg: data.gs_weight_kg || "",
    is_physical: 'yes',
    mode: data.mode || "",
    organization_id: extractId(data.organization) || "",
    origin_id: extractId(data.origin),
    partner_code_id: extractId(data.partner_code) || "",
    partner_prefix_id: extractId(data.partner_prefix) || "",
    shipper_details: shipperDetailsTransformed || [{}],
    payment_mode_id: extractId(data.payment_mode) || "",
    rate: data.rate || "",
    s_freight: data.s_freight || "",
    s_rate: data.s_rate || "",
    shipper_id: extractId(data.shipper) || "",
    spot_id: data.spot_id || "",
    status_id: extractId(data.status) || "",
    total: data.total || "",
    volume_kg: data.volume_kg || "",
  }

  return mappedData
}

//parse schema to JSON
export const mapSchemaToJson = (data: any) => {
  if (!data) return {}
  // Transform shipper_details
  const shipperDetailsTransformed =
    data &&
    data.shipper_details &&
    data.shipper_details.map((detail: any) => ({
      ID: detail.ID || undefined,
      transport_method_id: detail.transport_method_id,
      origin_id: detail.origin_id,
      destination_id: detail.destination_id,
      partner_type_id: detail.partner_type_id || '',
      partner_code_id: detail.partner_code_id || '2ca5b6d8-5041-490f-96cc-a29de59ab3bf',
      date:
        (detail.date &&
          extractFormatDate(new Date(detail.date), "yyyy-MM-dd")) ||
        "",
      flight_code: detail.flight_code || "FLIGHT001",
      allotment_code: detail.allotment_code || "ALLOTMENT001",
      status_id: detail.status_id || null,
    }))
  
  const amountDue = parseFloat(data.total) - parseFloat(data.total_paid)

  const mappedData = {
    ID: data.ID || "",
    amount_due: amountDue.toString() || "",
    awb: data.awb || "",
    bill_to_id: data.bill_to_id || null,
    booking_type_id: data.booking_type_id || null,
    ch_weight_kg: data.total_weight || "",
    commodity_code_id: data.commodity_code_id || null,
    consignee_id: data.consignee_id || null,
    customer_id: data.consignee_id || null,
    currency_id: data.currency_id || null,
    destination_id: data.destination_id,
    freight_forwarder_id: data.freight_forwarder_id || null,
    gs_weight_kg: data.total_weight || "",
    is_physical: data.is_physical === 'yes',
    mode: "Card",
    organization_id: data.organization_id || null,
    origin_id: data.origin_id || null,
    partner_code_id: data.partner_code_id || null,
    partner_prefix_id: data.partner_prefix_id || null,
    shipper_details: [],
    payment_mode_id: data.payment_mode_id || null,
    rate: data.rate || "",
    s_freight: data.s_freight || "",
    s_rate: data.s_rate || "",
    shipper_id: data.shipper_id || null,
    spot_id: data.spot_id || null,
    status_id: data.status_id || '185b62d7-5d5b-4051-ba3c-b7c61bfe653d',
    total: data.total || "",
    volume_kg: data.total_volume || "",
  }

  return mappedData
}
