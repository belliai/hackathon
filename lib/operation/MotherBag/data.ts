import type { Order, CreateDialog } from "@/components/operation/MotherBag/columns";

export const DUMMY_DATA: Order[] = [
  {
    "mb_number": "DL1-24-0001010",
    "piece": "1/1",
    "axb": "775-2000721",
    "origin": "DL1",
    "destination": "B02",
    "weight": "1.00",
    "mwb": "775-20037485",
    "created_at": "18-02-2024 20:30",
    "updated_at": "18-02-2024 20:30"
  },
  {
    "mb_number": "DL1-24-0001011",
    "piece": "1/2",
    "axb": "775-2000722",
    "origin": "DL1",
    "destination": "B03",
    "weight": "2.50",
    "mwb": "775-20037486",
    "created_at": "19-02-2024 21:00",
    "updated_at": "19-02-2024 21:00"
  },
  {
    "mb_number": "DL1-24-0001012",
    "piece": "1/3",
    "axb": "775-2000723",
    "origin": "DL1",
    "destination": "B04",
    "weight": "3.75",
    "mwb": "775-20037487",
    "created_at": "20-02-2024 22:15",
    "updated_at": "20-02-2024 22:15"
  },
  {
    "mb_number": "DL1-24-0001013",
    "piece": "1/4",
    "axb": "775-2000724",
    "origin": "DL1",
    "destination": "B05",
    "weight": "4.00",
    "mwb": "775-20037488",
    "created_at": "21-02-2024 23:45",
    "updated_at": "21-02-2024 23:45"
  },
  {
    "mb_number": "DL1-24-0001014",
    "piece": "1/5",
    "axb": "775-2000725",
    "origin": "DL1",
    "destination": "B06",
    "weight": "5.20",
    "mwb": "775-20037489",
    "created_at": "22-02-2024 08:30",
    "updated_at": "22-02-2024 08:30"
  },
  {
    "mb_number": "DL1-24-0001015",
    "piece": "1/6",
    "axb": "775-2000726",
    "origin": "DL1",
    "destination": "B07",
    "weight": "6.35",
    "mwb": "775-20037490",
    "created_at": "23-02-2024 09:15",
    "updated_at": "23-02-2024 09:15"
  },
  {
    "mb_number": "DL1-24-0001016",
    "piece": "1/7",
    "axb": "775-2000727",
    "origin": "DL1",
    "destination": "B08",
    "weight": "7.50",
    "mwb": "775-20037491",
    "created_at": "24-02-2024 10:30",
    "updated_at": "24-02-2024 10:30"
  },
  {
    "mb_number": "DL1-24-0001017",
    "piece": "1/8",
    "axb": "775-2000728",
    "origin": "DL1",
    "destination": "B09",
    "weight": "8.25",
    "mwb": "775-20037492",
    "created_at": "25-02-2024 11:00",
    "updated_at": "25-02-2024 11:00"
  },
  {
    "mb_number": "DL1-24-0001018",
    "piece": "1/9",
    "axb": "775-2000729",
    "origin": "DL1",
    "destination": "B10",
    "weight": "9.50",
    "mwb": "775-20037493",
    "created_at": "26-02-2024 12:45",
    "updated_at": "26-02-2024 12:45"
  },
  {
    "mb_number": "DL1-24-0001019",
    "piece": "1/10",
    "axb": "775-2000730",
    "origin": "DL1",
    "destination": "B11",
    "weight": "10.00",
    "mwb": "775-20037494",
    "created_at": "27-02-2024 13:30",
    "updated_at": "27-02-2024 13:30"
  }
];

export const DUMMY_DATA_CREATE_DIALOG: CreateDialog[] = [
  {
    truck_no: 'DL1-24',
    truck_date: '27-02-2024 13:30',
    axb: '775-20037485',
    comm_code: 'COMM-001',
    comm_desc: '',
    rem_pcs: '1',
    rem_wt: '2',
    acc_pcs: '1',
    acc_wt: '2',
  },
];

export async function getData() {
  return DUMMY_DATA;
}

export async function getDataCreateDialog() {
  return DUMMY_DATA_CREATE_DIALOG;
}
