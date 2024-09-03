import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "currencies"

export const fetchCurrencies = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateCurrency = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addCurrency = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeCurrency = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useCurrencies = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchCurrencies(await belliApi),
  })
}

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updateCurrency(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddCurrency = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addCurrency(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveCurrency = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeCurrency(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
  return mutation
}

export type CurrencyInfo = {
  id: string
  currency_code: string
  currency_name: string
  country: string
  symbol: string
  decimal: boolean
  is_default: boolean
}

export const fetchCurrencyList = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  const _route = route + "/list"
  const { data } = await belliApi.get<APIPaginatedResponse<CurrencyInfo>>(
    `/${_route}`,
    {
      params: {
        ...params,
      },
    }
  )
  return data
}

export const useCurrencyList = (params: PaginationParams) => {
  const _route = route + "/list"
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [_route, params],
    queryFn: async () => await fetchCurrencyList(await belliApi, params),
    placeholderData: keepPreviousData,
  })
}

export const useCurrencySearch = ({ searchTerm }: { searchTerm: string }) => {
  const _route = route + "/search"

  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [_route, searchTerm],
    queryFn: async () =>
      (await belliApi).get<CurrencyInfo[]>(`${_route}/${searchTerm}`),
    placeholderData: keepPreviousData,
  })
}
