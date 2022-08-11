import { GlobalQuotePayloadDTO } from "Interfaces/quotes";
import { stockApi } from "Services/api";
import { urls as apiUrls } from "@src/lib/urls";
import { CompanyDTO } from "Interfaces/general";
import { QuoteDataDTO } from "../DTOs/QuoteDataDTO";

export class ListQuoteService {
  public async listByCompany({ stockName }: CompanyDTO): Promise<QuoteDataDTO> {
    const stockQuote = await stockApi.get(apiUrls.quotes.getQuoteStock(), {
      params: {
        symbol: stockName,
      },
    });

    return this.getCurrentStockQuoteValue(stockQuote.data);
  }

  public getCurrentStockQuoteValue(globalQuote: GlobalQuotePayloadDTO) {
    if (Object.keys(globalQuote["Global Quote"]).length)
      return {
        name: globalQuote["Global Quote"]["01. symbol"],
        lastPrice: Number(globalQuote["Global Quote"]["05. price"]),
        pricedAt: globalQuote["Global Quote"]["07. latest trading day"],
      };
    else throw new Error("quote by stock not found!");
  }
}
