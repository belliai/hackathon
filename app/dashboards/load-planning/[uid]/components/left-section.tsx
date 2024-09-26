import { Button } from "@/components/ui/button"
import { BoxesIcon, MoveRightIcon, Plus, Search } from "lucide-react"
import { AWBCard } from "./awb-card"
import { useLoadPlanningDetailsContext } from "../../contexts/load-planning-details-context"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/form/combobox"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { AWBData } from "../../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PRIORITY_OPTIONS = [
  { label: 'Urgent', value: 'Urgent' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' }
]

const LeftSection: React.FC = () => {
  const { formFilterHooks, onSubmitFilters, availableOrders, handleSelectChange, selectedItems, awbTab, setAwbTab, handleButtonAction, plannedOrders } = useLoadPlanningDetailsContext();
  return (
    <section className="w-1/3 bg-card border rounded-lg sticky top-[64px] h-fit">
      <Tabs value={awbTab} onValueChange={setAwbTab}>
        <TabsContent value="unplanned" asChild>
          <div className="flex flex-col gap-3 p-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold flex gap-1 items-center">
                <BoxesIcon className="size-4" />
                Airway Bills
              </h3>
              <TabsList className="gap-2 bg-transparent p-0">
                <TabsTrigger
                  className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                  value="unplanned"
                >
                  Unplanned
                </TabsTrigger>
                <TabsTrigger
                  className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                  value="planned"
                >
                  Planned
                </TabsTrigger>
              </TabsList>
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
            <SortableContext
              items={availableOrders.map(
                (order: AWBData) => `${order.awb_number}`
              )}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar h-fit max-h-[50vh]">
                {availableOrders.map(awb => (
                  <AWBCard
                    {...awb}
                    key={awb.id}
                    buttonIcon={<Plus className="size-4" />}
                    buttonAction={() => { handleButtonAction(awb.awb_number) }}
                    onSelectChange={handleSelectChange}
                    isSelected={selectedItems.has(`${awb.awb_number}`)}
                    isDraggable
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </TabsContent>
        <TabsContent value="planned" asChild>
          <div className="flex flex-col gap-3 p-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold flex gap-1 items-center">
                <BoxesIcon className="size-4" />
                Airway Bills
              </h3>
              <TabsList className="gap-2 bg-transparent p-0">
                <TabsTrigger
                  className="h-fit text-sm border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                  value="unplanned"
                >
                  Unplanned
                </TabsTrigger>
                <TabsTrigger
                  className="h-fit text-sm border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                  value="planned"
                >
                  Planned
                </TabsTrigger>
              </TabsList>
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
            <SortableContext
              items={plannedOrders.map(
                (order: AWBData) => `${order.awb_number}`
              )}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar h-fit max-h-[50vh]">
                {plannedOrders.map(awb => (
                  <AWBCard
                    {...awb}
                    key={awb.id}
                    buttonIcon={<MoveRightIcon className="size-4" />}
                    buttonAction={() => { handleButtonAction(awb.awb_number) }}
                    onSelectChange={handleSelectChange}
                    isSelected={selectedItems.has(`${awb.awb_number}`)}
                    isDraggable
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export { LeftSection }
