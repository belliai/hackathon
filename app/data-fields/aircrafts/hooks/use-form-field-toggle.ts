"use client"

import { useMutation } from "@tanstack/react-query"

import { updateMetadata } from "../actions/update-metadata"
import { formfieldVisibilityMetadata } from "../schemas/form-field-metadata"

export default function useFormFieldToggle(publicMetadata: any) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["metadata-field-update"],
    mutationFn: updateMetadata,
  })

  const metadata = formfieldVisibilityMetadata.safeParse(publicMetadata)

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
