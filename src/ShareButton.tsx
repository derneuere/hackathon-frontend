import React from "react";

import { ActionIcon } from "@mantine/core";
import { useStatisticsStore } from "./Store";
import { IconShare } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { mockdata } from "./Helper";

export function ShareButton() {
  const { variables } = useStatisticsStore((state) => state);

  return (
    <ActionIcon
      onClick={() => {
        // only base url
        const baseurl = window.location.href.split("?")[0];
        // save to clipboard
        navigator.clipboard.writeText(
          baseurl +
            "?variables=" +
            variables
              .map(
                (item) => mockdata.find((x) => x.title === item.name)?.querykey
              )
              .join(",") +
            "&weights=" +
            variables.map((item) => item.weight).join(",")
        );
        notifications.show({
          title: "Link kopiert",
          message: "Dein Index wurde in die Zwischenablage kopiert!",
          color: "green",
        });
      }}
    >
      <IconShare></IconShare>
    </ActionIcon>
  );
}
