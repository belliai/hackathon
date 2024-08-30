"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { useCustomers } from "@/lib/hooks/customers"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PhoneInput } from "@/components/ui/phone-input"

const phoneNumberOptions = [
  { label: "+1 (555) 123-4567", value: "+1 (555) 123-4567" },
  { label: "+44 20 7123 4567", value: "+44 20 7123 4567" },
  { label: "+81 3-1234-5678", value: "+81 3-1234-5678" },
  { label: "+61 2 9876 5432", value: "+61 2 9876 5432" },
  { label: "+49 30 1234567", value: "+49 30 1234567" },
  { label: "+33 1 23 45 67 89", value: "+33 1 23 45 67 89" },
  { label: "+86 10 1234 5678", value: "+86 10 1234 5678" },
  { label: "+7 495 123-45-67", value: "+7 495 123-45-67" },
  { label: "+55 11 1234-5678", value: "+55 11 1234-5678" },
  { label: "+91 22 1234 5678", value: "+91 22 1234 5678" }
];

const emailOptions = [
  { label: "john.doe@example.com", value: "john.doe@example.com" },
  { label: "jane.smith@company.com", value: "jane.smith@company.com" },
  { label: "michael.johnson@business.net", value: "michael.johnson@business.net" },
  { label: "emily.brown@corporation.org", value: "emily.brown@corporation.org" },
  { label: "david.wilson@enterprise.co", value: "david.wilson@enterprise.co" },
  { label: "sarah.taylor@firm.io", value: "sarah.taylor@firm.io" },
  { label: "robert.anderson@agency.com", value: "robert.anderson@agency.com" },
  { label: "lisa.martinez@group.net", value: "lisa.martinez@group.net" },
  { label: "william.thomas@organization.org", value: "william.thomas@organization.org" },
  { label: "jennifer.garcia@institute.edu", value: "jennifer.garcia@institute.edu" }
];

const addressOptions = [
  { label: "123 Main St, Anytown, USA 12345", value: "123 Main St, Anytown, USA 12345" },
  { label: "456 Elm Ave, Metropolis, UK SW1A 1AA", value: "456 Elm Ave, Metropolis, UK SW1A 1AA" },
  { label: "789 Sakura Blvd, Tokyo, Japan 100-0001", value: "789 Sakura Blvd, Tokyo, Japan 100-0001" },
  { label: "101 Kangaroo Lane, Sydney, Australia 2000", value: "101 Kangaroo Lane, Sydney, Australia 2000" },
  { label: "234 Berliner Str, Berlin, Germany 10115", value: "234 Berliner Str, Berlin, Germany 10115" },
  { label: "567 Rue de Paris, Paris, France 75001", value: "567 Rue de Paris, Paris, France 75001" },
  { label: "890 Beijing Rd, Beijing, China 100000", value: "890 Beijing Rd, Beijing, China 100000" },
  { label: "1234 Nevsky Prospekt, St. Petersburg, Russia 191186", value: "1234 Nevsky Prospekt, St. Petersburg, Russia 191186" },
  { label: "5678 Copacabana Beach, Rio de Janeiro, Brazil 22070-011", value: "5678 Copacabana Beach, Rio de Janeiro, Brazil 22070-011" },
  { label: "9101 Marine Drive, Mumbai, India 400002", value: "9101 Marine Drive, Mumbai, India 400002" }
];

const ConsignorForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const form = useFormContext()
    const { data: customers } = useCustomers()

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    return (
      <Card className="grid grid-cols-1 gap-3 p-4 h-fit animate-fade-left" ref={ref}>
        <div className="grid grid-cols-3 gap-x-3">
          <Combobox
            name="shipper_id"
            options={customerOptions}
            label="Shipper"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-x-3">
          <FormField
            control={form.control}
            name="consignor_phone_number"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel info="Total" className="font-semibold" >Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} className="rounded-lg dark:border-2 dark:border-foreground/30 h-[40px]" international />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Combobox
            name="consignor_email"
            options={emailOptions}
            label="Email Address"
          />
          <Combobox
            name="consignor_address"
            options={addressOptions}
            label="Address"
          />
        </div>
      </Card>
    )
  }
)

ConsignorForm.displayName = "ConsignorForm"

export default ConsignorForm
