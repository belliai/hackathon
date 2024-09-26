import { Checkbox } from "@/components/ui/checkbox"
import { AlertOctagonIcon, SignalHigh, SignalLow, SignalMedium, User, Weight } from 'lucide-react';
import { AWBData } from "../../types";
import { Button } from "@/components/ui/button";
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const priorityItem = (priority: string) => {
  switch (priority) {
    case 'Urgent':
      return (
        <span className="text-xs text-muted-foreground flex gap-1 items-center font-bold">
          <AlertOctagonIcon className="size-3" />
          {priority}
        </span>
      );
    case 'High':
      return (
        <span className="text-xs text-muted-foreground flex gap-1 items-center font-bold">
          <SignalHigh className="size-3" />
          {priority}
        </span>
      );
    case 'Medium':
      return (
        <span className="text-xs text-muted-foreground flex gap-1 items-center font-bold">
          <SignalMedium className="size-3" />
          {priority}
        </span>
      );
    case 'Low':
      return (
        <span className="text-xs text-muted-foreground flex gap-1 items-center font-bold">
          <SignalLow className="size-3" />
          {priority}
        </span>
      );
    default:
      return <span className="text-xs text-muted-foreground flex gap-1 items-center font-bold">{priority}</span>;
  }
}

const AWBCard: React.FC<AWBData & { buttonIcon: React.ReactNode; buttonAction: () => void; isSelected: boolean; onSelectChange: (id: string) => void, isDraggable?: boolean }> = ({ 
  awb_number,
  weight,
  unit,
  consignor,
  priority,
  buttonIcon,
  buttonAction,
  isSelected = false,
  onSelectChange = () => {},
  isDraggable = false
}) => {
  let sortableProps = {};
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: awb_number });
  if (isDraggable) {
    sortableProps = {
      ref: setNodeRef,
      style: {
        transform: CSS.Transform.toString(transform),
        transition,
      },
      ...attributes,
      ...listeners,
    };
  }

  return (
    <div
      className="flex items-center p-3 rounded-md bg-primary-foreground gap-2 justify-between h-fit"
      id={awb_number}
      {...sortableProps}
    >
      <div className="flex gap-3 items-center w-5/6">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(value) => onSelectChange(awb_number)}
          aria-label="Select all"
        />
        <div className="flex flex-col gap-2 grow">
          <div className="flex items-center gap-1 w-full">
            <text className="text-sm font-bold">{awb_number}</text>
            <span className="bg-card text-xs rounded-full px-2 py-1">{priorityItem(priority)}</span>
          </div>
          <div className="flex gap-1 w-full">
            <div className="text-xs text-muted-foreground flex gap-1 items-center w-1/2 ">
              <User className="size-3 shrink-0" />
              <div className="overflow-hidden text-ellipsis text-nowrap justify-start grow">{consignor}</div>
            </div>
            <div className="text-xs text-muted-foreground flex gap-1 items-center w-1/2">
              <Weight className="size-3" />
              {weight}{unit}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-1/6 justify-end">
        <Button size="fit" variant="icon" onClick={buttonAction}>
          {buttonIcon}
        </Button>
      </div>
    </div>
  )
}

export { AWBCard }
