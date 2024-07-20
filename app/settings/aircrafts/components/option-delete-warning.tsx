"use client"

import { useEffect, useMemo } from "react"
import { LoaderIcon } from "lucide-react"

import { useDeletionInfo } from "@/lib/hooks/aircrafts/aircraft-type/deletion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type Deletee = {
  type: "manufacturer" | "type" | "version"
  label: string
  id: string
}

type AffectedItems = {
  aircraftTypes: string[]
  versions: string[]
  tailNumbers: string[]
} | null

export default function OptionDeleteWarning(props: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (deletee: Deletee) => void
  deletee?: Deletee | null
}) {
  // make a fetch to query the list of affected items according to type and id, and display it
  // when the API from Yusa is ready

  const { data, isFetching } = useDeletionInfo({
    id: props.deletee?.id,
    type: props.deletee?.type,
  })

  const affectedItems: AffectedItems = useMemo(() => {
    if (!data) return null

    switch (data.type) {
      case "manufacturer":
        return {
          aircraftTypes:
            data.manufacturer.aircraft_types?.map((at) => at.name) || [],
          versions:
            data.manufacturer.aircraft_types?.flatMap(
              (at) => at.aircraft_versions?.map((av) => av.version) || []
            ) || [],
          tailNumbers:
            data.manufacturer.tail_numbers?.map((tn) => tn.tail_number) || [],
        }

      case "aircraft_type":
        return {
          aircraftTypes: [data.aircraft_type.name],
          versions:
            data.aircraft_type.aircraft_versions?.map((av) => av.version) || [],
          tailNumbers:
            data.aircraft_type.tail_numbers?.map((tn) => tn.tail_number) || [],
        }

      case "version":
        return {
          aircraftTypes: [],
          versions: [data.version.version],
          tailNumbers:
            data.version.tail_numbers?.map((tn) => tn.tail_number) || [],
        }

      default:
        return null
    }
  }, [data])

  useEffect(() => {
    if (
      props.deletee &&
      affectedItems &&
      Object.values(affectedItems).every((arr) => arr.length === 0)
    ) {
      props.onOpenChange(false)
      props.onConfirm(props.deletee)
    }
  }, [props.deletee, affectedItems, props.onConfirm])

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        {isFetching ? (
          <div className="flex h-40 w-full items-center justify-center">
            <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                Note that Deleting{" "}
                <span className="font-bold">
                  &quot;{props.deletee?.label}&quot;
                </span>{" "}
                will also delete anything associated with this{" "}
                {props.deletee?.type} :
              </AlertDialogTitle>
              {affectedItems && (
                <ul className="list-inside list-disc text-sm">
                  {Object.entries(affectedItems).map(([key, value]) => {
                    if (value.length < 1) return null
                    return (
                      <li key={key}>
                        <span className="font-bold">{value.length}</span>{" "}
                        {key === "aircraftTypes"
                          ? "aircraft types"
                          : key === "versions"
                            ? "aircraft versions"
                            : "aircraft tail numbers"}{" "}
                        <span className="text-muted-foreground">
                          ({value.join(", ")})
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
              <AlertDialogDescription>
                Are you sure you want to delete {props.deletee?.label}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant={"button-primary"}
                onClick={() => {
                  if (props.open && props.deletee) {
                    props.onConfirm(props.deletee)
                  }
                }}
              >
                Yes, Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
