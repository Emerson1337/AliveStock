import { StockQuoteNotFound } from "Validators/StockException";
import { GlobalQuotePayloadDTO } from "Interfaces/StockQuotes";
import { CompanyDTO } from "Interfaces/general";
import { QuoteDataDTO } from "../DTOs/QuoteDataDTO";
import { getQuoteStock } from "Services/routeCalls/routeCallsService";
import { UnavailableServiceException } from "Validators/UnavailableServiceException";

export class ListQuoteService {
  public async listByCompany({ stockName }: CompanyDTO): Promise<QuoteDataDTO> {
    const stockQuote = await getQuoteStock(stockName);

    return this.getCurrentStockQuoteValue(stockQuote.data, stockName);
  }

  public getCurrentStockQuoteValue(
    globalQuote: GlobalQuotePayloadDTO,
    stockName: string
  ) {
    if (typeof globalQuote["Global Quote"] == "undefined")
      throw new UnavailableServiceException();

    if (Object.keys(globalQuote["Global Quote"]).length)
      return {
        name: globalQuote["Global Quote"]["01. symbol"],
        lastPrice: Number(globalQuote["Global Quote"]["05. price"]),
        pricedAt: globalQuote["Global Quote"]["07. latest trading day"],
      };
    else throw new StockQuoteNotFound(stockName);
  }
}
