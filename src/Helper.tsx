import {
  IconBackpack,
  IconHomeSearch,
  IconPlaneDeparture,
} from "@tabler/icons-react";

export const mockdata = [
  {
    description: "Kaufwerte für Bauland",
    title: "Durchschnittlicher Kaufwert je qm",
    icon: <IconHomeSearch />,
    color: "theme-blue-green.0",
    barcolor: "#2b6777",
    querykey: "baulandpreis",
  },
  {
    description: "Allgemeinbildende Schulen",
    title: "Anzahl der Grundschulen",
    icon: <IconBackpack />,
    color: "theme-green.0",
    barcolor: "#52ab98",
    querykey: "grundschule",
  },
  {
    description: "Tourismus",
    title: "Gästeübernachtungen",
    icon: <IconPlaneDeparture />,
    color: "theme-light-blue.0",
    darkerColor: "theme-light-blue.2",
    barcolor: "#c8d8e4",
    querykey: "gaesteuebernachtung",
  },
];
