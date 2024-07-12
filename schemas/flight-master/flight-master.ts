import { z } from "zod"

export const flightMasterFormSchema = z.object({
  flightNo: z.string().min(1, { message: "Flight Number is required" }),
  source: z.string().min(1, { message: "Source is required" }),
  destination: z.string().min(1, { message: "Destination is required" }),
  recurring: z.string().min(1, { message: "Recurring is required" }),
  period: z.string().optional(),
  rangeDate: z
    .object({
      from: z.date(),
      to: z.date(),
      fromTime: z.string(),
      toTime: z.string(),
    })
    .optional(),
  fromDate: z.date(),
  toDate: z.date(),
  frequencyItems: z.array(z.string()).optional(),
  aircraftType: z.string().min(1, { message: "Aircraft Type is required" }),
  tailNo: z.string().min(1, { message: "Tail Number is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  uom: z.string().min(1, { message: "UOM is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  flightType: z.string().min(1, { message: "Flight Type is required" }),
  deptTime: z
    .object({
      deptDay: z.string().min(1, { message: "Dept Day is required" }),
      deptHour: z.string().min(1, { message: "Dept Hour is required" }),
      deptMinute: z.string().min(1, { message: "Dept Minute is required" }),
    })
    .partial()
    .refine(
      (data) =>
        data.deptDay !== "" && data.deptHour !== "" && data.deptMinute !== "",
      {
        message: "Dept Time is required",
        path: ["deptDay"],
      }
    ),
  arrivalTime: z
    .object({
      arrivalDay: z.string().min(1, { message: "Arrival Day is required" }),
      arrivalHour: z.string().min(1, { message: "Arrival Hour is required" }),
      arrivalMinute: z
        .string()
        .min(1, { message: "Arrival Minute is required" }),
    })
    .partial()
    .refine(
      (data) =>
        data.arrivalDay !== "" &&
        data.arrivalHour !== "" &&
        data.arrivalMinute !== "",
      {
        message: "Arrival Time is required",
        path: ["arrivalDay"],
      }
    ),
})

export type FlightMasterFormValue = z.infer<typeof flightMasterFormSchema>
