import { cn } from "@/lib/utils"

export const Circle = (props: any) => {
  const { className } = props
  const size = 10
  return (
    <div
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-full bg-white",
        className
      )}
    >
      <div className="h-2 w-2 rounded-full bg-green-700"></div>
    </div>
  )
}

export const Timeline = (props: {
  timeline: string
  children: React.ReactNode
  className?: string
}) => {
  const { timeline, children, className } = props
  return (
    <div className={cn("flex w-full", className)}>
      <div className="relative flex w-[200px] items-start justify-center space-x-1">
        <p className="text-xs">{timeline}</p>
        <div className="flex h-full flex-col items-center justify-center">
          <Circle className="" />
          <div className="h-full w-[0.5px] bg-white"></div>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  )
}
