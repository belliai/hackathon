import FilterSection from "@/components/operation/ArrivalManifest/BreakUld/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwbSection from "@/components/operation/ArrivalManifest/BreakUld/AwbSection";
import UldSection from "@/components/operation/ArrivalManifest/BreakUld/UldSection";

export default async function BreakUld() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-5">
        <div className="w-full">
          <Tabs defaultValue="uld-details" className="w-full">
            <TabsList>
              <TabsTrigger value="uld-details">ULD Details</TabsTrigger>
              <TabsTrigger value="awb-details">AWB Details</TabsTrigger>
            </TabsList>
            <TabsContent value="awb-details">
              <AwbSection />
            </TabsContent>
            <TabsContent value="uld-details">
              <UldSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
