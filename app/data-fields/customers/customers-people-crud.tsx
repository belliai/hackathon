import { Building2Icon, UserIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import CrudTiledView from "../components/crud-tiled-view"

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

const CustomersPeopleCrud = ({
  tabComponent,
}: {
  tabComponent?: React.ReactNode
}) => {
  return (
    <CrudTiledView
      title="People"
      identifier="id"
      className="inline-flex w-full items-center justify-between gap-4"
      rowRenderer={(item) => (
        <>
          <div className="col-span-4 inline-flex items-center justify-start gap-2">
            <UserIcon className="size-4 text-muted-foreground" />
            <span>{item.name}</span>
            <span className="text-muted-foreground">{item.email}</span>
            {item.isPrimary && (
              <div className="inline-flex justify-end">
                <Badge className="w-fit text-xs" variant={"secondary"}>
                  Primary
                </Badge>
              </div>
            )}
          </div>
          <div className="col-span-2 inline-flex w-[25%] items-center justify-start gap-2">
            <Building2Icon className="size-4 text-muted-foreground" />
            <span>{item.organization.name}</span>
          </div>
        </>
      )}
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
      tabComponent={tabComponent}
    />
  )
}
export default CustomersPeopleCrud
