import { create } from "zustand";

export type Variable = {
  name: string;
  weight: number;
  selected: boolean;
};

interface StatisticState {
  variables: Variable[];
  countys: string[];
  addVariable: (variable: Variable) => void;
  changeVariable: (variable: Variable) => void;
  changeCounty: (county: string) => void;
}

export const useStatisticsStore = create<StatisticState>((set) => ({
  variables: [],
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
