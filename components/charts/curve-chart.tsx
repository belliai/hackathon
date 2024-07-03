import React, { useEffect, useRef, useState } from "react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

export type LineGraphData = {
  weightLifted: number;
  numberOfRepetitions: number;
  doneAt: string;
};

const getDate = (d: LineGraphData) => new Date(d.doneAt);

const calculateOneRepMax = (weight: number, repetitions: number) => {
  return weight * repetitions * 0.0333 + weight;
};

export const LineGraph = ({ data = [] }: { data: LineGraphData[] }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const divRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set dimensions

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div ref={divRef} style={{ width: '100%', height: '100%' }} />;
  }

  const dateScale = scaleTime({
    range: [0, dimensions.width],
    domain: [
      Math.min(...data.map((x) => getDate(x).getTime())),
      Math.max(...data.map((x) => getDate(x).getTime())),
    ],
  });

  const oneRepMaxScale = scaleLinear({
    range: [dimensions.height - 1, 1],
    round: true,
    domain: [
      Math.min(...data.map((d) => calculateOneRepMax(d.weightLifted, d.numberOfRepetitions))),
      Math.max(...data.map((d) => calculateOneRepMax(d.weightLifted, d.numberOfRepetitions))),
    ],
    nice: true,
  });

  return (
    <div ref={divRef} style={{ width: '100%', height: '100%' }}>
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        ref={svgRef}
        className="p-2"
      >
        <LinePath<LineGraphData>
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => oneRepMaxScale(calculateOneRepMax(d.weightLifted, d.numberOfRepetitions)) ?? 0}
          className="stroke-brand-color-two"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </svg>
    </div>
  );
};

export default LineGraph;
