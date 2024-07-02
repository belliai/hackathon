import FilterSection from "@/components/operation/TruckExport/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlannedSection from "@/components/operation/TruckExport/PlannedSection";
import UnplannedSection from "@/components/operation/TruckExport/UnplannedSection";
import RightSection from "@/components/operation/TruckExport/RightSection";

export default async function TruckList() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-10">
        <div className="w-3/4">
          <Tabs defaultValue="Unplanned" className="w-full">
            <TabsList>
              <TabsTrigger value="Unplanned">Unplanned</TabsTrigger>
              <TabsTrigger value="Planned">Planned</TabsTrigger>
            </TabsList>
            <TabsContent value="Unplanned">
              <UnplannedSection />
            </TabsContent>
            <TabsContent value="Planned">
              <PlannedSection />
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
