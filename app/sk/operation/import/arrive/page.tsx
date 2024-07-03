import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActionSection from "@/components/operation/Import/Arrive/ActionSection"
import AwbSection from "@/components/operation/Import/Arrive/AwbSection"
import FilterSection from "@/components/operation/Import/Arrive/FilterSection"
import RightSection from "@/components/operation/Import/Arrive/RightSection"
import UldSection from "@/components/operation/Import/Arrive/UldSection"

export default async function Arrive() {
  return (
    <div>
      <FilterSection />
      <div className="flex gap-5 py-5">
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
          <ActionSection />
        </div>
        <div className="w-1/4">
          <RightSection />
        </div>
      </div>
    </div>
  )
}
