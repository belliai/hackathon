"use client";

import PageContainer from "@/components/layout/PageContainer";
import HeatmapGraph from "@/components/charts/heatmap-chart";
import LineGraph from "@/components/charts/curve-chart";
import { RandomFacts } from "@/components/charts/random-facts-chart";
import { RadarGraph, RadarGraphData } from "@/components/charts/radar-graph-chart";

// Define ExerciseWithData type locally
type ExerciseWithData = {
  id: number;
  name: string;
  data: { weightLifted: number; numberOfRepetitions: number; doneAt: string }[];
};

// Define HeatmapData type locally
type Bin = {
  weekIndex: number;
  count: number;
};

type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type HeatmapData = {
  dayIndex: Day;
  bins: Bin[];
};

// Mock data for the charts and random facts
const mockHeatmapData: HeatmapData[] = [
  {
    dayIndex: "monday",
    bins: [
      { weekIndex: 1, count: 10 },
      { weekIndex: 2, count: 20 },
      { weekIndex: 3, count: 30 },
      { weekIndex: 4, count: 40 },
      { weekIndex: 5, count: 50 },
      { weekIndex: 6, count: 60 },
    ],
  },
  {
    dayIndex: "tuesday",
    bins: [
      { weekIndex: 1, count: 5 },
      { weekIndex: 2, count: 15 },
      { weekIndex: 3, count: 25 },
      { weekIndex: 4, count: 35 },
      { weekIndex: 5, count: 45 },
      { weekIndex: 6, count: 55 },
    ],
  },
];

const mockRadarData: RadarGraphData[] = [
  {
    frequency: 100,
    exerciseName: "cargo",
  },
  {
    frequency: 50,
    exerciseName: "flights",
  },
  {
    frequency: 40,
    exerciseName: "booking",
  },
];



const exercisesData: ExerciseWithData[] = [
  {
    id: 1,
    name: "Bench Press",
    data: [
      { weightLifted: 100, numberOfRepetitions: 10, doneAt: "2023-01-01T00:00:00Z" },
      { weightLifted: 110, numberOfRepetitions: 8, doneAt: "2023-01-02T00:00:00Z" },
    ],
  },
  {
    id: 2,
    name: "Squat",
    data: [
      { weightLifted: 200, numberOfRepetitions: 5, doneAt: "2023-01-01T00:00:00Z" },
      { weightLifted: 210, numberOfRepetitions: 4, doneAt: "2023-01-02T00:00:00Z" },
    ],
  },
];

export default function Charts() {
  return (
    <PageContainer className="py-8 gap-6">
      <h2 className="text-xl font-semibold mb-2">Charts</h2>
      <div className="flex-wrap grid grid-cols-2 grid-rows-2 gap-4">
        <div className="col-span-1">
          <HeatmapGraph/>
        </div>
        <div className="col-span-1">
          <RadarGraph data={mockRadarData} />
        </div>
        <div className="col-span-1 justify-content-center">
          <RandomFacts exercises={exercisesData} />
        </div>
        <div className="col-span-1">
          <LineGraph />
        </div>
      </div>
    </PageContainer>
  );
}
