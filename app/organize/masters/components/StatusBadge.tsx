import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva("", {
  variants: {
    severity: {
      default: "bg-green-700/80 text-white hover:bg-green-600",
      warning: "bg-yellow-700/80 text-white hover:bg-yellow-600",
      error: "bg-red-700/80 text-white hover:bg-red-600",
    },
  },
});

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  statusText: string;
  className?: string;
}

export default function StatusBadge({
  statusText,
  severity,
  className,
}: StatusBadgeProps) {
  return (
    <Badge className={cn(statusBadgeVariants({ severity }), className)}>
      {statusText}
    </Badge>
  );
}
