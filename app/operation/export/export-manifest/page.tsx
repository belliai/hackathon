import FilterSection from "@/components/operation/Export/ExportManifest/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSection from "@/components/operation/Export/ExportManifest/RightSection";
import PlannedSection from "@/components/operation/Export/ExportManifest/PlannedSection";
import UnplannedSection from "@/components/operation/Export/ExportManifest/UnplannedSection";

export default async function ExportManifest() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-5">
        <div className="w-3/4">
          <Tabs defaultValue="unplanned" className="w-full">
            <TabsList>
              <TabsTrigger value="unplanned">Unplanned</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
            </TabsList>
            <TabsContent value="unplanned">
              <UnplannedSection />
            </TabsContent>
            <TabsContent value="planned">
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
