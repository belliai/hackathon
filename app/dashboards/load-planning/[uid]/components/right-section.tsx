import { BoxesIcon, Search, Trash2 } from "lucide-react"
import { AWBCard } from "./awb-card"
import { useLoadPlanningDetailsContext } from "../../contexts/load-planning-details-context"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/form/combobox"

const PRIORITY_OPTIONS = [
  { label: 'Urgent', value: 'Urgent' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' }
]

const RightSection: React.FC = () => {
  const { formFilterHooks, onSubmitFilters, droppedItems, setModalDetails, setConfirmationModal } = useLoadPlanningDetailsContext();

  return (
    <section className="w-1/3 bg-card border rounded-lg flex flex-col gap-3 p-3 h-fit sticky top-[64px]">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex gap-1 items-center">
          <BoxesIcon className="size-4" />
          Cargo Details
        </h3>
      </div>
      <div className="w-full">
        <Form {...formFilterHooks}>
          <form onSubmit={formFilterHooks.handleSubmit(onSubmitFilters)} className="flex gap-2">
            <div className="w-2/3">
              <FormField
                control={formFilterHooks.control}
                name="unplanned_search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold dark:text-muted-foreground">Search Airway Bills</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[40px] dark:border-2 dark:border-foreground/30"
                        leftIcon={<Search className="size-4" />}
                        placeholder="Search AWB ..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="w-1/3">
              <Combobox
                name="unplanned_priority"
                options={PRIORITY_OPTIONS}
                label="Priority"
                info="Select Priority"
                tooltipId="Select Priority"
                placeholder="Priority"
              />
            </div>
            
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar h-fit max-h-[50vh]">
        {droppedItems['droppable-aircraft']?.map(awb => (
          <AWBCard
            {...awb}
            key={awb.id}
            buttonIcon={<Trash2 className="size-4" />}
            buttonAction={() => {
              setModalDetails({
                title: 'Remove Airway Bill',
                description: `You are about to Remove Airway Biil ${awb.awb_number} from this flight.`
              })

              setConfirmationModal(true)
            }}
            onSelectChange={() => {}}
            isSelected={false} />
        ))}
      </div>
    </section>
  )
}

export { RightSection }
