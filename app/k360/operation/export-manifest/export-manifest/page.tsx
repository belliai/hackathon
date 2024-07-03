import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterSection from "@/components/operation/ExportManifest/ExportManifest/FilterSection"
import PlannedSection from "@/components/operation/ExportManifest/ExportManifest/PlannedSection"
import RightSection from "@/components/operation/ExportManifest/ExportManifest/RightSection"
import UnplannedSection from "@/components/operation/ExportManifest/ExportManifest/UnplannedSection"

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
  )
}
