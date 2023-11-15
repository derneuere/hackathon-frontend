import { create } from "zustand";

export type Variable = {
  name: string;
  weight: number;
  selected: boolean;
};

export type GraphData = {
  name: string;
  circle: string;
  county: string;
  value: number;
  absolute: number;
};

interface StatisticState {
  variables: Variable[];
  countys: string[];
  graphData: GraphData[];
  addVariable: (variable: Variable) => void;
  changeVariable: (variable: Variable) => void;
  changeCounty: (county: string) => void;
}

export const useStatisticsStore = create<StatisticState>((set) => ({
  variables: [],
  graphData: [
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Brandenburg-Havel",
      value: 0.4,
      absolute: 5621,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Brandenburg-Havel",
      value: 0.1,
      absolute: 10,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Brandenburg-Havel",
      value: 0.1,
      absolute: 1000,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.1,
      absolute: 1000,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.4,
      absolute: 5621,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.5,
      absolute: 10,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.2,
      absolute: 1000,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.5,
      absolute: 5621,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.1,
      absolute: 10,
    },
  ],
  countys: ["Brandenburg"],
  addVariable: (variable) =>
    set((state) => ({ variables: [...state.variables, variable] })),
  changeVariable: (variable) =>
    set((state) => ({
      variables: state.variables.map((item) =>
        item.name === variable.name ? variable : item
      ),
    })),
  changeCounty: (county) => set(() => ({ countys: [county] })),
}));
