import CrudTable from "../components/crud-table"

type Organization = {
  id: string
  name: string
  country: string
  primaryContact: string
}

const MOCK_ORGANIZATION_DATA: Organization[] = [
  {
    id: "1",
    name: "TechCorp",
    country: "USA",
    primaryContact: "Alice Johnson",
  },
  {
    id: "2",
    name: "Innovate Inc",
    country: "Canada",
    primaryContact: "Bob Smith",
  },
  {
    id: "3",
    name: "FutureTech",
    country: "Germany",
    primaryContact: "Carol Williams",
  },
  {
    id: "4",
    name: "WebSolutions",
    country: "Australia",
    primaryContact: "David Brown",
  },
  {
    id: "5",
    name: "AppWorks",
    country: "UK",
    primaryContact: "Eve Davis",
  },
]

const CustomersOrganizationsCrud = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  return (
    <CrudTable
      title="Partner Type"
      columns={[
        { accessorKey: "name", header: "Name" },
        { accessorKey: "country", header: "Country" },
        { accessorKey: "primaryContact", header: "Primary Contact" },
      ]}
      form={[
        { name: "id", type: "hidden" },
        { name: "name", type: "text", label: "Name" },
        { name: "country", type: "text", label: "Country" },
      ]}
      data={MOCK_ORGANIZATION_DATA}
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        // const { id, option } = data
        // if (id) {
        //   update.mutate({ id, name: option })
        // } else {
        //   add.mutate({ name: option })
        // }
      }}
      onDelete={(data) => {
        // configure logic for delete
        // if (data.id) {
        //   remove.mutate({ id: data.id })
        // }
      }}
      tabComponent={tabComponent}
    />
  )
}
export default CustomersOrganizationsCrud
