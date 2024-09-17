import { z } from "zod"

const convertToNumber = (value: any) => (value != "" ? Number(value) : 0)

export const flightSchema = z
  .object({
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
    departure_time: z
      .date()
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Departure time is required and must be a valid time",
      })
      .optional(),
    departure_hour: z.preprocess(
      convertToNumber,
      z.number().min(1, "Minimum hour is 1").max(12, "max value is 12")
    ),
    departure_minute: z.preprocess(
      convertToNumber,
      z.number().min(0, "Required")
    ),
    arrival_date: z
      .date()
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Arrival Date is required and must be a valid date",
      }),

    flight_duration_hour: z.preprocess(
      convertToNumber,
      z
        .number()
        .min(0, "Invalid duration, please recheck departure and arrival times")
    ),
    flight_duration_minute: z.preprocess(
      convertToNumber,
      z
        .number()
        .min(0, "Invalid duration, please recheck departure and arrival times")
    ),
    tail_id: z.string().min(1, { message: "Tail Number is required" }),
    recurring: z
      .string()
      .min(1, { message: "Recurring is required" })
      .optional(),
    selection_flight: z
      .string()
      .min(1, { message: "Selection flight is required" })
      .optional(),
    recurring_every: z.coerce
      .number()
      .min(1, { message: "Recurring count is required" })
      .optional(),
    recurring_period: z
      .string()
      .min(1, { message: "Recurring period is required" })
      .optional(),
    days: z.array(z.any()).optional(),
    end_date: z
      .date()
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Date is required and must be a valid date",
      })
      .optional(),
    end_condition: z.string().optional(),
    end_after_occurrences: z.coerce.number().optional(),
  })
  .refine(
    (data) =>
      data.end_condition !== "on_date" ||
      (data.end_condition === "on_date" && data.end_date),
    {
      message: "Date is required",
      path: ["end_date"], // The path to the field that should be filled
    }
  )
  .refine(
    (data) =>
      data.end_condition !== "after_occurrences" ||
      (data.end_condition === "after_occurrences" &&
        data.end_after_occurrences),
    {
      message: "recurring occurence is required",
      path: ["end_after_occurences"],
    }
  )

export type FlightSchema = z.infer<typeof flightSchema>
