import { Request, Response } from "express";

import { QuoteDataDTO } from "Modules/StockQuotes/DTOs/QuoteDataDTO";
import { ListQuoteService } from "Modules/StockQuotes/services";

export class QuoteController {
  public async listQuoteByCompany(request: Request, response: Response) {
    var { stockName } = request.params;

    try {
      const quoteResponse: QuoteDataDTO =
        await new ListQuoteService().listByCompany({
          stockName,
        });

      return response.send(quoteResponse);
    } catch (error: any) {
      return response.status(404).send({
        errors: error.message,
      });
    }
  }
}
