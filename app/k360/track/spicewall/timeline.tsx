import { cn } from "@/lib/utils"

export const Circle = (props: any) => {
    const { className } = props
    const size = 10
    return (
        <div className={cn("rounded-full bg-white h-4 w-4 flex items-center justify-center", className)}>
            <div className="w-2 h-2 rounded-full bg-green-700"></div>
        </div>
    )
}

export const Timeline = (props: { timeline:  string, children: React.ReactNode, className?: string}) => {
    const { timeline , children, className  } = props
    return (
        <div className={cn("flex w-full",className)}>
            <div className="flex items-start justify-center space-x-1 w-[200px] relative">
                <p className="text-xs">{timeline}</p>
                <div className="h-full flex flex-col justify-center items-center">
                    <Circle className="" />
                    <div className=" h-full w-[0.5px]  bg-white">
                    </div>
                </div>

            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    )
}