import {
  Container,
  Group,
  Anchor,
  Flex,
  ActionIcon,
  Image,
} from "@mantine/core";
import classes from "./FooterSimple.module.css";
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react";
import logo2 from "./assets/2023-11-14 15_19_05-Window.webp";
import logo3 from "./assets/datenbrauerei.webp";

const links = [
  {
    link: "https://www.statistik-berlin-brandenburg.de/",
    label: "Amt für Statistik Berlin-Brandenburg",
  },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Image src={logo2} maw={50} mah={40} mx="auto" />
          <Image src={logo3} maw={50} mah={40} mx="auto" />
        </Flex>
        <Group className={classes.links}>{items}</Group>
        <Group className={classes.social}>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://github.com/derneuere"
          >
            <IconBrandGithub />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
