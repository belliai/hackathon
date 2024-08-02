import { z } from "zod"

import { aircraftGeneralFieldsFormSchema } from "./general-fields"

export const aircraftFormSchema = z.object({
  aircraft_type_id: z.string().min(1, "required"),
  manufacturer_id: z.string().min(1, "required"),
  version_id: z.string().min(1, "required"),
  ...aircraftGeneralFieldsFormSchema.shape,
})

export type AircraftFormValues = z.infer<typeof aircraftFormSchema>
