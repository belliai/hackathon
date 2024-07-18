import { z } from "zod"

const convertToNumber = (value: any) =>
  value != "" ? Number(value) : undefined

export const flightSchema = z.object({
  ID: z.string().optional(),
  flight_no: z.string().min(1, { message: "Flight Number is required" }),
  source_id: z.string().min(1, { message: "Origin is required" }),
  //   origin: z.string().min(1, { message: "Origin is required" }),
  destination_id: z.string().min(1, { message: "Destination is required" }),
  recurring: z.string().min(1, { message: "Recurring is required" }),
  period: z.string().optional(),
  from_date: z.date(),
  to_date: z.date(),
  arrival_h: z.preprocess(convertToNumber, z.number().min(0, "Required")),
  arrival_m: z.preprocess(convertToNumber, z.number().min(0, "Required")),
  arrival_am_pm: z.string(),
  origin_timezone: z.string(),
  departure_h:z.preprocess(convertToNumber, z.number().min(0, "Required")),
  departure_m: z.preprocess(convertToNumber, z.number().min(0, "Required")),
  departure_am_pm: z.string(),
  destination_timezone: z.string(),
  aircraft_type: z
    .string()
    .min(1, { message: "Aircraft Type is required" })
    .optional(),
  tail_no: z.string().min(1, { message: "Tail Number is required" }).optional(),
})

export type FlightSchema = z.infer<typeof flightSchema>
