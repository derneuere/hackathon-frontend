import React from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { Card, Title, Menu, UnstyledButton, ChevronIcon } from "@mantine/core";
import type { GraphData } from "./Store";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { useStatisticsStore } from "./Store";

import { AxisBottom } from "@visx/axis";
import { useGetAbfrageErgebnis } from "./client/datenbrauereiComponents";

// To-Do: Add animation
import { useSpring, animated } from "react-spring";

// Sort data by frequency
const verticalMargin = 120;

// accessors
const purple1 = "#6c5efb";
const purple2 = "#c998ff";
export const purple3 = "#a44afe";

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export type StackedBarData = {
  circle: string;
  Gästeübernachtungen: number;
  "Anzahl der Grundschulen": number;
  "Durchschnittlicher Kaufwert je qm": number;
};

export function Graph({ width, height }: BarsProps) {
  const { data: result } = useGetAbfrageErgebnis({
    pathParams: { id: "baulandpreise" },
    // To-Do: Add county to query
  });

  // Map AbfrageErgebnis to GraphData
  const maybe = result?.merkmalErgebnisse?.map((item) => {
    const graphData: GraphData = {
      name: item.merkmalCode || "", // This is just an id
      county: "Brandenburg", // Use the selected county
      circle: item.regionalGliederung || "", // This is a number!
      value: item.normierterWert || 0,
    };
    return graphData;
  });

  const xMax = width;
  const yMax = height - verticalMargin;

  const { graphData, changeCounty, countys, variables } = useStatisticsStore(
    (state) => state
  );
  const keys = [...new Set(graphData.map((item) => item.name))];

  const transformedData = graphData
    .filter((item) => item.county === countys[0])
    .reduce<StackedBarData[]>((accumulator, item) => {
      const existingItem = accumulator.find(
        (accItem) => accItem.circle === item.circle
      );

      const variable = variables.find(
        (variable) => variable.name === item.name
      );

      const weight = variable?.selected ? variable?.weight : 1;

      if (existingItem) {
        // Check if a key with name item.name exists
        const existingKey = Object.keys(existingItem).find(
          (key) => key === item.name
        );
        // If the key doesn't exist, create a new entry
        existingItem[item.name] = item.value * weight;
      } else {
        // If the circle doesn't exist, create a new entry
        accumulator.push({
          circle: item.circle,
          [item.name]: item.value * weight,
        } as StackedBarData);
      }
      return accumulator;
    }, []);

  // sort transformed data by total value
  transformedData.sort((a, b) => {
    const aTotal = Object.values(a).reduce(
      (acc, value) => acc + parseFloat(value) || 0,
      0
    );
    const bTotal = Object.values(b).reduce(
      (acc, value) => acc + parseFloat(value) || 0,
      0
    );

    return aTotal - bTotal;
  });

  const originalData = transformedData;
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
  } = useTooltip<StackedBarData>();

  // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
  // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  // scales, memoize for performance
  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map((i) => i.circle),
    padding: 0.4,
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, 3],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: data.map((d) => Object.keys(d)[1]),
    range: [purple1, purple2, purple3],
  });

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
        <Group>
          <BarStack<StackedBarData, string>
            data={data}
            x={(i: StackedBarData) => {
              return i.circle;
            }}
            keys={keys}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onMouseEnter={() => {
                      showTooltip({
                        tooltipData: bar,
                        tooltipLeft: bar.x,
                        tooltipTop: bar.y,
                      });
                    }}
                    onMouseLeave={() => {
                      hideTooltip();
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          top={yMax}
          scale={xScale}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={{
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
        {tooltipOpen && (
          <TooltipInPortal
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            {tooltipData && (
              <div>
                <strong>Kreis: {tooltipData.bar.data.circle}</strong>
                <br />
                <strong>Statistik: {tooltipData.key}</strong>
                <br />
                Relativer Wert:{" "}
                {Number(tooltipData.bar.data[tooltipData.key]).toFixed(2)}
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
