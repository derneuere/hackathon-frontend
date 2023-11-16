import React, { useEffect } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import {
  Card,
  Title,
  Menu,
  UnstyledButton,
  ChevronIcon,
  Stack,
} from "@mantine/core";
import type { GraphData } from "./Store";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { useGraphDataStore, useStatisticsStore } from "./Store";

import { fetchGetErgebnisFuerMerkmal } from "./client/datenbrauereiComponents";
import { useQueries } from "@tanstack/react-query";
// To-Do: Add animation
import { useSpring, animated } from "react-spring";
import { mockdata } from "./Helper";

// Sort data by frequency
const verticalMargin = 25;

// accessors
const purple3 = "#c8d8e4";
const purple2 = "#52ab98";
export const purple1 = "#2b6777";

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

export type StackedBarData = {
  circle: string;
  Gästeübernachtungen?: number;
  "Anzahl der Grundschulen"?: number;
  "Durchschnittlicher Kaufwert je qm"?: number;
};

export function Graph({ width, height }: BarsProps) {
  const { changeCounty, countys, variables, circles, selectCircle } =
    useStatisticsStore((state) => state);
  const setGraphData = useGraphDataStore((state) => state.setGraphData);
  const queries = variables.map((variable) => {
    return {
      queryKey: ["getErgebnisFuerMerkmal", variable.name],
      queryFn: () =>
        fetchGetErgebnisFuerMerkmal({
          pathParams: {
            name:
              mockdata.find((item) => item.title === variable.name)?.querykey ||
              "",
          },
        }),
      staleTime: Infinity,
    };
  });

  const results = useQueries({
    queries: queries,
  });
  const resultData = results.map((item) => item.data);
  console.log(resultData);

  // Map AbfrageErgebnis to GraphData
  const maybeArray = resultData.map((singleResult) =>
    singleResult?.merkmalErgebnisse?.map((item) => {
      const graphData: GraphData = {
        name:
          mockdata.find((item) => item.querykey === singleResult.abfrageId)
            ?.title || "", // Use the requested merkmal
        county: "Brandenburg", // Use the selected county
        circle: item.regionalGliederungLabel || "",
        value: item.normierterWert || 0,
        absolute: item.absoluterWert || 0,
      };
      return graphData;
    })
  );

  let maybe: GraphData[] = [];
  maybeArray.forEach((array) => {
    maybe = maybe.concat(array ? array : []);
  });

  useEffect(() => {
    setGraphData(maybe);
    console.log(variables);
  }, [variables]);

  const xMax = width;
  const yMax = height - verticalMargin;

  const keys = [...new Set(maybe.map((item) => item.name))];
  const absoluteValuesWithKeys = {};
  maybe.forEach((item) => {
    const keyName = item.name + item.circle;
    absoluteValuesWithKeys[keyName] = item.absolute;
  });

  const transformedData = maybe
    .filter((item) => item.county === countys[0])
    .reduce<StackedBarData[]>((accumulator, item) => {
      const existingItem = accumulator.find(
        (accItem) => accItem.circle === item.circle
      );

      const variable = variables.find(
        (variable) => variable.name === item.name
      );

      const weight = variable?.selected ? variable?.weight : 0;

      if (existingItem) {
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

  const largestTotal = transformedData[transformedData.length - 1]
    ? Object.values(transformedData[transformedData.length - 1]).reduce(
        (acc, value) => acc + parseFloat(value) || 0,
        0
      )
    : 0;
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
    domain: [0, largestTotal],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: [
      "Durchschnittlicher Kaufwert je qm",
      "Anzahl der Grundschulen",
      "Gästeübernachtungen",
    ],
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
      <Stack>
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
                      fill={
                        circles.includes(bar.bar.data.circle)
                          ? shadeColor(bar.color, -20)
                          : mockdata.find((item) => item.querykey === bar.key)
                              ?.barcolor
                      }
                      onClick={() => {
                        selectCircle(bar.bar.data.circle);
                      }}
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
                  <br />
                  Absoluter Wert:{" "}
                  {
                    absoluteValuesWithKeys[
                      tooltipData.key + tooltipData.bar.data.circle
                    ]
                  }
                </div>
              )}
            </TooltipInPortal>
          )}
        </svg>
      </Stack>
    </Card>
  );
}

const BarGraph = Graph;

export default BarGraph;
