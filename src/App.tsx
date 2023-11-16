import { Title, Text, Center, Stack, Flex } from "@mantine/core";
import { useViewportSize, useDisclosure, useMediaQuery } from "@mantine/hooks";
import BarGraph from "./Graph";
import { mockdata } from "./Helper";
import { useStatisticsStore } from "./Store";
import { Variables } from "./Variables";
import { ModalSubscribe } from "./ModalSubscribe";
import { CircleDetails } from "./CircleDetails";
import { SubscribeCard } from "./SubscribeCard";
import { useLocation } from "react-router-dom";

function App() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const chosenVariables = query.get("variables")?.split(",");
  const weights = query.get("weights")?.split(",");

  const [opened, { open, close }] = useDisclosure(false);
  const { variables, addVariable } = useStatisticsStore((state) => state);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (variables.length === 0) {
    if (chosenVariables && weights) {
      chosenVariables.forEach((item, index) =>
        addVariable({
          name: mockdata.find((x) => x.querykey === item)?.title || "",
          weight: parseInt(weights[index]),
          selected: true,
        })
      );
    } else {
      mockdata.map((item) =>
        addVariable({
          name: item.title,
          weight: 1,
          selected: true,
        })
      );
    }
  }

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
      <Stack align="center">
        <Center>
          <div>
            <Title variant="gradient" align="center" size="50">
              Die Datenbrauerei
            </Title>
            <Text c="dimmed" size="lg">
              Auf der{" "}
              <Text component="span" inherit variant="gradient">
                Spur
              </Text>{" "}
              nach dem optimalen Remote-Refugium
            </Text>
          </div>
        </Center>
        <div style={{ height: 25 }}></div>
        <Flex
          gap="xl"
          justify={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
        >
          <BarGraph
            width={
              isMobile ? Math.min(width - 100, 900) : Math.min(width - 500, 900)
            }
            height={Math.min(400, 400)}
          />
          <Variables openSubscribe={open} />
        </Flex>
        <CircleDetails></CircleDetails>
        <SubscribeCard></SubscribeCard>

        <div style={{ height: 100 }}></div>
      </Stack>
      <ModalSubscribe opened={opened} close={close} />
    </div>
  );
}

export default App;
