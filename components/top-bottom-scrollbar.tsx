import React, { PropsWithChildren, useRef } from "react"

export default function TopBottomScrollBars({ children }: PropsWithChildren) {
  const wrapRef1 = useRef<HTMLDivElement>(null)
  const wrapRef2 = useRef<HTMLDivElement>(null)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const targetDiv: HTMLDivElement = event.target as HTMLDivElement

    if (targetDiv === wrapRef1.current && wrapRef2.current) {
      wrapRef2.current.scrollLeft = targetDiv.scrollLeft
    } else if (targetDiv === wrapRef2.current && wrapRef1.current) {
      wrapRef1.current.scrollLeft = targetDiv.scrollLeft
    }
  }

  return (
    <div className="w-full">
      <div
        ref={wrapRef1}
        className="custom-scrollbar h-1.5 w-full overflow-hidden overflow-y-hidden border-0 group-hover:overflow-x-scroll"
        onScroll={handleScroll}
      >
        <div
          id="div1"
          className="h-1.5"
          style={{ width: wrapRef2.current?.scrollWidth }}
        ></div>
      </div>

      <div
        ref={wrapRef2}
        // pb is added when scrollbar is hidden to prevent content from shifting
        className="custom-scrollbar w-full overflow-hidden overflow-y-hidden border-0 pb-1.5 group-hover:overflow-x-scroll group-hover:pb-0"
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  )
}
