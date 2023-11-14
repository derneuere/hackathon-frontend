import { useState } from "react";
import {
  Title,
  Text,
  Card,
  Center,
  MantineProvider,
  Stack,
  SimpleGrid,
  Flex,
} from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import BarGraph from "./Graph";
import { ImageCheckbox } from "./ImageCheckbox";
import {
  IconBackpack,
  IconHomeSearch,
  IconPlaneDeparture,
} from "@tabler/icons-react";
const mockdata = [
  {
    description: "Kaufwerte für Bauland",
    title: "Durchschnittlicher Kaufwert je qm",
    icon: <IconHomeSearch />,
  },
  {
    description: "Allgemeinbildende Schulen",
    title: "Anzahl der Grundschulen",
    icon: <IconBackpack />,
  },
  {
    description: "Tourismus",
    title: "Gästeübernachtungen",
    icon: <IconPlaneDeparture />,
  },
];

function App() {
  const items = mockdata.map((item) => (
    <ImageCheckbox {...item} key={item.title} />
  ));

  const { ref, height } = useElementSize();
  const { width } = useViewportSize();

  // Theme colors: #2b6777, #c8d8e4, #ffffff, #f2f2f2, #52ab98
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          "theme-blue-green": ["#2b6777"],
          "theme-light-blue": ["#c8d8e4"],
          "theme-light-grey": ["#f2f2f2"],
          "theme-green": ["#52ab98"],
        },
        defaultGradient: {
          from: "#52ab98",
          to: "#2b6777",
        },
        components: {
          Slider: {
            defaultProps: {
              color: "theme-green.0",
            },
          },
          Checkbox: {
            defaultProps: {
              color: "theme-green.0",
            },
          },
          Text: {
            defaultProps: {
              color: "theme-blue-green.0",
            },
          },
        },
      }}
    >
      <div
        style={{
          paddingTop: 150,
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          backgroundSize: "cover",
        }}
      >
        <Stack align="center" justify="flex-end">
          <Center>
            <Card>
              <Title variant="gradient" weight={700} align="center" size="50">
                Arbeitsfreiheit 2.0
              </Title>
              <Text c="dimmed" mt="md">
                Auf der{" "}
                <Text component="span" inherit variant="gradient">
                  Spur
                </Text>{" "}
                nach dem optimalen Remote-Refugium
              </Text>
            </Card>
          </Center>
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <BarGraph width={width - 500} height={height} />
            <SimpleGrid ref={ref} cols={1}>
              <Title>Themenauswahl</Title>
              <Text c="dimmed">Welchen Merkmale willst du vergleichen?</Text>
              {items}
            </SimpleGrid>
          </Flex>
        </Stack>
      </div>
    </MantineProvider>
  );
}

export default App;
