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
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <BarGraph width={Math.min(width - 500, 900)} height={height} />
          <SimpleGrid ref={ref} cols={1}>
            <Title>Themenauswahl</Title>
            <Text c="dimmed">Welchen Merkmale willst du vergleichen?</Text>
            {items}
          </SimpleGrid>
        </Flex>
      </Stack>
    </div>
  );
}

export default App;
