import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath, AreaClosed } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { Card, CardContent } from '@/components/ui/card';
import { LinearGradient } from '@visx/gradient';

// Example data
const data = [
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 1, 1), value: 20 },
  { date: new Date(2023, 2, 1), value: 15 },
  { date: new Date(2023, 3, 1), value: 30 },
  { date: new Date(2023, 4, 1), value: 25 },
];

const xScale = scaleTime({
  domain: [Math.min(...data.map(d => d.date.getTime())), Math.max(...data.map(d => d.date.getTime()))],
  range: [0, 500],
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.map(d => d.value))],
  range: [500, 0],
});

const LineGraphWithGradient = () => {
  return (
    <Card>
      <CardContent style={{ justifyContent: 'center' }}>
        <svg width={500} height={500}>
          <LinearGradient id="gradient" from="#4B0082" to="#800080" />
          <rect width={500} height={500} fill="url(#gradient)" />
          
          <AreaClosed
            data={data}
            x={d => xScale(d.date)}
            y={d => yScale(d.value)}
            yScale={yScale}
            fill="rgba(255, 105, 180, 0.2)"  // Adjust the pink fill color's transparency
            stroke="transparent"
          />
          
          <LinePath
            data={data}
            x={d => xScale(d.date)}
            y={d => yScale(d.value)}
            stroke="#FF69B4"  // Pink color for the line
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </svg>
      </CardContent>
    </Card>
  );
};

export default LineGraphWithGradient;
