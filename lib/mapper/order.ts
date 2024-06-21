export const mapJsonToSchema = (data: any) => {

    if(!data) return {}

    // Helper function to extract ID from nested objects
    const extractId = (nestedObj : any) => nestedObj ? nestedObj.ID : "";

    // Transform shipper_details
    const shipperDetailsTransformed =  data && data.shipper_details  && data.shipper_details.map((detail: any)  => ({
        ID: detail.ID || "",
        transport_method_id: extractId(detail.transport_method),
        origin_id: extractId(detail.origin),
        destination_id: extractId(detail.destination),
        partner_type_id: extractId(detail.partner_type),
        partner_code_id: extractId(detail.partner_code),
        date: detail.date && new Date(detail.date) || "",
        flight_code: detail.flight_code || "",
        allotment_code: detail.allotment_code || "",
        status_id: extractId(detail.status) || ""
    })) ;

    // Map the JSON data to the schema
    const mappedData = {
        ID: data.ID || "",
        amount_due: data.amount_due || "",
        awb: data.awb || "",
        bill_to_id:  extractId(data.bill_to) || "",
        booking_type_id: data.booking_type?.ID || "",
        ch_weight_kg: data.ch_weight_kg || "",
        commodity_code_id: extractId(data.commodity_code) || "",
        consignee_id: extractId(data.consignee) || "",
        currency_id: extractId(data.currency),
        customer_id:  extractId(data.customer) || "",
        destination_id: extractId(data.destination),
        freight_forwarder_id: data.freight_forwarder_id || "",
        gs_weight_kg: data.gs_weight_kg || "",
        is_physical: !!data.is_physical,
        mode: data.mode || "",
        organization_id: data.organization_id || "",
        origin_id: extractId(data.origin),
        partner_code_id: extractId(data.partner_code)|| "",
        partner_prefix_id: extractId(data.partner_prefix) || "",
        shipper_details: shipperDetailsTransformed || [{}],
        payment_mode_id: data.payment_mode_id || "",
        rate: data.rate || "",
        s_freight: data.s_freight || "",
        s_rate: data.s_rate || "",
        shipper_id: data.shipper_id || "",
        spot_id: data.spot_id || "",
        status_id: data.status_id || "",
        total: data.total || "",
        volume_kg: data.volume_kg || ""
    };

    return mappedData;
};

// // Example usage
// const jsonData = {
//     "ID": "dc66d505-cd7f-434e-a5cf-2ad3fca8e07c",
//     "amount_due": null,
//     "awb": null,
//     "bill_to_id": "",
//     "booking_type_id": "",
//     "ch_weight_kg": null,
//     "commodity_code_id": "",
//     "consignee_id": "",
//     "currency_id": "",
//     "customer_id": "",
//     "destination_id": "",
//     "freight_forwarder_id": "",
//     "gs_weight_kg": null,
//     "is_physical": null,
//     "mode": null,
//     "organization_id": "",
//     "origin_id": "",
//     "partner_code_id": "",
//     "partner_prefix_id": "",
//     "shipper_details": [
//         {
//             "ID": "4658170e-e6cd-4540-ac3b-48f15626a58b",
//             "transport_method": {
//                 "ID": "9c474743-b14d-4de6-af65-255fca8adf9a",
//                 "name": "Sea"
//             },
//             "origin": {
//                 "ID": "9bb940c1-0bc2-417a-a975-6811d5c0b7ea",
//                 "name": "BKK"
//             },
//             "destination": {
//                 "ID": "5de641cd-f699-4fcd-9efc-ea9f6db039a2",
//                 "name": "SING"
//             },
//             "partner_type": {
//                 "ID": "102af14b-7054-4d62-8c41-10f8cc5e2954",
//                 "name": "Partner 1"
//             },
//             "partner_code": {
//                 "ID": "6dff33b0-c8a5-4a75-92de-f193d4d12cbb",
//                 "name": "115"
//             },
//             "date": null,
//             "flight_code": "sasa",
//             "allotment_code": null,
//             "status": null
//         }
//     ],
//     "payment_mode_id": "",
//     "rate": null,
//     "s_freight": null,
//     "s_rate": null,
//     "shipper_id": "",
//     "spot_id": null,
//     "status_id": "",
//     "total": null,
//     "volume_kg": null,
//     "booking_type": {
//         "ID": "37ce1cdf-cd24-4a6a-895e-5e513b175ce6",
//         "name": "AWB"
//     },
//     "partner_prefix": {
//         "ID": "d3139164-9222-4a76-b1fe-c076314d5542",
//         "name": "SG"
//     },
//     "partner_code": {
//         "ID": "6dff33b0-c8a5-4a75-92de-f193d4d12cbb",
//         "name": "115"
//     },
//     "status": null,
//     "origin": {
//         "ID": "9bb940c1-0bc2-417a-a975-6811d5c0b7ea",
//         "name": "BKK"
//     },
//     "destination": {
//         "ID": "9bb940c1-0bc2-417a-a975-6811d5c0b7ea",
//         "name": "BKK"
//     },
//     "commodity_code": null,
//     "payment_mode": null,
//     "currency": {
//         "ID": "60e7921b-9fab-420d-80e0-b5a7ec32d1b8",
//         "name": "IDR"
//     },
//     "bill_to": null,
//     "shipper": null,
//     "consignee": null,
//     "customer": null,
//     "freight_forwarder": null,
//     "organization": null
// };

// const mappedData = mapJsonToSchema(jsonData);
// console.log(JSON.stringify(mappedData, null, 4));
