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
    bookingType: bookingTypeId,
    partnerPrefix: partnerPrefixId,
    axb,
    origin,
    destination,
    commodityCode
   } = props

  const { data: bookingTypes } = useBookingTypes()
  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: locations } = useLocations()
  const { data: commodityCodes } = useCommodityCodes()
  const bookingType = bookingTypes && bookingTypes.find((item: any) => item.ID === bookingTypeId)
  const partnerPrefix = partnerPrefixes && partnerPrefixes.find((item: any) => item.ID === partnerPrefixId)
  const originLoc = origin && locations && locations.find((item: any) => item.ID === origin)
  const destLoc = destination && locations && locations.find((item: any) => item.ID === destination)
  const commodity = commodityCode && commodityCodes && commodityCodes.find((item: any) => item.ID === commodityCode)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle>{bookingType && bookingType.name}</CardTitle>
        <CardDescription>{partnerPrefix && partnerPrefix.name}-{axb}</CardDescription>
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
