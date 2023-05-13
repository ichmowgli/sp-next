/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { create } from "zustand";
import { type BUNDLES, PRICES, DEFAULT_YEAR } from "./constants";

export type Store = {
  selectedYear: number;
  selectedItems: Record<keyof typeof BUNDLES, string[]>;
  selectedBundle: keyof typeof BUNDLES | null;
  selectBundle: (bundle: keyof typeof BUNDLES) => void;
  totalPrice: (bundle: keyof typeof BUNDLES) => number;
  selectYear: (year: number) => void;

  isSelected: (bundle: keyof typeof BUNDLES, item: string) => boolean;

  addService: (bundle: keyof typeof BUNDLES, item: string) => void;
  removeService: (bundle: keyof typeof BUNDLES, item: string) => void;
  canAdd: (bundle: keyof typeof BUNDLES, item: string) => boolean;
  hasTVItem: (bundle: keyof typeof BUNDLES) => boolean;
};

export const useCalcStore = create<Store>((set, get) => ({
  selectedItems: {
    internetAndTv: [],
    internetAndPhone: [],
    noBundle: [],
  },
  selectedYear: DEFAULT_YEAR,
  selectedBundle: null,

  selectBundle: (bundle) => set({ selectedBundle: bundle }),

  isSelected: (bundle, item) => {
    return get().selectedItems[bundle].includes(item);
  },

  addService: (bundle, item) => {
    if (get().selectedItems[bundle].includes(item)) {
      return;
    }

    return set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [bundle]: state.selectedItems[bundle].concat(item),
      },
    }));
  },

  removeService: (bundle, item) => {
    const toRemove = [item];

    if (item === "tv") {
      toRemove.push("decoder");
    }

    return set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [bundle]: state.selectedItems[bundle].filter(
          (i) => !toRemove.includes(i)
        ),
      },
    }));
  },

  canAdd: (bundle, item) => {
    if (item === "decoder" && !get().hasTVItem(bundle)) {
      return false;
    }

    return true;
  },

  hasTVItem: (bundle) => {
    return (
      get().selectedItems[bundle].includes("tv") || bundle == "internetAndTv"
    );
  },

  totalPrice: (bundle) =>
    get().selectedItems[bundle].reduce<number>((acc: number, item: string) => {
      const selectedYear = get().selectedYear;
      const pricesForThisYear = PRICES[selectedYear as keyof typeof PRICES];
      const p = pricesForThisYear[item as keyof typeof pricesForThisYear];
      return acc + p;
    }, 0),

  selectYear: (year: number) => set({ selectedYear: year }),
}));
