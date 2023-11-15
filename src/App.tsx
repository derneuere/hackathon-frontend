import {
  Title,
  Text,
  Card,
  Center,
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
import { useStatisticsStore } from "./Store";

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
  const { variables, addVariable } = useStatisticsStore((state) => state);

  if (variables.length === 0) {
    mockdata.map((item) =>
      addVariable({
        name: item.title,
        weight: 1,
        selected: true,
      })
    );
  }

  const items = mockdata.map((item) => (
    <ImageCheckbox {...item} key={item.title} />
  ));

  const debug = false;

  const { ref, height } = useElementSize();
  const { width } = useViewportSize();

  return (
    <div
      style={{
        paddingTop: 20,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        backgroundSize: "cover",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Stack align="center" justify="flex-end">
        <Center>
          <Card>
            <Title variant="gradient" weight={700} align="center" size="50">
              Die Datenbrauerei
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
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <BarGraph
            width={Math.min(width - 500, 900)}
            height={Math.min(height, 400)}
          />
          <SimpleGrid ref={ref} cols={1}>
            <Title>Themenauswahl</Title>
            <Text c="dimmed">Welchen Merkmale willst du vergleichen?</Text>
            {items}
          </SimpleGrid>
        </Flex>
        {debug &&
          variables.map((variable) => (
            <Text key={variable.name} component="span" inherit>
              {" "}
              {variable.name}
              <Text component="span" inherit variant="gradient">
                {" "}
                {variable.weight}
              </Text>
              {variable.selected ? "✅" : "❌"}
            </Text>
          ))}
      </Stack>
    </div>
  );
}

export default App;
