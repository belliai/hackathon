import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function PageHeader({
  title,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className="flex gap-2 items-center">{actions}</div>
  );
}
