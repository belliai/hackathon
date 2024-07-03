import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";

type ExerciseWithData = {
  id: number;
  name: string;
  data: { weightLifted: number; numberOfRepetitions: number; doneAt: string }[];
};

export type Props = {
  exercises: ExerciseWithData[];
};

export const RandomFacts = ({ exercises }: Props) => {
  const data = prepareRandomFactsData(exercises);

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Label htmlFor="weightLifted">Weight Lifted</Label>
              <strong id="weightLifted" className="text-4xl font-bold text-brand-color-two">
                {data.totalWeightLifted}
              </strong>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Label htmlFor="repetitionsMade">Repetitions Made</Label>
              <strong id="repetitionsMade" className="text-4xl font-bold text-brand-color-two">
                {data.totalNumberOfRepetitions}
              </strong>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Label htmlFor="numberOfDays">Number of Days</Label>
              <strong id="numberOfDays" className="text-4xl font-bold text-brand-color-two">
                {data.numberOfDays}
              </strong>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Label htmlFor="exercisesExplored">Exercises Explored</Label>
              <strong id="exercisesExplored" className="text-4xl font-bold text-brand-color-two">
                {data.totalExercises}
              </strong>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Label htmlFor="dataLogged">Data Logged</Label>
              <strong id="dataLogged" className="text-4xl font-bold text-brand-color-two">
                {data.totalData}
              </strong>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const prepareRandomFactsData = (exercises: ExerciseWithData[]) => {
  return {
    totalWeightLifted: exercises.reduce((prev, curr) => {
      return (
        prev +
        curr.data.reduce((prev, curr) => {
          return prev + curr.weightLifted;
        }, 0)
      );
    }, 0),

    totalNumberOfRepetitions: exercises.reduce((prev, curr) => {
      return (
        prev +
        curr.data.reduce((prev, curr) => {
          return prev + curr.numberOfRepetitions;
        }, 0)
      );
    }, 0),

    numberOfDays: exercises.reduce((prev, curr) => {
      curr.data.forEach((x) => prev.add(x.doneAt));
      return prev;
    }, new Set<string>()).size,

    totalExercises: exercises.length,

    totalData: exercises.reduce((prev, curr) => {
      return prev + curr.data.length;
    }, 0),
  };
};
