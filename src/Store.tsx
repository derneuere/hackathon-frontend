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
  circles: string[];
  selectedVariable: string;
  addVariable: (variable: Variable) => void;
  removeVariable: (variable: Variable) => void;
  changeVariable: (variable: Variable) => void;
  changeCounty: (county: string) => void;
  selectCircle: (circle: string) => void;
  selectVariable: (variable: string) => void;
}

interface GraphDataState {
  graphData: GraphData[];
  setGraphData: (data: GraphData[]) => void;
}

export const useStatisticsStore = create<StatisticState>((set) => ({
  variables: [],
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

export const useGraphDataStore = create<GraphDataState>((set) => ({
  graphData: [
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.69,
      absolute: 206.13,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Spree-Neiße",
      value: 1,
      absolute: 16.73,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Prignitz",
      value: 0.99,
      absolute: 22.7,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Brandenburg an der Havel",
      value: 0.89,
      absolute: 83.74,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Elbe-Elster",
      value: 1,
      absolute: 18.6,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Uckermark",
      value: 0.99,
      absolute: 24.8,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Dahme-Spreewald",
      value: 0.86,
      absolute: 103.11,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Teltow-Fläming",
      value: 0.75,
      absolute: 167.55,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Frankfurt (Oder)",
      value: 0.99,
      absolute: 27.89,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Märkisch-Oderland",
      value: 0.86,
      absolute: 104.94,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Cottbus",
      value: 0.93,
      absolute: 63.72,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Havelland",
      value: 0.73,
      absolute: 181.57,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Oberspreewald-Lausitz",
      value: 0.98,
      absolute: 30.8,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0,
      absolute: 611.96,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Oberhavel",
      value: 0.76,
      absolute: 164.66,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Ostprignitz-Ruppin",
      value: 0.98,
      absolute: 33.57,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Oder-Spree",
      value: 0.89,
      absolute: 83.9,
    },
    {
      name: "Durchschnittlicher Kaufwert je qm",
      county: "Brandenburg",
      circle: "Potsdam-Mittelmark",
      value: 0.85,
      absolute: 106.14,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.68,
      absolute: 33,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Spree-Neiße",
      value: 0.42,
      absolute: 24,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Prignitz",
      value: 0.34,
      absolute: 21,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Brandenburg an der Havel",
      value: 0.11,
      absolute: 13,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Elbe-Elster",
      value: 0.51,
      absolute: 27,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Uckermark",
      value: 0.74,
      absolute: 35,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Dahme-Spreewald",
      value: 0.65,
      absolute: 32,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Teltow-Fläming",
      value: 0.71,
      absolute: 34,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Frankfurt (Oder)",
      value: 0,
      absolute: 9,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Märkisch-Oderland",
      value: 0.88,
      absolute: 40,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Cottbus",
      value: 0.14,
      absolute: 14,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Havelland",
      value: 0.54,
      absolute: 28,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Oberspreewald-Lausitz",
      value: 0.4,
      absolute: 23,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.71,
      absolute: 34,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Oberhavel",
      value: 0.91,
      absolute: 41,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Ostprignitz-Ruppin",
      value: 0.42,
      absolute: 24,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Oder-Spree",
      value: 0.8,
      absolute: 37,
    },
    {
      name: "Anzahl der Grundschulen",
      county: "Brandenburg",
      circle: "Potsdam-Mittelmark",
      value: 1,
      absolute: 44,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Barnim",
      value: 0.51,
      absolute: 731727,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Spree-Neiße",
      value: 0.35,
      absolute: 537191,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Prignitz",
      value: 0.15,
      absolute: 282053,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Brandenburg an der Havel",
      value: 0.09,
      absolute: 214422,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Elbe-Elster",
      value: 0.07,
      absolute: 181724,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Uckermark",
      value: 0.52,
      absolute: 744223,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Dahme-Spreewald",
      value: 1,
      absolute: 1344308,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Teltow-Fläming",
      value: 0.28,
      absolute: 451060,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Frankfurt (Oder)",
      value: 0,
      absolute: 93938,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Märkisch-Oderland",
      value: 0.39,
      absolute: 581681,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Cottbus",
      value: 0.06,
      absolute: 169025,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Havelland",
      value: 0.09,
      absolute: 218376,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Oberspreewald-Lausitz",
      value: 0.47,
      absolute: 686476,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Potsdam",
      value: 0.59,
      absolute: 842666,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Oberhavel",
      value: 0.25,
      absolute: 409135,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Ostprignitz-Ruppin",
      value: 0.54,
      absolute: 774772,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Oder-Spree",
      value: 0.73,
      absolute: 1016077,
    },
    {
      name: "Gästeübernachtungen",
      county: "Brandenburg",
      circle: "Potsdam-Mittelmark",
      value: 0.58,
      absolute: 827658,
    },
  ],
  setGraphData: (data) => set(() => ({ graphData: data })),
}));
