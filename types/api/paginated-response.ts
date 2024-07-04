interface APIPaginatedResponse<T> {
  data: T[]
  total_records: number
  total_pages: number
  current_page: number
  page_size: number
}
