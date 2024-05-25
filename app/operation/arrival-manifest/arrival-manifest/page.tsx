import FilterSection from "@/components/operation/ArrivalManifest/ArrivalManifest/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSection from "@/components/operation/ArrivalManifest/ArrivalManifest/RightSection";
import AwbSection from "@/components/operation/ArrivalManifest/ArrivalManifest/AwbSection";
import UldSection from "@/components/operation/ArrivalManifest/ArrivalManifest/UldSection";

export default async function ArrivalManifest() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-10">
        <div className="w-3/4">
          <Tabs defaultValue="awb-details" className="w-full">
            <TabsList>
              <TabsTrigger value="awb-details">AWB Details</TabsTrigger>
              <TabsTrigger value="uld-details">ULD Details</TabsTrigger>
            </TabsList>
            <TabsContent value="awb-details">
              <AwbSection />
            </TabsContent>
            <TabsContent value="uld-details">
              <UldSection />
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
