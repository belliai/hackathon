import { ReactNode } from "react";

export default function KeyValueDisplay({
  entries,
}: {
  entries: Record<string, ReactNode>;
}) {
  return (
    <ul className="w-full space-y-1">
      {Object.entries(entries).map(([key, value]) => (
        <li
          key={key}
          className="w-full inline-flex items-center justify-between text-xs text-muted-foreground"
        >
          <p className="font-medium text-foreground">{key}</p>
          <p className="font-light">{value}</p>
        </li>
      ))}
    </ul>
  );
}
