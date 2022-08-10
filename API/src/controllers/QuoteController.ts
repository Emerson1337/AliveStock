import { ListQuoteService } from "../modules/Quotes/services";
import { Request, Response } from "express";
import { QuoteDataDTO } from "../interfaces/quotes";

export class QuoteController {
  public async listQuoteByCompany(request: Request, response: Response) {
    var { companyName } = request.params;
    const quoteResponse: QuoteDataDTO =
      await new ListQuoteService().listByCompany({
        companyName,
      });

    return response.send(quoteResponse);
  }
}
