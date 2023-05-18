export enum BundlesEnum {
  internetAndTv = "internetAndTv",
  internetAndPhone = "internetAndPhone",
}

export enum ServicesEnum {
  internet = "internet",
  tv = "tv",
  phone = "phone",
  decoder = "decoder",
}

export type Prices = Record<
  number,
  Record<ServicesEnum | Exclude<BundlesEnum, "noBundle">, number>
>;
