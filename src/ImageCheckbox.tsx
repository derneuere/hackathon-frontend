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

interface ImageCheckboxProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  darkerColor?: string;
}

export function ImageCheckbox({
  title,
  description,
  icon,
  color,
  darkerColor,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const { variables, changeVariable } = useStatisticsStore((state) => state);

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
      </Card>
    </UnstyledButton>
  );
}
