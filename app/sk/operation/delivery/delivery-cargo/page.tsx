import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AwbSection from "@/components/operation/Delivery/DeliveryCargo/AwbSection"
import FilterSection from "@/components/operation/Delivery/DeliveryCargo/FilterSection"
import RightSection from "@/components/operation/Delivery/DeliveryCargo/RightSection"
import UldSection from "@/components/operation/Delivery/DeliveryCargo/UldSection"

export default async function DeliveryCargo() {
  return (
    <div>
      <FilterSection />
      <div className="flex flex-col gap-5 py-5">
        <div className="w-full">
          <Tabs defaultValue="awb-details" className="w-full">
            <TabsList>
              <TabsTrigger value="awb-details">AWB Details Bulk</TabsTrigger>
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
        <div className="w-full">
          <RightSection />
        </div>
      </div>
    </div>
  )
}
