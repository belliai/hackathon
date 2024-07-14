"use client"

import React, { useState } from "react"
import { nanoid } from "nanoid"
import Spreadsheet from "react-spreadsheet"
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import { supabase } from "./supabaseClient"

const SUPABASE_BUCKET_NAME = "excel-files"
const BACKEND_URL = "https://king-prawn-app-9goif.ondigitalocean.app"
const UPLOAD_FILE_URL = `${BACKEND_URL}/process`
const IMAGE_GENERATOR_URL = `${BACKEND_URL}/generate`

const columnLabels = [
  "Product Name",
  "Product Description",
  "Dimensions",
  "Perishable",
  "Explosive",
]

const UploadExcel: React.FC = () => {
  const [spreadsheetData, setSpreadsheetData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true) // Start loading

    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      // Prepare data for Spreadsheet
      const sheetData = jsonData.map((row: any) =>
        row.map((cell: any) => ({ value: cell }))
      )
      setSpreadsheetData(sheetData)

      // Upload file to Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .upload(`${file.name}/${nanoid()}`, file)

      if (uploadError) {
        console.error(uploadError)
        setError("Failed to upload file")
        setLoading(false) // End loading on error
        return
      }

      const fileUrl = supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .getPublicUrl(uploadData?.path).data.publicUrl

      console.log("fileUrl", fileUrl)

      console.log("spreadsheetdata", spreadsheetData, sheetData)

      // Call AWS Lambda function via Lambda URL to process the file
      const response = await fetch(UPLOAD_FILE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(`Error: ${errorData.error}`)
        setLoading(false) // End loading on error
        return
      }

      const resultData = await response.json()

      console.log("resultData", resultData)

      // Update the existing rows with the new data
      const updatedData = sheetData.map((row, index) => {
        if (index === 0) return row // Skip header row
        console.log("row", resultData[index])
        if (resultData[index - 1]) {
          return [
            row[0], // product_name
            row[1], // product_description
            { value: resultData[index - 1]["Dimensions"] || "" },
            { value: resultData[index - 1]["Perishable"] || "" },
            { value: resultData[index - 1]["Explosive"] || "" },
          ]
        }
        return row
      })

      console.warn("updatedData", updatedData)

      setSpreadsheetData(updatedData)

      // Save the result data to Supabase
      const insertData = resultData.map((item: any) => ({
        product_name: item["Product Name"],
        product_description: item["Product Description"],
        dimensions: item["Dimensions"],
        perishable: item["Perishable"] === "True",
        explosive: item["Explosive"] === "True",
      }))

      const { error: dbError } = await supabase
        .from("processed_data")
        .insert(insertData)

      if (dbError) {
        console.error(dbError)
        setError("Failed to save data to database")
      } else {
        toast({
          title: "Success!",
          description: "AI Data generated successfully",
        })
        console.log("Data saved successfully")
      }

      setLoading(false) // End loading
    }
    reader.readAsBinaryString(file)
  }

  const handleGenerateImage = async () => {
    // Call AWS Lambda function via Lambda URL to generate image
    console.warn("spreadsheetData", spreadsheetData.slice(1))
    const response = await fetch(IMAGE_GENERATOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: spreadsheetData
          .slice(1)
          .map((row) => row.map((cell: { value: any }) => cell.value)),
      }), // Pass spreadsheet data to image generator
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(`Error: ${errorData.error}`)
      return
    }

    const resultData = await response.json()
    setImageUrl(resultData.image_url)
  }

  return (
    <>
      <div className="flex p-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />
      </div>
      {loading && <p>Generating data...</p>} {/* Show loading indicator */}
      {spreadsheetData.length > 0 && (
        <Spreadsheet
          data={spreadsheetData.slice(1)}
          columnLabels={columnLabels}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}


      {/* <div className="flex flex-col gap-4">
        <Button onClick={handleGenerateImage} className="mt-4">
          Generate Image
        </Button>

        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Generated Image</h3>
            <img src={imageUrl} alt="Generated" className="mt-2" />
          </div>
        )}
      </div> */}
    </>
  )
}

export default UploadExcel
