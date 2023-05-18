import { BundlesEnum, type ServicesEnum } from "./types";

export const LABELS = {
  internet: "Internet",
  tv: "TV",
  internetAndTv: "Internet + TV",
  internetAndPhone: "Internet + Phone",
  phone: "Phone",
  decoder: "TV Decoder",
  noBundle: "I don't want one",
} as const;

export const BUNDLES = {
  [BundlesEnum.internetAndTv]: ["internet", "tv"],
  [BundlesEnum.internetAndPhone]: ["internet", "phone"],
} as Record<BundlesEnum, ServicesEnum[]>;

export const SERVICES = [
  "internet",
  "phone",
  "tv",
  "decoder",
] as ServicesEnum[];

export const DEFAULT_YEAR = 2023;
