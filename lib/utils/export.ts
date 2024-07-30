import { format } from "date-fns"
import { saveAs } from "file-saver"
import * as XLSX from "xlsx"

export function exportToXlsx(data: any, sheetName: string, fileName: string) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new()

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // Generate a binary string representation of the workbook
  const workbookOut = XLSX.write(workbook, { bookType: "xlsx", type: "binary" })

  // Convert the binary string to an ArrayBuffer
  const buffer = new ArrayBuffer(workbookOut.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < workbookOut.length; ++i) {
    view[i] = workbookOut.charCodeAt(i) & 0xff
  }

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([buffer], { type: "application/octet-stream" })

  // Save the file using FileSaver
  saveAs(blob, fileName)
}

interface AnyObject {
  [key: string]: any
}

function flattenObject(
  obj: AnyObject,
  parent: string = "",
  res: AnyObject = {}
): AnyObject {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parent ? `${parent}.${key}` : key
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], propName, res)
      } else {
        res[propName] = obj[key]
      }
    }
  }
  return res
}

export function flattenList(list: AnyObject[]): AnyObject[] {
  return list.map((item) => flattenObject(item))
}

interface onExportProps {
  data: any
  filename: string
}

export const onExport = (props: onExportProps) => {
  const { data, filename } = props
  const flatData = flattenList(data)
  const todayStr = format(new Date(), "yyyMMddHHmmss")
  exportToXlsx(flatData, "Sheet1", `${filename}_${todayStr}.xlsx`)
}
