"use client"

import { useEffect } from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import InputSwitch from "./form/InputSwitch"
import { Form } from "./ui/form"

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  const form = useForm({
    defaultValues: {
      "theme-switcher": "dark",
    },
  })

  useEffect(() => {
    form.setValue("theme-switcher", theme || "")
  }, [theme])

  useEffect(() => {
    setTheme(form.getValues()["theme-switcher"])
  }, [form.watch("theme-switcher")])

  return (
    <Form {...form}>
      <InputSwitch
        name="theme-switcher"
        type="select"
        className="mt-1 border-0 bg-transparent"
        selectOptions={[
          {
            label: "Light",
            value: "light",
            component: (
              <div className="flex items-center gap-2 text-sm">
                <Sun size={16} />
                <span>Light</span>
              </div>
            ),
          },
          {
            label: "Dark",
            value: "dark",
            component: (
              <div className="flex items-center gap-2 text-sm">
                <Moon size={16} />
                <span>Dark</span>
              </div>
            ),
          },
          {
            label: "System",
            value: "system",
            component: (
              <div className="flex items-center gap-2 text-sm">
                <SunMoon size={16} />
                <span>System</span>
              </div>
            ),
          },
        ]}
      />
    </Form>
  )
}

function ThemePreview({ theme }: { theme: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center gap-1 rounded-sm px-1 py-0.5",
        {
          "bg-white text-black": theme === "light",
          "bg-zinc-900 text-white": theme === "dark",
        }
      )}
    >
      <span className="h-1 w-1 rounded-full bg-button-primary text-xs" />
      Aa
    </span>
  )
}
