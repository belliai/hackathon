import { useAuth } from "@clerk/nextjs"
import axios, { AxiosInstance } from "axios"

type GetToken = () => Promise<string | null>

export const setHeaders = async (getToken: GetToken) => {
  const token = await getToken()
  if (!token) {
    throw new Error("No token available")
  }
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const createBelliApi = async (
  getToken: GetToken
): Promise<AxiosInstance> => {
  const headers = await setHeaders(getToken)
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
  })

  // Intercept requests to refresh token if expired
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const newToken = await getToken()
        if (newToken) {
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${newToken}`
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        }
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export function objectToParams(obj: any) {
  const params = new URLSearchParams()
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key])
    }
  }
  return params.toString()
}

// Wrapper to create Belli API instance with Clerk token
export const useBelliApi = () => {
  const { getToken } = useAuth()
  return createBelliApi(getToken)
}
