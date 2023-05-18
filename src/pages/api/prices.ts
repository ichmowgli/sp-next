import { type Prices } from "@/lib/types";
import { type NextApiRequest, type NextApiResponse } from "next";

const PRICES = {
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
} as Prices;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json(PRICES);
}
