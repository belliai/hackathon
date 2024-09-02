import { useEffect, useRef } from "react"
import { Info, SaveIcon } from "lucide-react"
import { DefaultValues, Path, PathValue, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import InputSwitch from "@/components/form/InputSwitch"

type Field = { name: string; label: string }

type FieldSectionVisibilityTogglesProps<
  Key extends string,
  Fields extends Field[],
> = {
  sectionKey: Key
  apiSectionKey?: string
  fields: Fields
  defaultValues?: DefaultValues<Record<Fields[0]["name"], boolean>>
  isSaving?: boolean
  defaultVisible: boolean
  onSave: (params: {
    sectionKey: Key
    fields: Record<Fields[0]["name"], boolean>
  }) => void
}

export default function FieldSectionVisibilityToggles<
  Key extends string,
  Fields extends Field[],
>(props: FieldSectionVisibilityTogglesProps<Key, Fields>) {
  const isMounted = useRef<boolean>(false)

  const form = useForm<Record<Fields[0]["name"], boolean>>({
    defaultValues:
      props.defaultValues ??
      props.fields.reduce(
        (acc, field) => {
          return { ...acc, [field.name]: props.defaultVisible }
        },
        {} as DefaultValues<Record<Fields[0]["name"], boolean>>
      ),
  })

  useEffect(() => {
    if (props.defaultValues && !isMounted.current) {
      form.reset(props.defaultValues)
      isMounted.current = true
    }
  }, [form, props.defaultValues])

  const formValues = form.watch()

  const handleSwitchChange = (val: boolean) => {
    props.fields.forEach((field) =>
      form.setValue(
        field.name as Path<Record<Fields[0]["name"], boolean>>,
        val as PathValue<
          Record<Fields[0]["name"], boolean>,
          Path<Record<Fields[0]["name"], boolean>>
        >
      )
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          props.onSave({ sectionKey: props.sectionKey, fields: data })
        )}
        className="space-y-4"
      >
        <div className="flex w-full flex-row justify-between">
          <div className="inline-flex items-center gap-2">
            <Switch
              checked={Object.values(formValues).some((item) => !!item)}
              onCheckedChange={handleSwitchChange}
            />
            <FormLabel className="text-xs font-semibold text-muted-foreground">
              Display this section?
            </FormLabel>
          </div>

          <Button
            isLoading={props.isSaving}
            type="submit"
            variant={"button-primary"}
            size={"sm"}
          >
            <SaveIcon className="mr-2 size-4" />
            Save
          </Button>
        </div>
        <div className="space-y-2">
          <div className="grid w-full grid-cols-3 px-3 py-1.5 text-sm">
            <div />
            <div className="ml-auto flex items-center gap-2">
              <span>Actual Value</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="opacity-50" />
                </TooltipTrigger>
                <TooltipContent className="dark:bg-zinc-900 dark:text-white">
                  User will be able to view and update the value of this field
                  on for every flight
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span>Field</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="opacity-50" />
                </TooltipTrigger>
                <TooltipContent className="dark:bg-zinc-900 dark:text-white">
                  Visibility of this field in the section
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {props.fields.map((field) => {
            return (
              <Card
                key={field.name}
                className="group grid w-full grid-cols-3 border bg-zinc-900/50 px-3 py-1.5 text-sm"
              >
                <span>{field.label}</span>
                <InputSwitch
                  name={field.name + "_actual"}
                  type="switch"
                  className="ml-auto"
                />
                <InputSwitch
                  name={field.name}
                  type="switch"
                  className="ml-auto"
                />
              </Card>
            )
          })}
        </div>
      </form>
    </Form>
  )
}
