/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { create } from "zustand";
import { DEFAULT_YEAR, BUNDLES } from "./constants";
import { type BundlesEnum, type Prices, ServicesEnum } from "./types";

export type Store = {
  selectedYear: keyof Prices;
  selectedItems: ServicesEnum[];
  prices: Prices | null;
  saturatePrices: () => Promise<void>;
  totalPrice: () => number;
  getActiveBundle: () => BundlesEnum | null;
  getActiveBundlePrice: () => number;
  getActiveDiscount: () => number;

  selectYear: (year: keyof Prices) => void;

  isSelected: (item: ServicesEnum) => boolean;

  addService: (item: ServicesEnum) => void;
  removeService: (item: string) => void;
  canAdd: (item: string) => boolean;
  hasTVItem: () => boolean;
};

export const useCalcStore = create<Store>((set, get) => ({
  selectedItems: [],
  selectedYear: DEFAULT_YEAR,
  prices: null,
  saturatePrices: () => {
    return fetch("/api/prices")
      .then((res) => res.json())
      .then((res) => {
        set({ prices: res });
      });
  },

  isSelected: (item) => {
    return get().selectedItems.includes(item);
  },

  addService: (item) => {
    if (get().isSelected(item)) {
      return;
    }

    return set({ selectedItems: get().selectedItems.concat(item) });
  },

  removeService: (item) => {
    const toRemove = [item];

    if (item === "tv") {
      toRemove.push("decoder");
    }

    return set({
      selectedItems: get().selectedItems.filter((i) => !toRemove.includes(i)),
    });
  },

  canAdd: (item) => {
    if (item === "decoder" && !get().hasTVItem()) {
      return false;
    }

    return true;
  },

  hasTVItem: () => {
    return get().selectedItems.includes(ServicesEnum.tv);
  },

  getActiveBundle: () => {
    const possibleBundles = Object.keys(BUNDLES).filter((bundle) => {
      const bundleItems = BUNDLES[bundle as keyof typeof BUNDLES];
      return bundleItems.every((item) => get().selectedItems.includes(item));
    }) as BundlesEnum[];

    if (possibleBundles.length === 0) {
      return null;
    }

    const prices = get().prices;
    if (!prices) return null;

    const pricesForYear = prices[get().selectedYear];
    if (!pricesForYear) return null;

    const sortedByPrice = possibleBundles.sort(
      (a, b) => pricesForYear[a] - pricesForYear[b]
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return sortedByPrice[0]!;
  },

  getActiveDiscount: () => {
    const bundle = get().getActiveBundle();
    if (!bundle) return 0;

    const prices = get().prices;
    if (!prices) return 0;

    const pricesForYear = prices[get().selectedYear];
    if (!pricesForYear) return 0;

    const totalPriceWithoutBundle = get().selectedItems.reduce<number>(
      (acc, item) => {
        return acc + pricesForYear[item];
      },
      0
    );

    return totalPriceWithoutBundle - get().totalPrice();
  },

  getActiveBundlePrice: () => {
    const bundle = get().getActiveBundle();
    if (!bundle) return 0;

    const prices = get().prices;
    if (!prices) return 0;

    const pricesForYear = prices[get().selectedYear];
    if (!pricesForYear) return 0;

    return pricesForYear[bundle];
  },

  totalPrice: () => {
    const selectedYear = get().selectedYear;
    const prices = get().prices;
    if (!prices) return 0;
    const pricesForThisYear = prices[selectedYear];

    if (!pricesForThisYear) return 0;

    const bundle = get().getActiveBundle();
    const bundlePrice = get().getActiveBundlePrice();

    const freeItems = bundle ? BUNDLES[bundle] : [];

    const paidItems = get().selectedItems.filter(
      (item) => !freeItems.includes(item)
    );

    return paidItems.reduce<number>((acc: number, item: string) => {
      const p = pricesForThisYear[item as keyof typeof pricesForThisYear];
      return acc + p;
    }, bundlePrice);
  },

  selectYear: (year) => set({ selectedYear: year }),
}));
