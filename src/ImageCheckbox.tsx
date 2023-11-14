import React from "react";
import {
  UnstyledButton,
  Checkbox,
  Text,
  Card,
  Slider,
  Flex,
} from "@mantine/core";

import classes from "./ImageCheckbox.module.css";
import { useStatisticsStore } from "./Store";

interface ImageCheckboxProps {
  title: string;
  description: string;
  icon: any;
}

export function ImageCheckbox({
  title,
  description,
  icon,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const { variables, changeVariable, addVariable } = useStatisticsStore(
    (state) => state
  );

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
          {icon}

          <div className={classes.body}>
            <Text c="dimmed" size="xs" lh={1} mb={5}>
              {description}
            </Text>
            <Text fw={500} size="sm" lh={1}>
              {title}
            </Text>
          </div>

          <Checkbox
            checked={item?.selected}
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
