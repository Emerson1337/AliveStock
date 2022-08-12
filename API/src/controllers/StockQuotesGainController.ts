import { Request, Response } from "express";
import { StockQuotesGainService } from "Modules/QuotesGains/services";

export class StockQuotesGainController {
  public async stockQuoteGains(request: Request, response: Response) {
    var { stockName } = request.params;
    var { purchasedAt, purchasedAmount } = request.query;

    const purchaseDate = String(purchasedAt);
    const purchasedValue = Number(purchasedAmount);

    try {
      const stockGainQuote: any = await new StockQuotesGainService().stockGains(
        {
          stockName,
          purchaseDate,
          purchasedValue,
        }
      );

      return response.send(stockGainQuote);
    } catch (error: any) {
      return response.status(404).send({
        errors: error.message,
      });
    }
  }
}
