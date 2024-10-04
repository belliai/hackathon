import { useOrganizationList } from "@clerk/nextjs"

function useAdmin() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const isAdmin = userMemberships.data?.some(
    (data) => data.organization.slug === "admin"
  )

  return {
    isAdmin,
    userMemberships,
  }
}

export { useAdmin }
