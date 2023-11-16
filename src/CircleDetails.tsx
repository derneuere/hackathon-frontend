import React from "react";

import { Card, Flex, Stack, Text, Title, Progress } from "@mantine/core";
import { useGraphDataStore, useStatisticsStore } from "./Store";
import { mockdata } from "./Helper";

export function CircleDetails() {
  const { circles } = useStatisticsStore((state) => state);
  const { graphData } = useGraphDataStore((state) => state);

  if (circles.length === 0) {
    return <></>;
  }
  return (
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
                      <Text
                        size="md"
                        color={
                          mockdata.find((item) => item.title === i.name)
                            ?.darkerColor
                            ? mockdata.find((item) => item.title === i.name)
                                ?.darkerColor
                            : mockdata.find((item) => item.title === i.name)
                                ?.color
                        }
                      >
                        {i.absolute}
                      </Text>
                      <Progress
                        value={i.value * 100}
                        color={
                          mockdata.find((item) => item.title === i.name)?.color
                        }
                      ></Progress>
                    </Stack>
                  </Card>
                ))}
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
