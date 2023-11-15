import React from "react";

import {
  Modal,
  Title,
  Card,
  Flex,
  Stack,
  Text,
  ActionIcon,
  Slider,
  TextInput,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { mockdata } from "./Helper";

import { useStatisticsStore } from "./Store";
type SubscribeProps = {
  opened: boolean;
  close: () => void;
};

export function ModalSubscribe({ opened, close }: SubscribeProps) {
  const { selectedVariable } = useStatisticsStore((state) => state);
  const selectedVariableMockdata = mockdata.find(
    (item) => item.title === selectedVariable
  );

  return (
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
          Wir können dich informieren, sobald ein von Dir gewählter Grenzwert in
          einem Kreis unter- oder überschritten wird.
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
  );
}
