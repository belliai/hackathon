import { useEffect } from "react"
import * as changeCase from "change-case"
import { SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { TailNumber } from "@/types/aircraft/tail-number"
import { Flight, Specification } from "@/types/flight-master/flight-master"
import { usePartialUpdateFlight } from "@/lib/hooks/flight-master/flight-master"
import { useGetOrganizationSettings } from "@/lib/hooks/settings/organization"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

import CargoCapacityAreaChart from "./cargo-capacity-area-chart"

interface FlightsActualInformation {
  detail: string
  actual?: string
  maximum: string
}

type LoadCapacityTabProps = {
  flight?: Flight | null
  onOpenChange: (open: boolean) => void
}

export default function LoadCapacityTab(props: LoadCapacityTabProps) {
  const { flight } = props

  const { data: cargoDisplaySettings } = useGetOrganizationSettings({
    sectionKey: "cargo",
  })

  const { mutateAsync: partialUpdateFlight } = usePartialUpdateFlight()

  const actualInformationForm = useForm<{ infos: FlightsActualInformation[] }>({
    defaultValues: {
      infos: [{ detail: "", actual: "", maximum: "" }],
    },
  })

  useEffect(() => {
    if (!flight) return
    const visibleActualInformationFields = generateActualValues(
      getVisibleCargoFields(cargoDisplaySettings),
      flight
    )

    actualInformationForm.reset({
      infos: visibleActualInformationFields,
    })
  }, [flight])

  async function handleSaveActualInformation() {
    const data = actualInformationForm.getValues().infos
    if (!flight) {
      toast({
        title: "Error",
        description: "No flight selected",
      })

      return
    }

    const updatedActualInformation = data.reduce((acc, info) => {
      return {
        ...acc,
        [`${changeCase.snakeCase(info.detail)}`]: info.actual
          ? Number(info.actual)
          : 0,
      }
    }, {})

    await partialUpdateFlight(
      {
        ...updatedActualInformation,
        id: flight.id,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update actual information",
          })
        },
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Actual information updated successfully",
          })
          props.onOpenChange(false)
        },
      }
    )
  }
  return (
    <>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Details</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Maximum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actualInformationForm.getValues().infos.map((info, index) => (
              <TableRow key={index}>
                <TableCell>{info.detail}</TableCell>
                <TableCell className="w-28">
                  <Input
                    {...actualInformationForm.register(`infos.${index}.actual`)}
                    type="number"
                    className="h-9 w-full py-0.5"
                  />
                </TableCell>
                <TableCell className="w-28">{info.maximum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2 className="font-semibold">Historical Load Capacity</h2>
        <CargoCapacityAreaChart />
      </div>
      <div className="inline-flex items-center justify-end gap-2">
        <Button onClick={handleSaveActualInformation}>
          <SaveIcon className="mr-2 size-4" />
          Save
        </Button>
      </div>
    </>
  )
}

function generateActualValues(visibleFields: string[], flight: Flight) {
  const visible = visibleFields
    .map((field) => {
      if (field.endsWith("_actual")) {
        const tailField = field.replace("_actual", "")

        return {
          detail: changeCase.capitalCase(field.replace("_actual", "")),
          actual:
            flight.specification?.[tailField as keyof Specification] || "",
          maximum: flight.tail?.[tailField as keyof TailNumber] || "",
        }
      }
    })
    .filter((field) => field && field.actual !== "visible")

  return visible as FlightsActualInformation[]
}

function getVisibleCargoFields(visibilityConfig: any) {
  const visibleFields = Object.keys(visibilityConfig).filter(
    (key) => visibilityConfig[key]
  )

  return visibleFields
}
