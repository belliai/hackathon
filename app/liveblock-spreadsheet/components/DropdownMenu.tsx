import { forwardRef, type ReactNode } from "react"
import {
  Content,
  Item,
  Portal,
  Root,
  Separator,
  Trigger,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
  type DropdownMenuSeparatorProps,
} from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

import styles from "./DropdownMenu.module.css"

export interface Props
  extends Omit<DropdownMenuProps & DropdownMenuContentProps, "content"> {
  content: DropdownMenuContentProps["children"]
}

export interface ItemProps extends DropdownMenuItemProps {
  icon?: ReactNode
  label: string
}

export const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      content,
      className,
      collisionPadding = 20,
      open,
      defaultOpen,
      onOpenChange,
      modal,
      ...props
    },
    ref
  ) => {
    return (
      <Root
        defaultOpen={defaultOpen}
        modal={modal}
        onOpenChange={onOpenChange}
        open={open}
      >
        <Trigger asChild>{children}</Trigger>
        <Portal>
          <Content
            className={cn(className, styles.menu)}
            collisionPadding={collisionPadding}
            ref={ref}
            {...props}
          >
            {content}
          </Content>
        </Portal>
      </Root>
    )
  }
)
DropdownMenu.displayName = "DropdownMenu"

export const DropdownMenuItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, icon, children, className, ...props }, ref) => {
    return (
      <Item
        className={cn(className, styles.item)}
        ref={ref}
        textValue={label}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {label}
        {children}
      </Item>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <Separator
      className={cn(className, styles.separator)}
      ref={ref}
      {...props}
    />
  )
})
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
  Label as DropdownMenuLabel,
  Group as DropdownMenuGroup,
  Item as DropdownMenuCustomItem,
} from "@radix-ui/react-dropdown-menu"
