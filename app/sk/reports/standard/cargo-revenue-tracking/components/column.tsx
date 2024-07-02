"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CargoRevenueColumnType = {
  sector: string;
  flight_no: string;
  gross_wt: string;
  chargeable_wt: string;
  wt_charges: string;
  valuation_charges: string;
  ocdc: string;
  insurance_charge: string;
  fsc: string;
  total_gross_revenue: string;
  e_vat: string;
  gross_yield: string;
  true_yield: string;
};

export const columns: ColumnDef<CargoRevenueColumnType>[] = [
  {
    header: 'Sector',
    accessorKey: 'sector',
  },
  {
    header: 'Flight No',
    accessorKey: 'flight_no',
  },
  {
    header: 'Gross WT',
    accessorKey: 'gross_wt',
  },
  {
    header: 'Chargeable WT',
    accessorKey: 'chargeable_wt',
  },
  {
    header: 'WT Charges',
    accessorKey: 'wt_charges',
  },
  {
    header: 'Valuation Charges',
    accessorKey: 'valuation_charges',
  },
  {
    header: 'OCDC',
    accessorKey: 'ocdc',
  },
  {
    header: 'Insurance Charge',
    accessorKey: 'insurance_charge',
  },
  {
    header: 'FSC',
    accessorKey: 'fsc',
  },
  {
    header: 'Total Gross Revenue',
    accessorKey: 'total_gross_revenue',
  },
  {
    header: 'E-VAT',
    accessorKey: 'e_vat',
  },
  {
    header: 'Gross Yield',
    accessorKey: 'gross_yield',
  },
  {
    header: 'True Yield',
    accessorKey: 'true_yield',
  }
];

export const DUMMY_DATA: CargoRevenueColumnType[] = [
  {
    "sector": "NYC-LON",
    "flight_no": "BA117",
    "gross_wt": "1000.50",
    "chargeable_wt": "950.00",
    "wt_charges": "500.75",
    "valuation_charges": "100.50",
    "ocdc": "50.25",
    "insurance_charge": "30.75",
    "fsc": "75.50",
    "total_gross_revenue": "757.50",
    "e_vat": "75.75",
    "gross_yield": "1.10",
    "true_yield": "1.05"
  },
  {
    "sector": "LAX-TKO",
    "flight_no": "JL701",
    "gross_wt": "1500.75",
    "chargeable_wt": "1400.00",
    "wt_charges": "750.50",
    "valuation_charges": "120.75",
    "ocdc": "60.30",
    "insurance_charge": "40.25",
    "fsc": "100.60",
    "total_gross_revenue": "1072.40",
    "e_vat": "107.24",
    "gross_yield": "1.15",
    "true_yield": "1.10"
  },
  {
    "sector": "CHI-DXB",
    "flight_no": "EK236",
    "gross_wt": "1100.25",
    "chargeable_wt": "1050.00",
    "wt_charges": "550.85",
    "valuation_charges": "115.40",
    "ocdc": "55.75",
    "insurance_charge": "35.50",
    "fsc": "85.75",
    "total_gross_revenue": "842.25",
    "e_vat": "84.22",
    "gross_yield": "1.20",
    "true_yield": "1.15"
  },
  {
    "sector": "HOU-SYD",
    "flight_no": "QF8",
    "gross_wt": "2000.00",
    "chargeable_wt": "1900.00",
    "wt_charges": "1000.00",
    "valuation_charges": "200.00",
    "ocdc": "100.00",
    "insurance_charge": "60.00",
    "fsc": "150.00",
    "total_gross_revenue": "1510.00",
    "e_vat": "151.00",
    "gross_yield": "1.25",
    "true_yield": "1.20"
  },
  {
    "sector": "MIA-PAR",
    "flight_no": "AF99",
    "gross_wt": "1200.60",
    "chargeable_wt": "1150.00",
    "wt_charges": "600.30",
    "valuation_charges": "130.15",
    "ocdc": "65.10",
    "insurance_charge": "45.05",
    "fsc": "90.20",
    "total_gross_revenue": "930.80",
    "e_vat": "93.08",
    "gross_yield": "1.30",
    "true_yield": "1.25"
  },
  {
    "sector": "SEA-HKG",
    "flight_no": "CX87",
    "gross_wt": "1800.85",
    "chargeable_wt": "1700.00",
    "wt_charges": "900.42",
    "valuation_charges": "150.20",
    "ocdc": "75.10",
    "insurance_charge": "50.15",
    "fsc": "120.30",
    "total_gross_revenue": "1295.92",
    "e_vat": "129.59",
    "gross_yield": "1.35",
    "true_yield": "1.30"
  },
  {
    "sector": "SFO-AMS",
    "flight_no": "KL606",
    "gross_wt": "1300.90",
    "chargeable_wt": "1250.00",
    "wt_charges": "650.45",
    "valuation_charges": "135.50",
    "ocdc": "67.75",
    "insurance_charge": "47.50",
    "fsc": "95.00",
    "total_gross_revenue": "996.20",
    "e_vat": "99.62",
    "gross_yield": "1.40",
    "true_yield": "1.35"
  }
];
