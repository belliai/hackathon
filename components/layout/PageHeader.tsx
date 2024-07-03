import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  actions?: React.ReactNode | React.ReactNode[]
  className?: string
}

export default function PageHeader({
  title,
  actions,
  className,
}: PageHeaderProps) {
  return <div className="flex items-center gap-2">{actions}</div>
}
