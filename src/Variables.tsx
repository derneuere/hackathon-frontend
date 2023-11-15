import React from "react";
import { IconPlus } from "@tabler/icons-react";
import { Button, Stack, Title, Text } from "@mantine/core";
import { mockdata } from "./Helper";
import { ImageCheckbox } from "./ImageCheckbox";

type VariablesProps = {
  openSubscribe: () => void;
};

export function Variables({ openSubscribe }: VariablesProps) {
  const items = mockdata.map((item) => (
    <ImageCheckbox {...item} key={item.title} open={openSubscribe} />
  ));
  return (
    <Stack>
      <div>
        <Title>Themenauswahl</Title>
        <Text c="dimmed">Welchen Merkmale willst du vergleichen?</Text>
      </div>
      {items}
      <Button variant="light" color="green">
        <IconPlus width={75}></IconPlus>
      </Button>
    </Stack>
  );
}
