import { getQuoteStock } from "Services/routeCalls/routeCallsService";
import { StockGainDTO, StockGainsPayloadDTO } from "../DTOs";

export class StockQuotesGainService {
  public async stockGains({
    stockName,
    purchaseDate,
    purchasedValue,
  }: StockGainsPayloadDTO): Promise<StockGainDTO> {
    const stockQuote = await getQuoteStock(stockName);

    const gainPercent: StockGainDTO = {
      name: "string",
      lastPrice: 2,
      priceAtDate: 2,
      purchasedAmount: 2,
      purchasedAt: "string",
      capitalGains: 2,
    };

    return gainPercent;
  }
}
