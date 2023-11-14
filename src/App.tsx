import { useState } from "react";
import {
  Title,
  Text,
  Button,
  Card,
  Center,
  MantineProvider,
  Stack,
} from "@mantine/core";
import BarGraph from "./Graph";
function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
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
          <BarGraph width={1000} height={300} />
          <Center>
            <Card>
              <Title
                variant="gradient"
                gradient={{ from: "#5be6b0", to: "#50c4af" }}
                weight={700}
                align="center"
              >
                WO REMOTE?
              </Title>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => setCount((count) => count + 1)}
              >
                count is {count}
              </Button>
              <Text>
                Edit <code>src/App.tsx</code> and save to test HMR
              </Text>
            </Card>
          </Center>
        </Stack>
      </div>
    </MantineProvider>
  );
}

export default App;
