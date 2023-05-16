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
  internetAndTv: {
    items: ["phone", "decoder"],
  },
  internetAndPhone: {
    items: ["tv", "decoder"],
  },
  noBundle: { items: ["internet", "tv", "decoder", "phone"] },
} as const;

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
} as const;

export const DEFAULT_YEAR = 2023;
