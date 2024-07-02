import FilterSection from "@/components/operation/PlanFlight/FlightPlanning/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSection from "@/components/operation/PlanFlight/FlightPlanning/RightSection";
import UnassinedSection from "@/components/operation/PlanFlight/FlightPlanning/UnassignedSection";
import AssignedSection from "@/components/operation/PlanFlight/FlightPlanning/AssignedSection";
import CartLoadSection from "@/components/operation/PlanFlight/FlightPlanning/CartLoadSection";
import UldLoadSection from "@/components/operation/PlanFlight/FlightPlanning/UldLoadSection";
import AssignActionFormSection from "@/components/operation/PlanFlight/FlightPlanning/AssignActionFormSection";

export default async function FlightPlanning() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-5">
        <div className="w-3/4 flex flex-col gap-5">
          <AssignActionFormSection />
          <Tabs defaultValue="unassined-section" className="w-full">
            <TabsList>
              <TabsTrigger value="unassined-section">Unassigned AWB</TabsTrigger>
              <TabsTrigger value="assigned-section">Assigned AWB</TabsTrigger>
              <TabsTrigger value="cart-load">Cart Load</TabsTrigger>
              <TabsTrigger value="uld-load">ULD Load</TabsTrigger>
            </TabsList>
            <TabsContent value="unassined-section">
              <UnassinedSection />
            </TabsContent>
            <TabsContent value="assigned-section">
              <AssignedSection />
            </TabsContent>
            <TabsContent value="cart-load">
              <CartLoadSection />
            </TabsContent>
            <TabsContent value="uld-load">
              <UldLoadSection />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-1/4">
          <RightSection />
        </div>
      </div>
    </div>
  );
}
