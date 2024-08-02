import { z } from "zod"

export const formfieldVisibilityMetadata = z.object({
  "form-field-visibility": z.record(z.record(z.record(z.boolean()))),
})
