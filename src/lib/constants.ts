export const LABELS = {
  internet: "Internet",
  tv: "TV",
  internetAndTv: "Internet + TV",
  internetAndPhone: "Internet + Phone",
  phone: "Phone",
  decoder: "TV Decoder",
  noBundle: "I don't want one",
} as const;

export enum BundlesEnum {
  internetAndTv = "internetAndTv",
  internetAndPhone = "internetAndPhone",
}

export const BUNDLES = {
  [BundlesEnum.internetAndTv]: ["internet", "tv"],
  [BundlesEnum.internetAndPhone]: ["internet", "phone"],
} as Record<BundlesEnum, ServicesEnum[]>;

export enum ServicesEnum {
  internet = "internet",
  tv = "tv",
  phone = "phone",
  decoder = "decoder",
}
export const SERVICES = [
  "internet",
  "phone",
  "tv",
  "decoder",
] as ServicesEnum[];

export const PRICES = {
  2023: {
    internet: 39,
    tv: 49,
    internetAndTv: 79,
    internetAndPhone: 64,
    phone: 29,
    decoder: 29,
  },
  2024: {
    internet: 49,
    tv: 49,
    internetAndTv: 89,
    internetAndPhone: 64,
    phone: 29,
    decoder: 29,
  },
  2025: {
    internet: 59,
    tv: 59,
    internetAndTv: 99,
    internetAndPhone: 64,
    phone: 29,
    decoder: 29,
  },
} as Record<
  number,
  Record<ServicesEnum | Exclude<BundlesEnum, "noBundle">, number>
>;

export const DEFAULT_YEAR = 2023;
