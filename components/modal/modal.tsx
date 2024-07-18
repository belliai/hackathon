"use client"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  children: React.ReactNode
  title?: string
  onSave?: () => void
  saveText?: string
  description?: string
}

export default function Modal({
  open,
  onOpenChange,
  trigger,
  children,
  title,
  description,
  onSave,
  saveText = "Save",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={onSave} variant="button-primary">
            {saveText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
