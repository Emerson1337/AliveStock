import { QuoteDataDTO } from "Modules/Quotes/DTOs/QuoteDataDTO";

export interface QuotesComparisonDTO {
  lastPrices: Array<QuoteDataDTO>;
}
