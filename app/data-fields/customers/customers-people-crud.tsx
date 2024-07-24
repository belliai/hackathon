import { Checkbox } from "@/components/ui/checkbox"

import CrudTable from "../components/crud-table"

type People = {
  id: string
  name: string
  phone: string
  email: string
  organization: {
    name: string
  }
  isPrimary: boolean
}

export const MOCK_PEOPLE_DATA: People[] = [
  {
    id: "1",
    name: "Alice Johnson",
    phone: "+1-555-1234",
    email: "alice.johnson@example.com",
    organization: {
      name: "TechCorp",
    },
    isPrimary: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    phone: "+1-555-5678",
    email: "bob.smith@example.com",
    organization: {
      name: "Innovate Inc",
    },
    isPrimary: false,
  },
  {
    id: "3",
    name: "Carol Williams",
    phone: "+1-555-8765",
    email: "carol.williams@example.com",
    organization: {
      name: "FutureTech",
    },
    isPrimary: true,
  },
  {
    id: "4",
    name: "David Brown",
    phone: "+1-555-4321",
    email: "david.brown@example.com",
    organization: {
      name: "WebSolutions",
    },
    isPrimary: false,
  },
  {
    id: "5",
    name: "Eve Davis",
    phone: "+1-555-9876",
    email: "eve.davis@example.com",
    organization: {
      name: "AppWorks",
    },
    isPrimary: true,
  },
]

const CustomersPeopleCrud = () => {
  return (
    <CrudTable
      title="People"
      columns={[
        { accessorKey: "name", header: "Name of Contact" },
        { accessorKey: "phone", header: "Phone Number" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "organization.name", header: "Organizations" },
        {
          accessorKey: "isPrimary",
          header: "Is Primary",
          cell: ({ row }) => <Checkbox checked={row.original.isPrimary} />,
        },
      ]}
      form={[
        { name: "id", type: "hidden" },
        {
          name: "organization.name",
          type: "select",
          selectOptions: [
            { label: "FreshFoods Inc", value: "1" },
            { label: "AnimalCare Express", value: "2" },
          ],
          label: "Organization",
        },
        { name: "email", type: "text", label: "Email" },
        { name: "phone", type: "text", label: "Phone Number" },
        { name: "isPrimary", type: "checkbox", label: "Primary Contact" },
      ]}
      data={MOCK_PEOPLE_DATA}
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
    />
  )
}
export default CustomersPeopleCrud
