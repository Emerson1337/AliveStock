import { ListQuoteService } from "Modules/StockQuotes/services";

import { QuotesComparisonDTO, StocksCompareDTO } from "../DTOs";

export class QuotesComparisonService {
  public async compareStockQuotes({
    stockName,
    stocksToCompare,
  }: StocksCompareDTO): Promise<QuotesComparisonDTO> {
    if (!stocksToCompare.length) throw new Error("Invalid data!");

    const mainStock = await new ListQuoteService().listByCompany({ stockName });

    const comparisonQuotes = Object.assign({ lastPrices: [mainStock] });

    for (const stockName of stocksToCompare) {
      await comparisonQuotes.lastPrices.push(
        await new ListQuoteService().listByCompany({ stockName })
      );
    }

    return comparisonQuotes;
  }
}