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
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:justify-between md:items-center",
        className
      )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex gap-2 items-center">{actions}</div>
    </div>
  );
}
