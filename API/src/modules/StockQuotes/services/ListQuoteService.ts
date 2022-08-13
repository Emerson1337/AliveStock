import { StockQuoteNotFound } from "Validators/StockException";
import { GlobalQuotePayloadDTO } from "Interfaces/StockQuotes";
import { CompanyDTO } from "Interfaces/general";
import { QuoteDataDTO } from "../DTOs/QuoteDataDTO";
import { getQuoteStock } from "Services/routeCalls/routeCallsService";
import { UnavailableServiceException } from "Validators/UnavailableServiceException";

export class ListQuoteService {
  public async listByCompany({ stockName }: CompanyDTO): Promise<QuoteDataDTO> {
    const stockQuote = await getQuoteStock(stockName);

    // Getting the current stock quote value
    return this.getCurrentStockQuoteValue(stockQuote.data, stockName);
  }

  public getCurrentStockQuoteValue(
    globalQuote: GlobalQuotePayloadDTO,
    stockName: string
  ) {
    // Verifying if we got response but without values
    if (typeof globalQuote["Global Quote"] == "undefined")
      throw new UnavailableServiceException();

    // Verifying if there some value, if not thats means the stockname is wrong
    if (Object.keys(globalQuote["Global Quote"]).length)
      return {
        name: globalQuote["Global Quote"]["01. symbol"],
        lastPrice: Number(globalQuote["Global Quote"]["05. price"]),
        pricedAt: globalQuote["Global Quote"]["07. latest trading day"],
      };
    else throw new StockQuoteNotFound(stockName);
  }
}
