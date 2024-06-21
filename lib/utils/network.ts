import axios from "axios"
import { headers } from "next/headers"

export const setHeaders = () => {
    return {
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIifQ.3IMwTQ6xRocCmwl3Ciw-GRlPVW_LDC9It4CwC_Bbb"
    }
}

// Create Belli axios instance
export const belliApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: setHeaders()
})

