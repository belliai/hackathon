import { headers } from "next/headers"
import axios, { AxiosError } from "axios"

export const setHeaders = () => {
  return {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIifQ.3IMwTQ6xRocCmwl3Ciw-GRlPVW_LDC9It4CwC_Bbb",
  }
}

// Create Belli axios instance
export const belliApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: setHeaders(),
})

export function objectToParams(obj: any) {
  const params = new URLSearchParams()
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key])
    }
  }
  return params.toString()
}
