import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type Deletee = {
  type: "manufacturer" | "type" | "version"
  label: string
  id: string
}

export default function OptionDeleteWarning(props: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (deletee: Deletee) => void
  deletee?: Deletee | null
}) {
  // make a fetch to query the list of affected items according to type and id, and display it
  // when the API from Yusa is ready

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Note that Deleting{" "}
            <span className="font-bold">
              &quot;{props.deletee?.label}&quot;
            </span>{" "}
            will also delete anything associated with this {props.deletee?.type}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {props.deletee?.label}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"button-primary"}
            onClick={() => {
              if (props.open && props.deletee) {
                props.onConfirm(props.deletee)
              }
            }}
          >
            Yes, Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
