import React from 'react';
import { HeatmapRect } from '@visx/heatmap';
import { scaleLinear } from '@visx/scale';
import { max } from 'd3-array';
import { Card, CardContent } from '@/components/ui/card';

// Adjusted example data to match the screenshot
const data = [
  { x: 1, bins: [{ y: 1, count: 5 }, { y: 2, count: 10 }, { y: 4, count: 8 }] },
  { x: 2, bins: [{ y: 1, count: 15 }, { y: 2, count: 10 }] },
  { x: 3, bins: [{ y: 2, count: 8 }, { y: 3, count: 12 }] },
  { x: 6, bins: [{ y: 3, count: 10 }] },
  { x: 7, bins: [{ y: 3, count: 5 }] },
];

// Day labels
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// Constants for gap and bin dimensions
const binWidth = 50;
const binHeight = 50;
const gap = 3;

// Determine the maximum x and y values in the data for scaling purposes
const maxX = max(data, d => d.x) || 0;
const maxY = max(data, d => max(d.bins, b => b.y)) || 0;

const xScale = scaleLinear({
  domain: [0, maxX + 1], // Adjusted domain to include full range
  range: [0, (maxX + 1) * (binWidth + gap)] // Adjusted range to fit within SVG width
});

const yScale = scaleLinear({
  domain: [0, maxY + 1], // Adjusted domain to include full range
  range: [0, (maxY + 1) * (binHeight + gap)] // Adjusted range to fit within SVG height
});

const colorScale = scaleLinear({
  domain: [0, max(data, d => max(d.bins, b => b.count)) || 1],
  range: ['#E6E6FA', '#4B0082'], // Light purple to dark purple color range
});

const Heatmap = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center">
        <svg width={450} height={350}>
          {/* Day labels */}
          {days.map((day, index) => (
            <text
              key={`day-label-${index}`}
              x={xScale(index + 1) - 25}
              y={20}
              textAnchor="middle"
              fontSize="14px"
              fill="#FFFFFF"
            >
              {day}
            </text>
          ))}
          <HeatmapRect
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            binWidth={binWidth}
            binHeight={binHeight}
            gap={gap} // Gap between squares
            count={(bin: { count: number }) => bin.count}
          >
            {heatmap => heatmap.map((heatmapBins, i) => (
              heatmapBins.map((bin, j) => (
                <rect
                  key={`heatmap-bin-${i}-${j}`}
                  x={bin.x}
                  y={bin.y + 30} // Adjust y position to account for day labels
                  width={bin.width}
                  height={bin.height}
                  fill={bin.color}
                />
              ))
            ))}
          </HeatmapRect>
        </svg>
      </CardContent>
    </Card>
  );
};

export default Heatmap;
