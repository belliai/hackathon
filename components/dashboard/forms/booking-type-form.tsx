"use client"

import React, { useEffect } from "react"
import { FileTextIcon, GlobeIcon, KeyIcon, PackageOpenIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const BookingTypeForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()

  useEffect(() => {}, [form.formState])

  const handleClick = (id: string) => {
    form.setValue('booking_type_id', id)
    _.onValueChange();
  }

  const fieldState = form.getFieldState('booking_type_id')

  return (
    <div className="space-y-2">
      <Button
        onClick={() => handleClick('41eca8ed-1c69-4e0b-9434-130546e175ac')}
        variant={"ghost"}
        type="button"
        className="h-fit w-full whitespace-normal p-0 text-start"
      >
        <Card className={`cursor-pointer transition-colors hover:bg-muted ${form.getValues('booking_type_id') === '41eca8ed-1c69-4e0b-9434-130546e175ac' ? 'bg-muted' : ''}`}>
          <CardHeader className="flex flex-row gap-4 space-y-0">
            <FileTextIcon className="size-5" />
            <div className="flex-1 space-y-2">
              <h4 className="font-bold leading-none">
                Airway Bill
              </h4>
              <p className="text-xs text-muted-foreground">
                An air waybill or AWB is a document that
                accompanies goods shipped by an international
                courier, which allow for tracking. It serves as a
                receipt of goods by an airline, as well as a
                contract of carriage between the shipper and the
                carrier.
              </p>
            </div>
          </CardHeader>
        </Card>
      </Button>
      <Button
        disabled
        variant={"ghost"}
        type="button"
        className={cn(
            "h-fit w-full whitespace-normal p-0 text-start"
        )}
      >
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row gap-4 space-y-0">
            <GlobeIcon className="size-5" />
            <div className="flex-1 space-y-2">
              <h4 className="font-bold leading-none">
                House Airway Bill
              </h4>
              <p className="text-xs text-muted-foreground">
                An air waybill or AWB is a document that
                accompanies goods shipped by an international
                courier, which allow for tracking. It serves as a
                receipt of goods by an airline, as well as a
                contract of carriage between the shipper and the
                carrier.
              </p>
            </div>
          </CardHeader>
        </Card>
      </Button>
      <Button
        disabled
        variant={"ghost"}
        type="button"
        className={cn(
            "h-fit w-full whitespace-normal p-0 text-start"
        )}
      >
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row gap-4 space-y-0">
            <PackageOpenIcon className="size-5" />
            <div className="flex-1 space-y-2">
              <h4 className="font-bold leading-none">CN-38</h4>
              <p className="text-xs text-muted-foreground">
                  An air waybill or AWB is a document that
                  accompanies goods shipped by an international
                  courier, which allow for tracking. It serves as a
                  receipt of goods by an airline, as well as a
                  contract of carriage between the shipper and the
                  carrier.
              </p>
            </div>
          </CardHeader>
        </Card>
      </Button>
      <Button
        disabled
        variant={"ghost"}
        type="button"
        className={cn(
            "h-fit w-full whitespace-normal p-0 text-start"
        )}
      >
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row gap-4 space-y-0">
            <KeyIcon className="size-5" />
            <div className="flex-1 space-y-2">
              <h4 className="font-bold leading-none">CBV</h4>
              <p className="text-xs text-muted-foreground">
                  An air waybill or AWB is a document that
                  accompanies goods shipped by an international
                  courier, which allow for tracking. It serves as a
                  receipt of goods by an airline, as well as a
                  contract of carriage between the shipper and the
                  carrier.
              </p>
            </div>
          </CardHeader>
        </Card>
      </Button>
      {fieldState.invalid && fieldState.error?.message && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {String(fieldState.error?.message) || ''}
        </p>
      )}
    </div>
  )
})

BookingTypeForm.displayName = "BookingTypeForm"

export default BookingTypeForm
