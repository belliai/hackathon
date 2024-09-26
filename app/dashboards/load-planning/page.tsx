"use client"

import React from "react"
import { LoadPlanningProvider } from "./contexts/load-planning-context"
import { HeaderSection } from "./components/header-section"
import { FlightListSection } from "./components/flight-list-section"

const LoadPlanningPage: React.FC = () => {
  return (
    <LoadPlanningProvider>
      <div className="flex flex-col min-h-[calc(100vh-48px)]">
        <HeaderSection />
        <FlightListSection />
      </div>
    </LoadPlanningProvider>
    
  )
}

export default LoadPlanningPage