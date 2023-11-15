import {
  Title,
  Text,
  Card,
  Center,
  Stack,
  Progress,
  Flex,
  Slider,
  Modal,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import {
  useElementSize,
  useViewportSize,
  useDisclosure,
  useMediaQuery,
} from "@mantine/hooks";
import BarGraph from "./Graph";
import { ImageCheckbox } from "./ImageCheckbox";
import {
  IconBackpack,
  IconHomeSearch,
  IconPlaneDeparture,
  IconSend,
} from "@tabler/icons-react";

import { useStatisticsStore } from "./Store";

const mockdata = [
  {
    description: "Kaufwerte für Bauland",
    title: "Durchschnittlicher Kaufwert je qm",
    icon: <IconHomeSearch />,
    color: "theme-blue-green.0",
  },
  {
    description: "Allgemeinbildende Schulen",
    title: "Anzahl der Grundschulen",
    icon: <IconBackpack />,
    color: "theme-green.0",
  },
  {
    description: "Tourismus",
    title: "Gästeübernachtungen",
    icon: <IconPlaneDeparture />,
    color: "theme-light-blue.0",
    darkerColor: "theme-light-blue.2",
  },
];

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const { variables, circles, graphData, addVariable, selectedVariable } =
    useStatisticsStore((state) => state);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedVariableMockdata = mockdata.find(
    (item) => item.title === selectedVariable
  );

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
    <ImageCheckbox {...item} key={item.title} open={open} />
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
          <div>
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
          </div>
        </Center>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
        >
          <BarGraph
            width={
              isMobile ? Math.min(width - 100, 900) : Math.min(width - 500, 900)
            }
            height={Math.min(height, 400)}
          />
          <Stack ref={ref}>
            <div>
              <Title>Themenauswahl</Title>
              <Text c="dimmed">Welchen Merkmale willst du vergleichen?</Text>
            </div>
            {items}
          </Stack>
        </Flex>
        {circles.length > 0 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              {circles.map((circle) => (
                <Stack>
                  <Title order={3}>Kreis: {circle}</Title>
                  <Flex gap="md" direction={{ base: "column", sm: "row" }}>
                    {graphData
                      .filter((i) => i.circle === circle)
                      .map((i) => (
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                          <Stack mih={50} miw={200} spacing={"xs"}>
                            <Text size="sm" c="dimmed">
                              {i.name}
                            </Text>
                            <Text size="md">{i.absolute}</Text>
                            <Progress value={i.value * 100}></Progress>
                          </Stack>
                        </Card>
                      ))}
                  </Flex>
                </Stack>
              ))}
            </Stack>
          </Card>
        )}
        <div style={{ height: 100 }}></div>
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
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Title
            order={3}
            color={
              selectedVariableMockdata?.darkerColor
                ? selectedVariableMockdata?.darkerColor
                : selectedVariableMockdata?.color
            }
          >
            Abonniere einen Grenzwert
          </Title>
        }
      >
        <Stack>
          <Text c="dimmed" size="sm">
            Wir können dich informieren, sobald ein von Dir gewählter Grenzwert
            in einem Kreis unter- oder überschritten wird.
          </Text>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex
              mih={50}
              miw={290}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <ActionIcon
                variant="filled"
                color={selectedVariableMockdata?.color}
              >
                {selectedVariableMockdata?.icon}
              </ActionIcon>
              <div>
                <Text c="dimmed" size="xs" lh={1} mb={5}>
                  {selectedVariableMockdata?.description}
                </Text>
                <Text
                  fw={500}
                  size="sm"
                  color={
                    selectedVariableMockdata?.darkerColor
                      ? selectedVariableMockdata?.darkerColor
                      : selectedVariableMockdata?.color
                  }
                  lh={1}
                >
                  {selectedVariableMockdata?.title}
                </Text>
              </div>
            </Flex>
            <Slider color={selectedVariableMockdata?.color}></Slider>
          </Card>
          <TextInput
            label={
              <Text c="dimmed">
                Wohin sollen wir Deine Benachrichtigung senden?
              </Text>
            }
            placeholder="Deine E-Mail Adresse"
            rightSection={
              <ActionIcon>
                <IconSend />
              </ActionIcon>
            }
          ></TextInput>
        </Stack>
      </Modal>
    </div>
  );
}

export default App;
