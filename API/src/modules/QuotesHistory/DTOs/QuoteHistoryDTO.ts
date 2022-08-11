import { PricesHistoryDTO } from "./PricesHistoryDTO";

export interface QuoteHistoryDTO {
  name: string;
  prices: Array<PricesHistoryDTO>;
}
