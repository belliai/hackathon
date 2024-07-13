"use client"

import React, { useState } from "react"
import { nanoid } from "nanoid"
import * as XLSX from "xlsx"

import { supabase } from "./supabaseClient"

const SUPABASE_BUCKET_NAME = "excel-files"

const UploadExcel: React.FC = () => {
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const firstRow = XLSX.utils.sheet_to_json(sheet, { header: 1 })[1]

      // Upload file to Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .upload(`${file.name}/${nanoid()}`, file)

      if (uploadError) {
        console.error(uploadError)
        setError("Failed to upload file")
        return
      }

      const fileUrl = supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .getPublicUrl(uploadData?.path).data.publicUrl

      console.log("fileUrl", fileUrl)

      // Call AWS Lambda function via Lambda URL to process the file
      const response = await fetch(
        "https://king-prawn-app-9goif.ondigitalocean.app/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileUrl }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        setError(`Error: ${errorData.error}`)
        return
      }

      const resultData = await response.json()
      setResult(JSON.stringify(resultData, null, 2))
    }
    reader.readAsBinaryString(file)
  }

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {result && <pre>{result}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default UploadExcel
