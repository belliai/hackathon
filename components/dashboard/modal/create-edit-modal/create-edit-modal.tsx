"use client"

import { useState } from "react"
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tabs"
import FormTextField, { TFormTextField } from "@/components/form/FormTextField"

type TabItem = {
  value: string
  label: string
  icon: React.ReactNode
  content?: React.ReactNode
  formFields?: TFormTextField[]
}

interface CreateEditModalProps {
  title?: string
  open: boolean
  setOpen: (open: boolean) => void
  children?: React.ReactNode
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
  tabItems: TabItem[]
  tabItems2?: TabItem[]
  rightComponent?: React.ReactNode
  defaultTabValue?: string
  defaultFullScreen?: boolean
  content?: React.ReactNode
}

export default function CreateEditModal({
  title,
  open,
  setOpen,
  children,
  form,
  onSubmit,
  tabItems,
  tabItems2,
  rightComponent,
  defaultTabValue,
  defaultFullScreen = false,
  content,
}: CreateEditModalProps) {
  const [isFullScreen, setFullScreen] = useState(defaultFullScreen)

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={
          isFullScreen
            ? "h-screen w-screen max-w-none overflow-auto"
            : "top-8 max-w-6xl translate-y-0"
        }
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle>{title}</DialogTitle>
              <div className="flex flex-row items-center justify-end gap-2 text-muted-foreground">
                <Button
                  onClick={toggleFullScreen}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            {tabItems.length > 0 ? (
              <Tabs defaultValue={defaultTabValue ?? tabItems[0].value}>
                <div className="flex w-full flex-row items-stretch gap-4 pt-4">
                  <div className="min-w-[220px]">
                    <Card className="h-full">
                      <TabsList className="p-0 py-2">
                        {tabItems.map((item) => {
                          return (
                            <TabsTrigger key={item.value} value={item.value}>
                              <span className="[&_svg]:h-4 [&_svg]:w-4">
                                {item.icon}
                              </span>
                              {item.label}
                            </TabsTrigger>
                          )
                        })}
                      </TabsList>
                      {tabItems2 && (
                        <>
                          <Separator />
                          <TabsList className="p-0 py-2">
                            {tabItems2.map((item2) => {
                              return (
                                <TabsTrigger
                                  key={item2.value}
                                  value={item2.value}
                                >
                                  {item2.icon}
                                  {item2.label}
                                </TabsTrigger>
                              )
                            })}
                          </TabsList>
                        </>
                      )}
                    </Card>
                  </div>
                  <div className="grid flex-1">
                    {[...tabItems, ...(tabItems2 ?? [])].map((item) => {
                      return (
                        <TabsContent
                          key={item.value}
                          value={item.value}
                          asChild
                          className="max-h-screen overflow-auto"
                        >
                          <>
                            {item.content && item.content}
                            {item.formFields && (
                              <div className="grid h-fit grid-cols-4 items-end gap-2 gap-y-8 [&_label]:text-xs">
                                {item.formFields.map((field, index) => {
                                  return (
                                    <FormTextField
                                      key={field.name}
                                      {...field}
                                      form={form}
                                    />
                                  )
                                })}
                              </div>
                            )}
                          </>
                        </TabsContent>
                      )
                    })}
                  </div>
                  {rightComponent && (
                    <div className="flex max-w-[300px] flex-col items-stretch justify-between gap-4">
                      {rightComponent}
                    </div>
                  )}
                </div>
              </Tabs>
            ) : null}
            {content && content}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
