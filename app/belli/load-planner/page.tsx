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
  const [loading, setLoading] = useState<boolean>(false) // Add loading state

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

      // Update the existing rows with the new data
      const updatedData = sheetData.map((row, index) => {
        if (index === 0) return row // Skip header row
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
          description: "Data created successfully",
        })
        console.log("Data saved successfully")
      }

      setLoading(false) // End loading
    }
    reader.readAsBinaryString(file)
  }

  const handleGenerateImage = async () => {
    setLoading(true) // Start loading

    const products = spreadsheetData.slice(1).map((row) => ({
      "Product Name": row[0]?.value || "",
      "Product Description": row[1]?.value || "",
      Dimensions: row[2]?.value || "",
      Perishable: row[3]?.value || "",
      Explosive: row[4]?.value || "",
    }))

    // Call Flask API to generate image
    const response = await fetch(IMAGE_GENERATOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }), // Pass formatted spreadsheet data to image generator
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(`Error: ${errorData.error}`)
      setLoading(false) // End loading on error
      return
    }

    const resultData = await response.json()
    setImageUrl(resultData.image_url)
    setLoading(false) // End loading
  }

  return (
    <>
      <div className="flex flex-col p-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />
        {loading && <p>Generating data...</p>} {/* Show loading indicator */}
        <div className="flex">
          {spreadsheetData.length > 0 && (
            <Spreadsheet
              data={spreadsheetData.slice(1)}
              columnLabels={columnLabels}
            />
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="flex flex-col">
        <Button onClick={handleGenerateImage} className="mt-4 w-fit">
          Generate Image
        </Button>
        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Generated Image</h3>
            <img src={imageUrl} alt="Generated" className="mt-2" />
          </div>
        )}
      </div>
    </>
  )
}

export default UploadExcel
