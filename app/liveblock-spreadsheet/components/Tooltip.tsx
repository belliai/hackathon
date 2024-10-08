import { forwardRef, type ReactNode } from "react"
import {
  Arrow,
  Content,
  Portal,
  Root,
  Trigger,
  type TooltipContentProps,
  type TooltipProps,
} from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

import styles from "./Tooltip.module.css"

export interface Props
  extends Omit<TooltipProps & TooltipContentProps, "content"> {
  content: ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      delayDuration,
      disableHoverableContent = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Root
        defaultOpen={defaultOpen}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        onOpenChange={onOpenChange}
        open={open}
      >
        <Trigger asChild>{children}</Trigger>
        <Portal>
          <Content
            className={cn(className, styles.tooltip)}
            ref={ref}
            sideOffset={4}
            {...props}
          >
            {content}
            <Arrow asChild height={7} width={28}>
              <svg
                className={styles.arrow}
                fill="none"
                height="7"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.833 6.485A1.57 1.57 0 0 0 14 7a1.57 1.57 0 0 0 1.167-.515l2.845-3.163C19.911 1.211 22.654 0 25.538 0H28 0h2.462c2.884 0 5.627 1.211 7.526 3.322l2.845 3.163Z" />
              </svg>
            </Arrow>
          </Content>
        </Portal>
      </Root>
    )
  }
)
Tooltip.displayName = "Tooltip"
