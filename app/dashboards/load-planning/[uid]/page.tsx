"use client"

import { FC } from 'react';
import { useParams } from 'next/navigation';
import { LeftSection } from './components/left-section';
import { RightSection } from './components/right-section';
import { MiddleSection } from './components/middle-section';
import { LoadPlanningDetailsProvider } from '../contexts/load-planning-details-context';

const LoadPlanningDetail: FC = () => {
  const params = useParams();
  const uid = params.uid as string;

  return (
    <LoadPlanningDetailsProvider>
      <div className="w-full flex gap-4">
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </div>
    </LoadPlanningDetailsProvider>
  );
};

export default LoadPlanningDetail;