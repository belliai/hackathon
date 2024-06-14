import { ScreeningReportType } from "@/components/reports/Standard/Screening/columns";

export const DUMMY_DATA: ScreeningReportType[] = [
  {
    awb: "1234567890",
    pcs: "10",
    weight: "500kg",
    agent: "Agent A",
    shipper: "Shipper X",
    commodity: "Electronics",
    shc: "GEN",
    token: "TK123",
    known_shipper: "Yes",
    dimension: "120x80x60cm",
    is_accepted: "Yes",
    acceptance_method: "Manual"
  },
  {
    awb: "0987654321",
    pcs: "5",
    weight: "300kg",
    agent: "Agent B",
    shipper: "Shipper Y",
    commodity: "Clothing",
    shc: "GEN",
    token: "TK456",
    known_shipper: "No",
    dimension: "100x60x40cm",
    is_accepted: "No",
    acceptance_method: "Automated"
  },
  {
    awb: "1122334455",
    pcs: "2",
    weight: "100kg",
    agent: "Agent C",
    shipper: "Shipper Z",
    commodity: "Books",
    shc: "GEN",
    token: "TK789",
    known_shipper: "Yes",
    dimension: "50x40x30cm",
    is_accepted: "Yes",
    acceptance_method: "Manual"
  },
  {
    awb: "5566778899",
    pcs: "7",
    weight: "200kg",
    agent: "Agent D",
    shipper: "Shipper W",
    commodity: "Furniture",
    shc: "GEN",
    token: "TK101",
    known_shipper: "No",
    dimension: "200x100x80cm",
    is_accepted: "Yes",
    acceptance_method: "Automated"
  },
  {
    awb: "6677889900",
    pcs: "3",
    weight: "150kg",
    agent: "Agent E",
    shipper: "Shipper V",
    commodity: "Toys",
    shc: "GEN",
    token: "TK202",
    known_shipper: "Yes",
    dimension: "70x50x40cm",
    is_accepted: "No",
    acceptance_method: "Manual"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
