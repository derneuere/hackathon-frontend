import React, { ReactNode } from "react";
import {
  UnstyledButton,
  Checkbox,
  Text,
  Card,
  Slider,
  Flex,
  ActionIcon,
} from "@mantine/core";

import classes from "./ImageCheckbox.module.css";
import { useStatisticsStore } from "./Store";
import { IconBell, IconX } from "@tabler/icons-react";

interface ImageCheckboxProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  darkerColor?: string;
  open: () => void;
}

export function ImageCheckbox({
  title,
  description,
  icon,
  color,
  darkerColor,
  open,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const { variables, changeVariable, selectVariable, removeVariable } =
    useStatisticsStore((state) => state);

  const item = variables.find((item) => item.name === title);

  return (
    <UnstyledButton {...others} className={classes.button}>
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
          <Checkbox
            checked={item?.selected}
            color={color}
            onChange={() => {
              changeVariable({
                name: title,
                weight: item?.weight || 0,
                selected: !item?.selected || false,
              });
            }}
            tabIndex={-1}
            styles={{ input: { cursor: "pointer" } }}
          />
          <div>
            <Flex
              mih={50}
              miw={300}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <ActionIcon variant="filled" color={color}>
                {icon}
              </ActionIcon>

              <div className={classes.body}>
                <Text c="dimmed" size="xs" lh={1} mb={5}>
                  {description}
                </Text>
                <Text
                  fw={500}
                  size="sm"
                  color={darkerColor ? darkerColor : color}
                  lh={1}
                >
                  {title}
                </Text>
              </div>

              <ActionIcon
                variant="light"
                color="yellow"
                onClick={() => {
                  selectVariable(title);
                  open();
                }}
              >
                <IconBell></IconBell>
              </ActionIcon>
            </Flex>
            <Slider
              disabled={!item?.selected}
              step={1}
              min={0}
              max={3}
              marks={[
                { value: 0, label: "0" },
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
              ]}
              color={color}
              value={item?.weight}
              onChange={(i: number) =>
                changeVariable({
                  name: title,
                  weight: i,
                  selected: item?.selected || false,
                })
              }
            >
              {" "}
            </Slider>
          </div>
        </Flex>
        <ActionIcon style={{ position: "absolute", top: 0, right: 0 }}>
          <IconX onClick={() => removeVariable(item)}></IconX>
        </ActionIcon>
      </Card>
    </UnstyledButton>
  );
}
