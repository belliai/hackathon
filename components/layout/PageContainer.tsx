import { cn } from "@/lib/utils";

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col w-full", className)}>{children}</div>
  );
}
