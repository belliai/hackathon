export type Table =
  | "aircraft_types"
  | "tail_numbers"
  | "settings_flights"
  | "dashboard_flights"
  | "dashboard_airway_bills"
  | "partners"
  | "settings_recurrings"

export type Column = {
  id: string
  column_name: string
  real_column_name: string
  sort_order: number
  visible: boolean
}

export type ColumnResponse = {
  non_visible_columns: Column[]
  visible_columns: Column[]
  sticky_columns?: Column[]
}
