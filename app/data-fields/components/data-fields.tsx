import { PropsWithChildren } from "react"
import { LucideIcon, PencilIcon, Trash2 } from "lucide-react"
import { DefaultValues, FieldValues, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import InputSwitch, { InputSwitchProps } from "@/components/form/InputSwitch"

import { FormDialog } from "./crud-table"

interface DataFieldsItemContentProps<T extends FieldValues> {
  title: string
  subtitle?: string
  data: T
  icon?: React.ReactNode
  onSave: (data: T) => void
  onDelete?: () => void
  form: InputSwitchProps<T>[]
  selectedEditing: string | null
  setSelectedEditing: (isEditing: string | null) => void
  columnSpans: number[]
}

function DataFieldsItemContent<T extends FieldValues>({
  title,
  data,
  subtitle,
  icon,
  onSave,
  onDelete,
  form,
  selectedEditing,
  setSelectedEditing,
  columnSpans, // Need to equal to 12
}: DataFieldsItemContentProps<T>) {
  const formContext = useFormContext()

  const formWithoutHidden = form.filter((f) => f.type !== "hidden")

  // If there is only one form then we can use the inline form
  const shouldUseModal = formWithoutHidden.length > 1

  function handleOpenEdit() {
    if (!shouldUseModal) {
      formContext.reset({ ...data })
    }

    setSelectedEditing(data.id || data.ID)
  }

  function handleCancelEdit() {
    setSelectedEditing(null)
  }

  function handleSaveEdit() {
    formContext.handleSubmit((data) => onSave(data as T))()
    setSelectedEditing(null)
  }

  const isEditing = selectedEditing === (data.id || data.ID)

  const { id, ID, created_at, updated_at, ...cleanDataToMap } = data

  const cleanDataToMapArray = Object.values(cleanDataToMap)

  return (
    <>
      {shouldUseModal && (
        <FormDialog
          form={form}
          open={shouldUseModal && isEditing}
          setOpen={(open) => {
            if (!open) {
              setSelectedEditing(null)
            } else {
              setSelectedEditing(data.id || data.ID)
            }
          }}
          onSave={onSave}
          data={data as DefaultValues<T>}
          title={title}
        />
      )}
      {!shouldUseModal && isEditing ? (
        <div className="flex w-full gap-4">
          <InputSwitch
            {...formWithoutHidden[0]}
            label={undefined}
            className="bg-zinc-900/50"
          />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleCancelEdit}
              size="sm"
              className="h-9"
            >
              Cancel
            </Button>
            <Button
              variant="button-primary"
              onClick={handleSaveEdit}
              size="sm"
              className="h-9"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-full items-center justify-between gap-2 text-sm">
          <div className="flex w-full gap-2">
            {icon && <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
            <div className="grid w-full grid-cols-12 gap-4">
              {cleanDataToMapArray.map((value, index) => {
                const isLongText =
                  typeof value === "string" && value.length > 10

                return (
                  <div
                    key={index}
                    className={cn("flex w-full")}
                    style={{
                      gridColumn: `span ${columnSpans[index]} / span ${columnSpans[index]} `,
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className={cn({
                          "pointer-events-none": !isLongText,
                        })}
                      >
                        <span
                          className={cn("truncate text-muted-foreground", {
                            "text-white": index === 0,
                          })}
                        >
                          {value}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-60 border bg-card text-foreground"
                      >
                        {value}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 opacity-50 hover:bg-transparent hover:opacity-100"
              onClick={handleOpenEdit}
            >
              <PencilIcon type="button" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 opacity-50 transition-opacity duration-200 hover:bg-transparent hover:opacity-100"
              onClick={onDelete}
            >
              <Trash2 type="button" size={14} />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function DataFieldsItem({ children }: PropsWithChildren) {
  return (
    <div className="group flex justify-between rounded-sm border bg-zinc-900/50 px-3 py-1.5">
      {children}
    </div>
  )
}

function DataFields({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-1.5">{children}</div>
}

export { DataFields, DataFieldsItem, DataFieldsItemContent }
