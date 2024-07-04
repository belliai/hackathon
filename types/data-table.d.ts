import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    isDateFilter?: boolean
    filterSelectOptions?: { value: string; label: string }[]
  }
}
