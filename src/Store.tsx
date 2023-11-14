import { create } from "zustand";

type Variable = {
  name: string;
  weight: number;
};

interface StatisticState {
  variables: Variable[];
  countys: string[];
  addVariable: (variable: Variable) => void;
  removeVariable: (variable: Variable) => void;
  changeCounty: (county: string) => void;
}

export const useStatisticsStore = create<StatisticState>((set) => ({
  variables: [],
  countys: ["Brandenburg"],
  addVariable: (variable) =>
    set((state) => ({ variables: [...state.variables, variable] })),
  removeVariable: (variable) =>
    set((state) => ({
      variables: state.variables.filter((v) => v.name !== variable.name),
    })),
  changeCounty: (county) => set(() => ({ countys: [county] })),
}));
