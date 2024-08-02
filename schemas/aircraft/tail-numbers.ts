import { z } from "zod"

import { aircraftGeneralFieldsFormSchema } from "./general-fields"

export const tailNumberFormSchema = z.object({
  tail_number: z.string().min(1, "Required"),
  aircraft_id: z.string().min(1, "Required"),
  status_id: z.string().uuid().optional(),
  ...aircraftGeneralFieldsFormSchema.shape,
})

export type TailNumberFormValues = z.infer<typeof tailNumberFormSchema>
