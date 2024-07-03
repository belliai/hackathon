"use client"

import { createClient } from "contentful"

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
})

export async function fetchTooltips() {
  await client
    .getEntries({ content_type: "tooltip" })
    .then((entries) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          "tooltipContents",
          JSON.stringify(entries.items.map((item) => item.fields))
        )
      }
    })
    .catch((err) => {
      console.error("error", err)
    })
}

export const getTooltipContents = () => {
  let tooltipData: any[] = []
  if (typeof localStorage !== "undefined") {
    const storedData = localStorage.getItem("tooltipContents")
    if (storedData) {
      try {
        tooltipData = JSON.parse(storedData)
      } catch (error) {
        console.error(
          "Failed to parse tooltip contents from localStorage",
          error
        )
        tooltipData = []
      }
    }
  }

  return tooltipData
}
