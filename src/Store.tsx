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
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Brandenburg-Havel",
      value: 0.1,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Brandenburg-Havel",
      value: 0.1,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.1,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.4,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.5,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.2,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.5,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.1,
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
