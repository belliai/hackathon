"use client"

import { useBookingTypes } from "@/lib/hooks/booking-types"
import { useLocations } from "@/lib/hooks/locations"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"

interface HeaderSectionProps {
    bookingTypeId: string
    partnerPrefixId: string
    partnerCodeId: string
    awbNumber: string
    originId: string
    destinationId: string
}

export default function HeaderSection(props: HeaderSectionProps) {
    const { bookingTypeId, partnerPrefixId, partnerCodeId, awbNumber, originId, destinationId } = props
    const { data: partnerPrefixes } = usePartnerPrefixes()
    const { data: partnerCodes } = usePartnerCodes()
    const { data: bookingTypes } = useBookingTypes()
    const { data: locations } = useLocations()

    const selectedBookingType = bookingTypes?.find((item: { ID: string; name: string }) => item.ID === bookingTypeId)
    const selectedPartnerPrefix = partnerPrefixes?.find((item: { ID: string; name: string }) => item.ID === partnerPrefixId)
    const selectedPartnerCode = partnerCodes?.find((item: { ID: string; name: string }) => item.ID === partnerCodeId)
    const selectedDestination = locations?.find((item: { ID: string; name: string }) => item.ID === destinationId)
    const selectedOrigin = locations?.find((item: { ID: string; name: string }) => item.ID === originId)

    return `${selectedBookingType?.name || ''} ${selectedPartnerPrefix?.name || ''}${awbNumber ? `-${awbNumber}` : ''}${selectedPartnerCode ? `-${selectedPartnerCode.name}` : ''} ${selectedOrigin && selectedDestination ? `(${selectedOrigin.name} to ${selectedDestination.name})` : ''}`;
}