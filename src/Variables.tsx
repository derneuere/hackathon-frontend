import React from "react";
import { IconPlus } from "@tabler/icons-react";
import {
  Button,
  Stack,
  Title,
  Text,
  Modal,
  UnstyledButton,
  Card,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { mockdata } from "./Helper";
import { ImageCheckbox } from "./ImageCheckbox";
import { useDisclosure } from "@mantine/hooks";
import { useStatisticsStore } from "./Store";
type VariablesProps = {
  openSubscribe: () => void;
};

export function Variables({ openSubscribe }: VariablesProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { variables, addVariable } = useStatisticsStore((state) => state);
  const nonSelectedMockdata = mockdata.filter(
    (item) => !variables.find((variable) => variable.name === item.title)
  );
  const items = mockdata
    .filter((item) =>
      variables.find((variable) => variable.name === item.title)
    )
    .map((item) => (
      <ImageCheckbox {...item} key={item.title} open={openSubscribe} />
    ));

  const modalItems = nonSelectedMockdata.map((item) => (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Flex
        mih={40}
        miw={300}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <ActionIcon variant="filled" color={item.color}>
          {item.icon}
        </ActionIcon>
        <div>
          <Text c="dimmed" size="xs" lh={1} mb={5}>
            {item.description}
          </Text>
          <Text
            fw={500}
            size="sm"
            color={item.darkerColor ? item.darkerColor : item.color}
            lh={1}
          >
            {item.title}
          </Text>
        </div>
        <ActionIcon
          variant="filled"
          color={item.color}
          onClick={() => {
            addVariable({
              name: item.title,
              weight: 1,
              selected: true,
            });
            close();
          }}
        >
          <IconPlus></IconPlus>
        </ActionIcon>
      </Flex>
    </Card>
  ));

  return (
    <div>
      <Stack align={"center"}>
        <div>
          <Title>Themenauswahl</Title>
          <Text c="dimmed">Welche Merkmale willst Du vergleichen?</Text>
        </div>
        {items}
        <Button variant="light" color="green" onClick={() => open()}>
          <IconPlus width={75}></IconPlus>
        </Button>
      </Stack>
      <Modal
        title={<Title order={3}>Füge ein neues Merkmal hinzu</Title>}
        opened={opened}
        onClose={close}
      >
        {modalItems}
      </Modal>
    </div>
  );
}
