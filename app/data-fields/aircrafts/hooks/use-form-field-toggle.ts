"use client"

import { useClerk, useOrganization } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"

import { updateMetadata } from "../actions/update-metadata"
import { formfieldVisibilityMetadata } from "../schemas/form-field-metadata"

export default function useFormFieldToggle() {
  const { organization } = useOrganization()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["metadata-field-update"],
    mutationFn: updateMetadata,
  })

  const metadata = formfieldVisibilityMetadata.safeParse(
    organization?.publicMetadata
  )

  if (!metadata.success) {
    return {
      data: {},
      update: mutateAsync,
      isPending,
    }
  }

  return {
    data: metadata.data["form-field-visibility"],
    update: mutateAsync,
    isPending,
  }
}
