import {
  UnstyledButton,
  Checkbox,
  Text,
  Card,
  Slider,
  Flex,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import classes from "./ImageCheckbox.module.css";
interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  icon: any;
}

export function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  icon,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      data-checked={value || undefined}
      className={classes.button}
    >
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
            checked={value}
            onChange={() => {}}
            tabIndex={-1}
            styles={{ input: { cursor: "pointer" } }}
          />
        </Flex>
        <Slider> </Slider>
      </Card>
    </UnstyledButton>
  );
}
