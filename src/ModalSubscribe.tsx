import React, { useState } from "react";

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
import {
  RegistriereMitIndexVariables,
  useRegistriereMitIndex,
} from "./client/datenbrauereiComponents";

import { notifications } from "@mantine/notifications";

type SubscribeProps = {
  opened: boolean;
  close: () => void;
};

export function ModalSubscribe({ opened, close }: SubscribeProps) {
  const { selectedVariable } = useStatisticsStore((state) => state);
  const [email, setEmail] = useState("");
  const [schwellwert, setSchwellwert] = useState(0);
  const selectedVariableMockdata = mockdata.find(
    (item) => item.title === selectedVariable
  );

  const registriereMitIndexMutation = useRegistriereMitIndex();

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
          <Slider
            value={schwellwert}
            onChange={setSchwellwert}
            color={selectedVariableMockdata?.color}
          ></Slider>
        </Card>

        <TextInput
          label={
            <Text c="dimmed">
              Wohin sollen wir Deine Benachrichtigung senden?
            </Text>
          }
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Deine E-Mail Adresse"
          rightSection={
            <ActionIcon>
              <IconSend
                onClick={() => {
                  const formData: RegistriereMitIndexVariables = {
                    body: {
                      email: email,
                      abfragen: [
                        {
                          abfrageMitSchwellwert: {
                            merkmalName: selectedVariableMockdata?.title,
                            schwellwert: schwellwert,
                          },
                        },
                      ],
                    },
                  };
                  registriereMitIndexMutation.mutate(formData);
                  notifications.show({
                    title: "Schwellenwert aboniert",
                    message:
                      "Wir informieren dich sobald der Wert unter oder überschritten wird!",
                    color: "green",
                  });
                  setEmail("");
                  setSchwellwert(1);
                  close();
                }}
              />
            </ActionIcon>
          }
        ></TextInput>
      </Stack>
    </Modal>
  );
}
