import { z } from "zod"

export const LoadPlanningFilterSchemas = z.object({
  search: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  status: z.string().optional(),
  filterDate: z.string().optional(),
})

export type FormFilter = z.infer<typeof LoadPlanningFilterSchemas>

export const LoadPlanningLeftSection = z.object({
  unplanned_search: z.string().optional(),
  unplanned_priority: z.string().optional(),
  planned_search: z.string().optional(),
  planned_priority: z.string().optional(),
  details_search: z.string().optional(),
  details_priority: z.string().optional(),
})

export type LeftFormFilter = z.infer<typeof LoadPlanningLeftSection>
