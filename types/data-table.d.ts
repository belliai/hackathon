import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    filterSelectOptions?: { value: string; label: string }[];
  }
}
