import { ReactNode } from "react"

export default function KeyValueDisplay({
  entries,
}: {
  entries: Record<string, ReactNode>
}) {
  return (
    <ul className="w-full space-y-1">
      {Object.entries(entries).map(([key, value]) => (
        <li
          key={key}
          className="inline-flex w-full items-center justify-between text-sm text-muted-foreground"
        >
          <p className="font-normal text-foreground">{key}</p>
          <p className="font-light">{value}</p>
        </li>
      ))}
    </ul>
  )
}
