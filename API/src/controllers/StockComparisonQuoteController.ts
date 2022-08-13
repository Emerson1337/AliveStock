import { Request, Response } from "express";

import { QuotesComparisonService } from "Modules/StockQuotesComparison/services";

export class ComparisonQuoteController {
  public async compareStocksQuotes(request: Request, response: Response) {
    var { stockName } = request.params;
    var { stocksToCompare } = request.query;

    try {
      const quoteHistoryResponse: any =
        await new QuotesComparisonService().compareStockQuotes({
          stockName,
          stocksToCompare,
        });

      return response.send(quoteHistoryResponse);
    } catch (error: any) {
      return response.status(404).send({
        errors: error.message,
      });
    }
  }
}
