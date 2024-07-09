"use client"

import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { Loader } from "lucide-react"
import moment from "moment"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/data-table/data-table"
import PageHeader from "@/components/layout/PageHeader"

import { getAllUsers } from "./actions/users"

export default function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
  })

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "image_url",
      header: " ",
      cell: ({ row }) => {
        return (
          <Avatar>
            <AvatarImage src={row.original.image_url} />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      accessorKey: "first_name",
      header: "Name",
      cell: ({ row }) => {
        return (
          (row.original.first_name ?? "") + " " + (row.original.last_name ?? "")
        )
      },
    },
    {
      accessorKey: "email_addresses",
      header: "Emails",
      cell: ({ row }) => {
        return row.original.email_addresses
          .map((email: any) => email.email_address)
          .join("\n")
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return moment(row.original.created_at).format("MMM D, YYYY - h:mm A")
      },
    },
    {
      accessorKey: "last_sign_in_at",
      header: "Last Sign In",
      cell: ({ row }) => {
        return moment(row.original.last_sign_in_at).format(
          "MMM D, YYYY - h:mm A"
        )
      },
    },
  ]

  return (
    <div style={{ marginTop: '10px' }}>
      <PageHeader title="Users" />
      {isLoading ? (
        <div className="flex w-full justify-center py-16">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}
    </div>
  )
}
