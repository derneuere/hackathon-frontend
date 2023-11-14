import React, { useMemo, useCallback } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";
import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from "@visx/tooltip";
// Sort data by frequency
const data = letterFrequency.slice(5).sort((a, b) => a.frequency - b.frequency);
const verticalMargin = 120;
type TooltipData = LetterFrequency;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export function Graph({ width, height }: BarsProps) {
  // State to track the currently hovered bar and its data
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<LetterFrequency>();

  // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
  // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg ref={containerRef} width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              xlinkTitle="test"
              fill="rgba(23, 233, 217, .5)"
              onMouseEnter={() => {
                console.log("enter");
                console.log(d);
                console.log(barX);
                console.log(barY);
                showTooltip({
                  tooltipData: d,
                  tooltipLeft: barX,
                  tooltipTop: barY,
                });
              }}
              onMouseLeave={() => {
                console.log("hide");
                hideTooltip();
              }}
            />
          );
        })}
      </Group>
      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          {tooltipData && (
            <div>
              <strong>Letter: {tooltipData.letter}</strong>
              <br />
              Frequency: {Number(tooltipData.frequency) * 100}
            </div>
          )}
        </TooltipInPortal>
      )}
    </svg>
  );
}

const BarGraph = Graph;

export default BarGraph;
