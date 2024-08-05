export function isVallidUuid(uuid?: string | null) {
  const allZerosUUID = "00000000-0000-0000-0000-000000000000"
  if (!uuid) return undefined
  return uuid !== allZerosUUID ? uuid : undefined
}

export function findDuplicates(arr: string[]): string[] {
  const duplicates: string[] = []
  const countMap: Record<string, number> = {}

  // Count occurrences of each string
  arr.forEach((str) => {
    countMap[str] = (countMap[str] || 0) + 1
  })

  // Collect strings that appear more than once
  for (const str in countMap) {
    if (countMap[str] > 1) {
      duplicates.push(str)
    }
  }

  return duplicates
}
