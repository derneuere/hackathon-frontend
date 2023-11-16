import React, { useState } from "react";

import { Card, TextInput, Stack, Text, Title, ActionIcon } from "@mantine/core";
import { useGraphDataStore, useStatisticsStore } from "./Store";
import { IconSend, IconShare } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  useRegistriereMitIndex,
  RegistriereMitIndexVariables,
} from "./client/datenbrauereiComponents";
import { mockdata } from "./Helper";
import { AbfrageDimension } from "./client/datenbrauereiSchemas";

export function SubscribeCard() {
  const { variables } = useStatisticsStore((state) => state);
  const { graphData } = useGraphDataStore((state) => state);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const registriereMitIndexMutation = useRegistriereMitIndex();
  //test
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Stack>
          <Title order={3}>
            Werde informiert, wenn sich dein Index ändert!
          </Title>

          <TextInput
            label={<Text c="dimmed">Gib deinem Index einen Namen!</Text>}
            placeholder="Remote Refugium Tracker"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          ></TextInput>
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
                    const dimensionen: AbfrageDimension[] = variables.map(
                      (item) => {
                        let weight: "NULL" | "EINS" | "ZWEI" | "DREI" = "NULL";
                        if (item.weight == 1) {
                          weight = "EINS";
                        }
                        if (item.weight == 2) {
                          weight = "ZWEI";
                        }
                        if (item.weight == 3) {
                          weight = "DREI";
                        }

                        return {
                          merkmalName:
                            mockdata.find((m) => m.title === item.name)
                              ?.querykey || "",
                          gewichtung: weight,
                        };
                      }
                    );
                    const formData: RegistriereMitIndexVariables = {
                      body: {
                        email: email,
                        name: name,
                        abfragen: [
                          {
                            dimensionen: dimensionen,
                            regionalerUmfang: "12",
                          },
                        ],
                      },
                    };
                    registriereMitIndexMutation.mutate(formData);
                    notifications.show({
                      title: "Index aboniert",
                      message:
                        "Wir informieren dich sobald dein Index sich ändert!",
                      color: "green",
                    });
                    setEmail("");
                    setName("");
                  }}
                />
              </ActionIcon>
            }
          ></TextInput>
        </Stack>
      </Stack>
    </Card>
  );
}
