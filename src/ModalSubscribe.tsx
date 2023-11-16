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

import { useStatisticsStore, useGraphDataStore } from "./Store";
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
  const { graphData } = useGraphDataStore((state) => state);
  const [email, setEmail] = useState("");
  const selectedVariableMockdata = mockdata.find(
    (item) => item.title === selectedVariable
  );

  const selectedVariableGraphData = graphData
    .filter((item) => item.name === selectedVariable)
    .map((i) => i.absolute)
    .sort();

  const maxValueForSelectedVariable =
    selectedVariableGraphData[selectedVariableGraphData.length - 1] * 1.5;
  const minValueForSelectedVariable = selectedVariableGraphData[0] * 0.75;

  console.log(maxValueForSelectedVariable);
  console.log(minValueForSelectedVariable);

  const [schwellwert, setSchwellwert] = useState(
    maxValueForSelectedVariable + minValueForSelectedVariable / 2
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
          <div style={{ paddingLeft: 25, paddingRight: 25 }}>
            <Slider
              value={schwellwert}
              onChange={setSchwellwert}
              color={selectedVariableMockdata?.color}
              step={1}
              min={minValueForSelectedVariable}
              max={maxValueForSelectedVariable}
              marks={[
                {
                  value: minValueForSelectedVariable,
                  label: `Min: ${Math.round(minValueForSelectedVariable)}`,
                },
                {
                  value: maxValueForSelectedVariable,
                  label: `Max: ${Math.round(maxValueForSelectedVariable)}`,
                },
              ]}
            ></Slider>
          </div>
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
