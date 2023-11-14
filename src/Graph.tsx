import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Card, Title, Menu, UnstyledButton, ChevronIcon } from "@mantine/core";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { useStatisticsStore } from "./Store";

// Sort data by frequency
const verticalMargin = 120;

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

  const countys = useStatisticsStore((state) => state.countys);
  const changeCounty = useStatisticsStore((state) => state.changeCounty);

  const originalData = letterFrequency
    .slice(5)
    .sort((a, b) => a.frequency - b.frequency);
  let data = originalData;
  // Remove smallest elements depending on width: 800, 600, 400, 200
  if (width < 800) {
    // Limit to 18 elements
    const length = originalData.length;
    data = originalData.slice(length - 18, length);
  }
  if (width < 600) {
    // Limit to 15 elements
    const length = originalData.length;
    data = originalData.slice(length - 15, length);
  }
  if (width < 400) {
    // Limit to 12 elements
    data = data.slice(3);
    const length = originalData.length;
    data = originalData.slice(length - 12, length);
  }
  if (width < 200) {
    // Limit to 9 elements
    data = data.slice(3);
    const length = originalData.length;
    data = originalData.slice(length - 9, length);
  }

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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      style={{ width: width + 50 }}
      withBorder
    >
      <Title>
        Platzierung der Top {data.length} Kreise in{" "}
        <Menu>
          <Menu.Target>
            <UnstyledButton>
              <Title inherit variant="gradient">
                {countys}
                <ChevronIcon width={50}></ChevronIcon>
              </Title>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Wähle ein anderes Bundesland aus</Menu.Label>
            <Menu.Item onClick={() => changeCounty("Berlin")}>
              <Title order={5} variant="gradient">
                Berlin
              </Title>
            </Menu.Item>
            <Menu.Item onClick={() => changeCounty("Hamburg")}>
              <Title order={5} variant="gradient">
                Hamburg
              </Title>
            </Menu.Item>
            <Menu.Item onClick={() => changeCounty("Hannover")}>
              <Title order={5} inherit variant="gradient">
                Hannover
              </Title>
            </Menu.Item>
            <Menu.Item onClick={() => changeCounty("Brandenburg")}>
              <Title order={5} inherit variant="gradient">
                Brandenburg
              </Title>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Title>
      <svg ref={containerRef} width={width} height={height}>
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
                rx={4}
                height={barHeight}
                xlinkTitle="Die Top Kreise in Deutschland"
                fill="rgb(82, 171, 152, .5)"
                onMouseEnter={() => {
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: barX,
                    tooltipTop: barY,
                  });
                }}
                onMouseLeave={() => {
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
    </Card>
  );
}

const BarGraph = Graph;

export default BarGraph;
