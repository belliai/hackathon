"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import PageContainer from "@/components/layout/PageContainer"

export default function DataSyncWithCMS() {
  const [data, setData] = useState<any>(null)

  const handleClick = () => {
    const jsonData = {
      "AWB Prefix": "807",
      "AWB Number": "57483338",
      Origin: "KUL",
      Destination: "JFK",
      "Commodity Code": "GEN",
      Description: "General Cargo",
      Pieces: "10",
      "Gross Weight": "500",
      Shipper: "ABC Corporation",
      Consignee: "XYZ Company",
      "Shipping Agent": "Speedy Logistics",
      "Payment Mode": "Prepaid",
      "Bill To": "ACME Corp",
      "Bill To Name": "ACME Billing Dept.",
      "Product Type": "General Goods",
      SHC: "GEN",
      "Shipment Date": "14/05/2024",
      "Shipment Priority": "High",
      "Additional Info": "None",
      "Attach Document": "None",
      "Packaging Info": "Boxed",
      "Handling Info": "Handle with care",
      "Declared Value for Carriage": "1000",
      "Declared Value for Customs": "2000",
      "Account Info": "Account123",
      "Notify Party": "Notify123",
      "Insurance Amount": "5000",
      "Created By": "johnny",
      "Creation Date": "14/05/2024",
      "Executed By": "johnny",
      "Execution Date": "14/05/2024",
      "Execution Location": "KUL",
    }

    setData(jsonData)
  }

  return (
    <div style={{ marginTop: "-5px" }}>
      <div className="flex-1 p-4">
        <Button
          onClick={handleClick}
          className="bg-button-primary text-white hover:bg-button-primary/80"
          style={{ fontSize: "0.875rem" }}
        >
          <span className="hidden md:block">Extract Data</span>
        </Button>
        {data && (
          <div className="mt-4">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
