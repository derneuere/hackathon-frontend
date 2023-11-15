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
  circles: string[];
  selectedVariable: string;
  addVariable: (variable: Variable) => void;
  removeVariable: (variable: Variable) => void;
  changeVariable: (variable: Variable) => void;
  changeCounty: (county: string) => void;
  selectCircle: (circle: string) => void;
  selectVariable: (variable: string) => void;
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
  selectedVariable: "",
  countys: ["Brandenburg"],
  circles: [],
  addVariable: (variable) =>
    set((state) => ({ variables: [...state.variables, variable] })),
  removeVariable: (variable) =>
    set((state) => ({
      variables: state.variables.filter((item) => item.name !== variable.name),
    })),
  changeVariable: (variable) =>
    set((state) => ({
      variables: state.variables.map((item) =>
        item.name === variable.name ? variable : item
      ),
    })),
  changeCounty: (county) => set(() => ({ countys: [county] })),
  selectCircle: (circle) =>
    set((state) => {
      if (state.circles.includes(circle)) {
        return { circles: state.circles.filter((item) => item !== circle) };
      } else {
        return { circles: [...state.circles, circle] };
      }
    }),
  selectVariable: (variable) => set(() => ({ selectedVariable: variable })),
}));
