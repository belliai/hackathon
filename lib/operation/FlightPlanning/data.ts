import { Unassigned, Assigned, Cart, Uld } from "@/components/operation/FlightPlanning/columns";

export const DUMMY_DATA_UNASSIGNED: Unassigned[] = [
  {
    awb_number: "123-45678901",
    org: "JFK",
    dest: "LAX",
    pieces: "10",
    weight: "500",
    unit: "kg",
    rem_pcs: "2",
    rem_wt: "50",
    priority: "High",
    uom: "kg",
    comm_desc: "Electronics",
    shipper_name: "ABC Corp",
    product_type: "General",
    shc: "GEN",
    flt_date: "2024-06-01",
    scr: "1234",
    remarks: "Handle with care"
  },
  {
    awb_number: "123-45678902",
    org: "ORD",
    dest: "MIA",
    pieces: "5",
    weight: "200",
    unit: "kg",
    rem_pcs: "1",
    rem_wt: "20",
    priority: "Medium",
    uom: "kg",
    comm_desc: "Furniture",
    shipper_name: "XYZ Ltd",
    product_type: "Heavy",
    shc: "HEA",
    flt_date: "2024-06-02",
    scr: "5678",
    remarks: "Fragile items"
  },
  {
    awb_number: "123-45678903",
    org: "ATL",
    dest: "SEA",
    pieces: "15",
    weight: "750",
    unit: "kg",
    rem_pcs: "3",
    rem_wt: "75",
    priority: "Low",
    uom: "kg",
    comm_desc: "Textiles",
    shipper_name: "Textile Co",
    product_type: "General",
    shc: "TXT",
    flt_date: "2024-06-03",
    scr: "9101",
    remarks: "Keep dry"
  },
  {
    awb_number: "123-45678904",
    org: "DFW",
    dest: "SFO",
    pieces: "8",
    weight: "320",
    unit: "kg",
    rem_pcs: "2",
    rem_wt: "30",
    priority: "Medium",
    uom: "kg",
    comm_desc: "Machinery",
    shipper_name: "Machines Inc",
    product_type: "Heavy",
    shc: "MAC",
    flt_date: "2024-06-04",
    scr: "2345",
    remarks: "Handle with care"
  },
  {
    awb_number: "123-45678905",
    org: "LAX",
    dest: "ORD",
    pieces: "12",
    weight: "600",
    unit: "kg",
    rem_pcs: "1",
    rem_wt: "10",
    priority: "High",
    uom: "kg",
    comm_desc: "Pharmaceuticals",
    shipper_name: "Pharma Co",
    product_type: "Perishable",
    shc: "PER",
    flt_date: "2024-06-05",
    scr: "6789",
    remarks: "Refrigerated"
  },
];

export const DUMMY_DATA_ASSIGNED: Assigned[] = [
  {
    awb_number: "789-12345678",
    accepted_pcs: "10",
    bulk_wt: "500",
    uom: "kg",
    cart: "CART123",
    uld: "ULD001",
    unid: "UN1234",
    comm_description: "Electronics",
    product_type: "General",
    scr_status: "Accepted",
    transit: "Direct",
    shc: "GEN"
  },
  {
    awb_number: "789-12345679",
    accepted_pcs: "8",
    bulk_wt: "320",
    uom: "kg",
    cart: "CART124",
    uld: "ULD002",
    unid: "UN1235",
    comm_description: "Machinery",
    product_type: "Heavy",
    scr_status: "In Transit",
    transit: "Via Hub",
    shc: "MAC"
  },
  {
    awb_number: "789-12345680",
    accepted_pcs: "12",
    bulk_wt: "600",
    uom: "kg",
    cart: "CART125",
    uld: "ULD003",
    unid: "UN1236",
    comm_description: "Pharmaceuticals",
    product_type: "Perishable",
    scr_status: "Pending",
    transit: "Direct",
    shc: "PER"
  },
];

