"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

import { formfieldVisibilityMetadata } from "../schemas/form-field-metadata"

export const updateMetadata = async (input: {
  groupKey: string
  sectionKey: string
  fields: Record<string, boolean>
}) => {
  const { groupKey, sectionKey, fields } = input
  const orgId = auth().orgId
  if (!orgId) return false

  // Retrieve the current metadata
  const organization = await clerkClient.organizations.getOrganization({
    organizationId: orgId,
  })
  const metadata = formfieldVisibilityMetadata.safeParse(
    organization.publicMetadata
  ).data

  // Update the metadata with the new fields
  const updatedMetadata = {
    ...metadata,
    "form-field-visibility": {
      ...(metadata?.["form-field-visibility"] || {}),
      [groupKey]: {
        ...(metadata?.["form-field-visibility"]?.[groupKey] || {}),
        [sectionKey]: {
          ...fields,
        },
      },
    },
  }

  // Save the updated metadata back to the organization
  await clerkClient.organizations.updateOrganizationMetadata(orgId, {
    publicMetadata: updatedMetadata,
  })

  return true
}
