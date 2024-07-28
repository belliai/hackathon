export function isVallidUuid(uuid?: string | null) {
  const allZerosUUID = "00000000-0000-0000-0000-000000000000"
  if (!uuid) return undefined
  return uuid !== allZerosUUID ? uuid : undefined
}
