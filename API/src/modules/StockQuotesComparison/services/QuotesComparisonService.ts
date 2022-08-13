import { InvalidInputDataException } from "Validators/DataException";
import { ListQuoteService } from "Modules/StockQuotes/services";

import { QuotesComparisonDTO, StocksCompareDTO } from "../DTOs";

export class QuotesComparisonService {
  public async compareStockQuotes({
    stockName,
    stocksToCompare,
  }: StocksCompareDTO): Promise<QuotesComparisonDTO> {
    // Verifying user input data
    if (!stocksToCompare.length) throw new InvalidInputDataException();

    // Getting stock to compare info
    const mainStock = await new ListQuoteService().listByCompany({ stockName });

    // Put stock to compare in first position
    const comparisonQuotes = Object.assign({ lastPrices: [mainStock] });

    // Getting rest of data
    for (const stockName of stocksToCompare) {
      await comparisonQuotes.lastPrices.push(
        await new ListQuoteService().listByCompany({ stockName })
      );
    }

    return comparisonQuotes;
  }
}
