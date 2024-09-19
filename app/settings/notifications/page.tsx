"use client"

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, SaveIcon, ToggleRightIcon, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useCopyToClipboard } from "usehooks-ts"
import { z } from "zod"

import { useStatuses } from "@/lib/hooks/statuses"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import InputSwitch from "@/components/form/InputSwitch"

const notificationsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  active: z.boolean(),
  condition: z.object({
    subject: z.string(),
    operator: z.string(),
    subject_state: z.string(),
  }),
  email_subject: z.string(),
  email_content: z.string(),
})

type Notifications = z.infer<typeof notificationsSchema> & { id: string }

const mockCustomNotifications = [
  {
    id: "1",
    active: true,
    name: "AWB Delivery Complete",
    condition: {
      subject: "1",
      operator: "is",
      subject_state: "3420c417-1d92-4481-bdcb-794b6e2bed03", // Complete
    },
    email_subject: "AWB [AWB_NUMBER] delivery complete",
    email_content: "Your AWB [AWB_NUMBER] has been delivered successfully.",
  },
  {
    id: "2",
    active: true,
    name: "New AXB Booking",
    condition: {
      subject: "1",
      operator: "is",
      subject_state: "a6c2c0ce-a7ac-4d20-a441-942125da7ba2", // AXB Booked & Confirmed
    },
    email_subject: "New Booking Confirmed for AXB [AWB_NUMBER]",
    email_content: "Your AXB booking for AWB [AWB_NUMBER] has been confirmed.",
  },
  {
    id: "3",
    active: true,
    name: "AWB Shipment Delayed",
    condition: {
      subject: "1",
      operator: "is",
      subject_state: "a08f7259-ba65-484b-9376-bed0301fe673", // Delayed
    },
    email_subject: "AWB [AWB_NUMBER] shipment delayed",
    email_content:
      "We regret to inform you that your AWB [AWB_NUMBER] has been delayed.",
  },
  {
    id: "4",
    active: true,
    name: "AWB Shipped Notification",
    condition: {
      subject: "1",
      operator: "is",
      subject_state: "20b0eae6-868b-42ca-b511-b94e0f1b10d9", // Shipped
    },
    email_subject: "AWB [AWB_NUMBER] has been shipped",
    email_content: "Your AWB [AWB_NUMBER] has been shipped and is on its way.",
  },
  {
    id: "5",
    active: true,
    name: "AWB Delivered Notification",
    condition: {
      subject: "1",
      operator: "is",
      subject_state: "a07bbff2-e903-4344-9910-7df1f0de936d", // Delivered
    },
    email_subject: "AWB [AWB_NUMBER] has been delivered",
    email_content: "Your AWB [AWB_NUMBER] has been successfully delivered.",
  },
]

const conditionOptions = [
  {
    subjectName: "AWB Status",
    subjectId: "1",
    operators: ["is", "is not"],
    states: ["Arrived", "En Route", "Received"],
  },
]

const variables = [
  "[AWB_NUMBER]",
  "[AWB_ORIGIN]",
  "[AWB_DESTINATION]",
  "[AWB_SHIPPER]",
  "[AWB_RECEIVER]",
  "[AWB_DEPARTURE_DATE]",
  "[AWB_ARRIVAL_DATE]",
  "[AWB_DEPARTURE_TIME]",
  "[AWB_ARRIVAL_TIME]",
]

