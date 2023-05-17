/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { create } from "zustand";
import { PRICES, DEFAULT_YEAR, BundlesEnum } from "./constants";

export type Store = {
  selectedYear: keyof typeof PRICES;
  selectedItems: Record<BundlesEnum, string[]>;
  selectedBundle: BundlesEnum;
  selectBundle: (bundle: BundlesEnum) => void;
  totalPrice: (bundle: BundlesEnum) => number;
  selectYear: (year: keyof typeof PRICES) => void;

  isSelected: (bundle: BundlesEnum, item: string) => boolean;

  addService: (bundle: BundlesEnum, item: string) => void;
  removeService: (bundle: BundlesEnum, item: string) => void;
  canAdd: (bundle: BundlesEnum, item: string) => boolean;
  hasTVItem: (bundle: BundlesEnum) => boolean;
};

export const useCalcStore = create<Store>((set, get) => ({
  selectedItems: {
    internetAndTv: [],
    internetAndPhone: [],
    noBundle: [],
  },
  selectedYear: DEFAULT_YEAR,
  selectedBundle: BundlesEnum.noBundle,

  selectBundle: (bundle) => set({ selectedBundle: bundle }),

  isSelected: (bundle, item) => {
    return get().selectedItems[bundle].includes(item);
  },

  addService: (bundle, item) => {
    if (get().selectedItems[bundle].includes(item)) {
      return;
    }

    const selectedItems = get().selectedItems;
    selectedItems[bundle].push(item);
    return set({ selectedItems });
  },

  removeService: (bundle, item) => {
    const toRemove = [item];

    if (item === "tv") {
      toRemove.push("decoder");
    }

    const selectedItems = get().selectedItems;
    selectedItems[bundle] = selectedItems[bundle].filter(
      (i) => !toRemove.includes(i)
    );

    return set({ selectedItems });
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

  totalPrice: (bundle) => {
    const selectedYear = get().selectedYear;
    const pricesForThisYear = PRICES[selectedYear];
    const bundlePrice = bundle !== "noBundle" ? pricesForThisYear[bundle] : 0;

    return get().selectedItems[bundle].reduce<number>(
      (acc: number, item: string) => {
        const p = pricesForThisYear[item as keyof typeof pricesForThisYear];
        return acc + p;
      },
      bundlePrice
    );
  },

  selectYear: (year) => set({ selectedYear: year }),
}));
