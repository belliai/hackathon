import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SpotRatePopupProps {
  isOpen: boolean
  onClose: () => void
}

const SpotRatePopup = ({ isOpen, onClose }: SpotRatePopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full">
        <DialogHeader>
          <DialogTitle>Applicable Charges</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <div className="overflow-auto">
            <table className="mb-4 min-w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300">Freight IATA</th>
                  <th className="w-24 border bg-[#d4e2e5] p-2"></th>
                  <th className="border border-gray-300 p-2">Freight MKT</th>
                  <th className="w-24 border bg-[#d4e2e5] p-2"></th>
                  <th className="border border-gray-300 p-2">OC Due Car</th>
                  <th className="w-24 border bg-[#d4e2e5] p-2"></th>
                  <th className="border border-gray-300 p-2">OC Due Agent</th>
                  <th className="w-24 border bg-[#d4e2e5] p-2"></th>
                  <th className="border border-gray-300 p-2">Tax</th>
                  <th className="w-24 border bg-[#d4e2e5] p-2"></th>
                  <th className="border border-gray-300 p-2">Currency</th>
                </tr>
              </thead>
            </table>
            <h3>Rate Details</h3>
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Origin</th>
                  <th className="border border-gray-300 p-2">Destination</th>
                  <th className="border border-gray-300 p-2">Flight No</th>
                  <th className="border border-gray-300 p-2">Flight Dt</th>
                  <th className="border border-gray-300 p-2">Pieces</th>
                  <th className="border border-gray-300 p-2">Gross Wt</th>
                  <th className="border border-gray-300 p-2">Chrgebl. Wt</th>
                  <th className="border border-gray-300 p-2">Is Prime</th>
                  <th className="border border-gray-300 p-2">IATA Freight</th>
                  <th className="border border-gray-300 p-2">IATA Tax</th>
                  <th className="border border-gray-300 p-2">IATA Rate</th>
                  <th className="border border-gray-300 p-2">MKT Freight</th>
                  <th className="border border-gray-300 p-2">MKT Tax</th>
                  <th className="border border-gray-300 p-2">MKT Rate</th>
                  <th className="border border-gray-300 p-2">ULD No</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2">
                    01/01/0001 00:00:00
                  </td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2">false</td>
                  <td className="border border-gray-300 p-2">0</td>
                  <td className="border border-gray-300 p-2">0</td>
                  <td className="border border-gray-300 p-2">0</td>
                  <td className="border border-gray-300 p-2">0</td>
                  <td className="border border-gray-300 p-2">0</td>
                  <td className="border border-gray-300 p-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default SpotRatePopup