export default function NotificationSettingsPage() {
  const [customNotifications, setCustomNotifications] = useState<
    Notifications[]
  >(mockCustomNotifications)

  const [formOpen, setFormOpen] = useState<string | boolean>(false)

  const form = useForm<Notifications>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: { active: true },
  })

  const { data: statuses } = useStatuses()

  const awbStatusStateOptions =
    statuses?.map((item) => ({ value: item.ID, label: item.name })) ?? []

  const [, copy] = useCopyToClipboard()

  const conditionSubjectOptions = conditionOptions.map((item) => ({
    value: item.subjectId,
    label: item.subjectName,
  }))

  const selectedConditionSubject = form.watch("condition.subject")

  const subjectStatesOptionsMap: Record<
    string,
    { value: string; label: string }[]
  > = {
    "1": awbStatusStateOptions,
  }

  const [conditionOperatorOptions, conditionStateOptions] = useMemo(() => {
    form.resetField("condition.operator")
    form.resetField("condition.subject_state")
    const conditionSubject = conditionOptions.find(
      (item) => item.subjectId === selectedConditionSubject
    )

    if (!conditionSubject) return [[], []]

    return [
      conditionSubject?.operators.map((item) => ({
        value: item,
        label: item,
      })),
      conditionSubject?.states.map((item) => ({
        value: item,
        label: item,
      })),
    ]
  }, [selectedConditionSubject])

  useEffect(() => {
    if (typeof formOpen === "string") {
      const customNotification = customNotifications.find(
        (item) => item.id === formOpen
      )
      if (!customNotification) return
      form.reset(customNotification)
    } else {
      form.reset({ active: true })
    }
  }, [formOpen])

  const onSubmit = (data: Notifications) => {
    console.log(data)
    setFormOpen(false)
    setCustomNotifications((prev) => {
      if (data.id) {
        // Check if the notification with this ID already exists
        const existingNotificationIndex = prev.findIndex(
          (item) => item.id === data.id
        )

        if (existingNotificationIndex !== -1) {
          // If it exists, update the notification
          const updatedNotifications = [...prev]
          updatedNotifications[existingNotificationIndex] = data
          return updatedNotifications
        } else {
          // If it doesn't exist, add the new notification
          return [...prev, data]
        }
      } else {
        // If no ID, handle new notification
        return [...prev, { ...data, id: crypto.randomUUID() }]
      }
    })
    toast({
      title: "Success!",
      description: "Custom Notification has been saved",
    })
  }

  const onDelete = (id: string) => {
    setCustomNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    )
    toast({
      title: "Success!",
      description: "Custom Notification has been deleted",
    })
  }

  const toggleActive = (id: string) => {
    setCustomNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, active: !notification.active }
          : notification
      )
    )
    toast({
      title: "Success!",
      description: "Custom Notification has been modified",
    })
  }

  return (
    <section className="flex w-full flex-row justify-center">
      <div className="w-[800px] space-y-4">
        <div className="inline-flex w-full items-center justify-between">
          <h1 className="text-lg font-bold">Custom Notifications</h1>
          <Button size={"sm"} onClick={() => setFormOpen(true)}>
            <PlusIcon className="size-4" />
            Add New
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {customNotifications.map((item) => (
            <Button
              asChild
              key={item.id}
              variant={"secondary"}
              className="cursor-pointer text-foreground"
              onClick={() => setFormOpen(item.id)}
            >
              <Card className="group inline-flex items-center justify-between border bg-zinc-900/50 px-3 py-1.5 text-sm">
                <div className="inline-flex items-center gap-4">
                  <Switch
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleActive(item.id)
                    }}
                    checked={item.active}
                  />
                  <h3>{item.name}</h3>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Button
                    onClick={() => onDelete(item.id)}
                    variant={"ghost"}
                    size={"fit"}
                  >
                    <Trash2Icon className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                  </Button>
                </div>
              </Card>
            </Button>
          ))}
        </div>
      </div>
      <Sheet open={!!formOpen} onOpenChange={setFormOpen}>
        <SheetContent className="!min-w-[600px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
              className="flex h-full flex-col justify-between gap-4"
            >
              <SheetHeader>
                <SheetTitle>
                  {typeof formOpen === "string"
                    ? "Edit Custom Notification"
                    : "Create Custom Notification"}
                </SheetTitle>
              </SheetHeader>
              <div className="custom-scrollbar -mx-3 flex-1 space-y-3 overflow-y-auto overflow-x-visible px-3">
                <InputSwitch<Notifications>
                  name="name"
                  label="Name"
                  placeholder="Name of your custom notification"
                  type="text"
                />
                <Card className="bg-muted/30">
                  <CardHeader>
                    <div className="inline-flex items-center gap-2">
                      <ToggleRightIcon className="size-5 text-muted-foreground" />
                      <CardTitle className="text-sm">
                        Trigger Condition
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex flex-row flex-wrap items-center gap-2.5">
                      <span className="text-muted-foreground">When</span>{" "}
                      <InputSwitch<Notifications>
                        name="condition.subject"
                        type="combobox"
                        className="h-fit min-w-24 !border-[1px] border-zinc-900 bg-background/50 px-2 py-1.5 text-xs hover:bg-transparent"
                        selectOptions={conditionSubjectOptions}
                      />
                      <InputSwitch<Notifications>
                        name="condition.operator"
                        type="combobox"
                        className="h-fit min-w-16 !border-[1px] border-zinc-900 bg-background/50 px-2 py-1.5 text-xs hover:bg-transparent"
                        selectOptions={conditionOperatorOptions}
                      />
                      <InputSwitch<Notifications>
                        name="condition.subject_state"
                        type="combobox"
                        className="h-fit min-w-24 !border-[1px] border-zinc-900 bg-background/50 px-2 py-1.5 text-xs hover:bg-transparent"
                        selectOptions={
                          subjectStatesOptionsMap[selectedConditionSubject] ||
                          conditionStateOptions
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                <h1 className="font-semibold">Message</h1>
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardDescription className="text-sm">
                      You can add variables using the syntax/shortcode below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex flex-row flex-wrap gap-2">
                      {variables.map((variable) => (
                        <Badge
                          onClick={() => {
                            copy(variable)
                            toast({ description: "Copied to clipboard" })
                          }}
                          key={variable}
                          className="cursor-pointer border-button-primary/50 bg-button-primary/20 px-1.5 py-0.5 text-xs font-medium hover:bg-button-primary/30"
                          variant={"secondary"}
                        >
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <InputSwitch<Notifications>
                  name="email_subject"
                  type="text"
                  label="Subject of Email"
                  placeholder="Enter the email subject here ..."
                />
                <InputSwitch<Notifications>
                  name="email_content"
                  type="text-area"
                  label="Subject of Email"
                  placeholder="Enter the email content here ..."
                  rows={10}
                />
                <div className="my-4">
                  <InputSwitch<Notifications>
                    name="active"
                    label="Active"
                    type="switch"
                  />
                </div>
              </div>
              <div>
                <Button>
                  <SaveIcon className="mr-2 size-4" />
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  )
}
