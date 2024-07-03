import { useState } from "react"
import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { SpotRateLabelAndInput } from "@/components/sales/spot-rate/SpotRateLabelAndInput"

import { SpotRateDateIcon } from "../SpotRateDatePicker"
import SpotRateDropDown from "../SpotRateDropDown"
import SpotRatePopup from "./SpotRatePopup"

const SpotRateNewShipmentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">Shipment Details</h2>
      <div className="grid grid-cols-4 gap-4">
        <SpotRateLabelAndInput label="Origin" required />
        <SpotRateLabelAndInput label="Destination" required />

        <div className="col-span-2 grid grid-cols-subgrid gap-4"></div>
        <SpotRateLabelAndInput label="Commodity" required />
        <SpotRateLabelAndInput label="Commodity Description" required />
        <SpotRateLabelAndInput label="Product Type" required />
        <SpotRateLabelAndInput label="SHC" />
        <SpotRateLabelAndInput label="Shipping Agent" required />
        <SpotRateLabelAndInput label="Shipping Agent Name" required />
        <SpotRateLabelAndInput label="Shipper" />
        <SpotRateLabelAndInput label="Consignee" />

        {/* checkbox, text */}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <label>Leg/Flight Level Spot Rate</label>
        </div>

        <div className="flex items-center gap-2">
          <label>Flight Number *</label>
          <SpotRateDropDown />
        </div>

        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap">Flight Date *</label>
          <Input type="text" />
          <SpotRateDateIcon />
        </div>

        <div className="flex items-center gap-2">
          <label>Rate Details</label>
          <Info onClick={openModal} />

          {/* Popup Modal */}
          <SpotRatePopup isOpen={isModalOpen} onClose={closeModal} />
        </div>

        <SpotRateLabelAndInput label="Pieces" />

        <SpotRateLabelAndInput label="Gross Weight" required />

        <SpotRateLabelAndInput label="Charged Weight" />

        <SpotRateLabelAndInput label="UOM" />

        <SpotRateLabelAndInput label="MKT Rate" required />

        <SpotRateLabelAndInput label="MSR Rate" required />

        <SpotRateLabelAndInput label="MSR Currency" required />
      </div>
    </div>
  )
}

export default SpotRateNewShipmentDetails
