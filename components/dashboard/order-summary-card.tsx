import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KeyValueDisplay from "@/components/ui/key-value-display";
import { Separator } from "@/components/ui/separator";
import { useBookingTypes } from "@/lib/hooks/booking-types";
import { useCommodityCodes } from "@/lib/hooks/commodity-codes";
import { useLocations } from "@/lib/hooks/locations";
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix";

export default function OrderSummaryCard(props: any) {
  const { 
    booking_type_id,
    partner_prefix_id,
    awb,
    origin_id,
    destination_id,
    commodity_code_id
   } = props

  const { data: bookingTypes } = useBookingTypes()
  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: locations } = useLocations()
  const { data: commodityCodes } = useCommodityCodes()
  const bookingType = bookingTypes && bookingTypes.find((item: any) => item.ID === booking_type_id)
  const partnerPrefix = partnerPrefixes && partnerPrefixes.find((item: any) => item.ID === partner_prefix_id)
  const originLoc = origin_id && locations && locations.find((item: any) => item.ID === origin_id)
  const destLoc = destination_id && locations && locations.find((item: any) => item.ID === destination_id)
  const commodity = commodity_code_id && commodityCodes && commodityCodes.find((item: any) => item.ID === commodity_code_id)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>{bookingType && bookingType.name}</CardTitle>
        <CardDescription>{partnerPrefix && partnerPrefix.name}-{awb}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-3">
        <KeyValueDisplay
          entries={{
            Origin: originLoc && originLoc.name,
            Destination: destLoc && destLoc.name,
            "Commodity Code": commodity && commodity.name,
            "Special Handling": "DG",
          }}
        />
      </CardContent>
    </Card>
  );
}
