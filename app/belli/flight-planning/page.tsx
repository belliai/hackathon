import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignedSection from "@/components/operation/FlightPlanning/AssignedSection";
import CartLoadSection from "@/components/operation/FlightPlanning/CartLoadSection";
import RightSection from "@/components/operation/FlightPlanning/RightSection";
import UldLoadSection from "@/components/operation/FlightPlanning/UldLoadSection";
import UnassinedSection from "@/components/operation/FlightPlanning/UnassignedSection";
import { DataTable } from "@/components/data-table/data-table";

export default function FlightPlanning() {
  return (
    <div>
      <div className="flex gap-5">
        <div className="w-3/4 dataTableContainer">
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