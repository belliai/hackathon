import { FlightEpouchType } from "@/components/operation/Export/EpouchFlight/columns";

export const DUMMY_DATA: FlightEpouchType[] = [
  {
    document_name: "Print Load Plan",
    uploaded: 'Y',
    file_uploaded: 'Document 1.pdf',
  },
  {
    document_name: "AWB Copy",
    uploaded: 'N',
    file_uploaded: '',
  },
  {
    document_name: "DG Doc",
    uploaded: 'N',
    file_uploaded: '',
  },
  {
    document_name: "Flight Build Plan Report",
    uploaded: 'Y',
    file_uploaded: 'Document 2.pdf',
  },
  {
    document_name: "Invoice",
    uploaded: 'Y',
    file_uploaded: 'Document 3.pdf',
  },
  {
    document_name: "Cargo Acceptance SLip",
    uploaded: 'Y',
    file_uploaded: 'Document 4.pdf',
  },
  {
    document_name: "POD",
    uploaded: 'N',
    file_uploaded: '',
  },
];

export async function getData() {
  return DUMMY_DATA;
}
