import { z } from "zod"

const convertToNumber = (value: any) =>
  value != "" ? Number(value) : 0

export const flightSchema = z.object({
  ID: z.string().optional(),
  flight_number: z.string().min(1, { message: "Flight Number is required" }),
  origin_id: z.string().min(1, { message: "Origin is required" }),
  destination_id: z.string().min(1, { message: "Destination is required" }),
  departure_period: z.string().min(1, { message: "AM/PM is required" }),
  departure_date: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Departure Date is required and must be a valid date",
    }),
  departure_hour: z.preprocess(
    convertToNumber,
    z.number().min(1, "Minimum hour is 1").max(12, "max value is 12")
  ),
  departure_minute: z.preprocess(
    convertToNumber,
    z.number().min(0, "Required")
  ),
  flight_duration_hour: z.preprocess(
    convertToNumber,
    z.number().min(0, "Required")
  ),
  flight_duration_minute: z.preprocess(
    convertToNumber,
    z.number().min(0, "Required")
  ),
  tail_id: z.string().min(1, { message: "Tail Number is required" }),
  recurring: z.string().min(1, { message: "Recurring is required" }).optional(),
})

export type FlightSchema = z.infer<typeof flightSchema>
