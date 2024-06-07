"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress"; 

export default function DeliveryStatus() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Delivery Status</h2>
        <div className="flex items-center space-x-2">
          <Progress value={progress} className="w-[300%]" />
          <span>{progress}% Complete</span>
        </div>
      </div>
    );
}
