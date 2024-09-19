"use client"

import { PropsWithChildren } from "react"
import { useLocalStorage } from "usehooks-ts"

import { cn } from "@/lib/utils"

export default function Body({ children, className }: PropsWithChildren<{className?:string}>) {
  const [customTheme, setCustomTheme] = useLocalStorage("custom_theme", "")

  return (
    <body
      className={cn("h-full overflow-y-hidden bg-background", {
        "bg-skye": customTheme === "skye",
      }, className)}
    >
      {children}
    </body>
  )
}
