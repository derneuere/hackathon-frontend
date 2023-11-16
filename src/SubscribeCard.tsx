import React from "react";

import { Card, Flex, Stack, Text, Title, Progress } from "@mantine/core";
import { useGraphDataStore, useStatisticsStore } from "./Store";

export function SubscribeCard() {
  const { circles } = useStatisticsStore((state) => state);
  const { graphData } = useGraphDataStore((state) => state);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Stack>
          <Title order={3}>Kreis:</Title>
          <Flex gap="md" direction={{ base: "column", sm: "row" }}></Flex>
        </Stack>
      </Stack>
    </Card>
  );
}
