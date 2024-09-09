export type TableItem<T> = {
  columns: { key: string; value: string }[]
  object: T
}