export const DUMMY_DATA_CART: Cart[] = [
  {
    cart: "CART001",
    scale_wt: "500",
    weight: "480",
    loading_priority: "High",
    builder_name: "John Doe",
    pol: "JFK",
    pou: "LAX",
    unid: "UN1234"
  },
  {
    cart: "CART002",
    scale_wt: "600",
    weight: "580",
    loading_priority: "Medium",
    builder_name: "Jane Smith",
    pol: "ORD",
    pou: "MIA",
    unid: "UN1235"
  },
  {
    cart: "CART003",
    scale_wt: "700",
    weight: "680",
    loading_priority: "Low",
    builder_name: "Mike Johnson",
    pol: "ATL",
    pou: "SEA",
    unid: "UN1236"
  },
  {
    cart: "CART004",
    scale_wt: "800",
    weight: "780",
    loading_priority: "High",
    builder_name: "Emily Brown",
    pol: "DFW",
    pou: "SFO",
    unid: "UN1237"
  }
];

export const DUMMY_DATA_ULD: Uld[] = [
  {
    uld: "ULD001",
    pol: "JFK",
    pou: "LAX",
    unid: "UN001",
    scale_wt: "1000",
    loading_priority: "High",
    uld_status: "Active",
    awb_wt: "900",
    builder_name: "John Doe",
    uom: "kg",
    flt_stat: "Loaded",
    remarks: "Fragile items"
  },
  {
    uld: "ULD002",
    pol: "ORD",
    pou: "MIA",
    unid: "UN002",
    scale_wt: "1200",
    loading_priority: "Medium",
    uld_status: "Inactive",
    awb_wt: "1100",
    builder_name: "Jane Smith",
    uom: "kg",
    flt_stat: "Unloaded",
    remarks: "Handle with care"
  },
  {
    uld: "ULD003",
    pol: "ATL",
    pou: "SEA",
    unid: "UN003",
    scale_wt: "1500",
    loading_priority: "Low",
    uld_status: "Active",
    awb_wt: "1400",
    builder_name: "Mike Johnson",
    uom: "kg",
    flt_stat: "Transit",
    remarks: "Handle with care"
  },
  {
    uld: "ULD004",
    pol: "DFW",
    pou: "SFO",
    unid: "UN004",
    scale_wt: "1800",
    loading_priority: "High",
    uld_status: "Active",
    awb_wt: "1700",
    builder_name: "Emily Brown",
    uom: "kg",
    flt_stat: "Loaded",
    remarks: "Fragile items"
  },
  {
    uld: "ULD005",
    pol: "LAX",
    pou: "ORD",
    unid: "UN005",
    scale_wt: "2000",
    loading_priority: "Medium",
    uld_status: "Inactive",
    awb_wt: "1900",
    builder_name: "David Lee",
    uom: "kg",
    flt_stat: "Unloaded",
    remarks: "Handle with care"
  },
  {
    uld: "ULD006",
    pol: "JFK",
    pou: "MIA",
    unid: "UN006",
    scale_wt: "2200",
    loading_priority: "Low",
    uld_status: "Active",
    awb_wt: "2100",
    builder_name: "Sarah Wilson",
    uom: "kg",
    flt_stat: "Transit",
    remarks: "Handle with care"
  },
  {
    uld: "ULD007",
    pol: "ORD",
    pou: "SEA",
    unid: "UN007",
    scale_wt: "2400",
    loading_priority: "High",
    uld_status: "Active",
    awb_wt: "2300",
    builder_name: "Michael Brown",
    uom: "kg",
    flt_stat: "Loaded",
    remarks: "Fragile items"
  },
  {
    uld: "ULD008",
    pol: "ATL",
    pou: "SFO",
    unid: "UN008",
    scale_wt: "2600",
    loading_priority: "Medium",
    uld_status: "Inactive",
    awb_wt: "2500",
    builder_name: "Emma Johnson",
    uom: "kg",
    flt_stat: "Unloaded",
    remarks: "Handle with care"
  }
];

export async function getData(param = 'unassigned') {
  switch (param) {
    case 'assigned':
      return DUMMY_DATA_ASSIGNED;
    case 'cart':
      return DUMMY_DATA_CART;
    case 'uld':
      return DUMMY_DATA_ULD;
    default:
      return DUMMY_DATA_UNASSIGNED;
  }
}
