import { QuoteDataDTO } from "Modules/StockQuotes/DTOs/QuoteDataDTO";

export interface QuotesComparisonDTO {
  lastPrices: Array<QuoteDataDTO>;
}
