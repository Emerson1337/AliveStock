import { Request, Response } from "express";

import { ListQuoteHistoryService } from "Modules/StockQuotesHistory/services";

export class QuoteHistoryController {
  public async quoteHistoryByCompany(request: Request, response: Response) {
    var { stockName } = request.params;
    var { from, to } = request.query;

    const dateFrom = new Date(String(from));
    const dateTo = new Date(String(to));

    try {
      const quoteHistoryResponse: any =
        await new ListQuoteHistoryService().listHistoryQuoteByCompany({
          stockName,
          dateFrom,
          dateTo,
        });

      return response.send(quoteHistoryResponse);
    } catch (error: any) {
      return response.status(404).send({
        errors: error.message,
      });
    }
  }
}
