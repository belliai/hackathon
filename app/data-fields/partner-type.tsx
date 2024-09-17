import {
  useAddPartnerType,
  usePartnerTypes,
  useRemovePartnerType,
  useUpdatePartnerType,
} from "@/lib/hooks/partner-types"

import CrudTiledView from "./components/crud-tiled-view"

const PartnerType = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const { isLoading, isPending, error, data } = usePartnerTypes()
  const update = useUpdatePartnerType()
  const add = useAddPartnerType()
  const remove = useRemovePartnerType()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTiledView
      isLoading={isPending}
      title="Partner Type"
      identifier="id"
      className="inline-flex w-full items-center justify-start"
      rowRenderer={(item) => item.option}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Partner Type" },
      ]}
      data={data?.map((item: any) => ({ option: item.name, id: item.ID }))}
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option } = data
        if (id) {
          update.mutate({ id, name: option })
        } else {
          add.mutate({ name: option })
        }
      }}
      onDelete={(data) => {
        // configure logic for delete
        if (data.id) {
          remove.mutate({ id: data.id })
        }
      }}
      tabComponent={tabComponent}
    />
  )
}
export default PartnerType
