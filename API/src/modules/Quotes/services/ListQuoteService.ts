import { GlobalQuotePayloadDTO } from "Interfaces/quotes";
import { CompanyDTO } from "Interfaces/general";
import { QuoteDataDTO } from "../DTOs/QuoteDataDTO";
import { getQuoteStock } from "Services/routeCalls/routeCallsService";

export class ListQuoteService {
  public async listByCompany({ stockName }: CompanyDTO): Promise<QuoteDataDTO> {
    const stockQuote = await getQuoteStock(stockName);

    return this.getCurrentStockQuoteValue(stockQuote.data);
  }

  public getCurrentStockQuoteValue(globalQuote: GlobalQuotePayloadDTO) {
    if (typeof globalQuote["Global Quote"] == "undefined")
      throw new Error(
        "Unavailable API service! Probably 5 requests per minute has expired."
      );

    if (Object.keys(globalQuote["Global Quote"]).length)
      return {
        name: globalQuote["Global Quote"]["01. symbol"],
        lastPrice: Number(globalQuote["Global Quote"]["05. price"]),
        pricedAt: globalQuote["Global Quote"]["07. latest trading day"],
      };
    else throw new Error("Quote by stock not found!");
  }
}
