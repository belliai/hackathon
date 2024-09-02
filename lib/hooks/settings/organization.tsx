import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "/organizations/settings"

interface OrganizationSettingsParams {
  sectionKey: string
}

function useGetOrganizationSettings({
  sectionKey,
}: OrganizationSettingsParams) {
  const belli = useBelliApi()

  const query = useQuery({
    queryKey: [route, sectionKey],
    queryFn: async () => {
      const res = await (await belli).get(route + `/${sectionKey}`)

      return res.data
    },
  })

  return query
}

function useUpdateOrganizationSettings({
  sectionKey,
}: OrganizationSettingsParams) {
  const queryClient = useQueryClient()
  const belii = useBelliApi()

  const updateMutation = useMutation({
    mutationKey: [route],
    mutationFn: async (data: any) => {
      const res = await (await belii).patch(route + `/${sectionKey}`, data)

      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route, sectionKey] })
    },
  })

  return updateMutation
}

export { useGetOrganizationSettings, useUpdateOrganizationSettings }
