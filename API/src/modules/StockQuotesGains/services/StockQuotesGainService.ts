import { ListQuoteService } from "Modules/StockQuotes/services";
import { getStockHistory } from "Services/routeCalls/routeCallsService";
import {
  StockGainDTO,
  StockGainObjectDTO,
  StockGainsPayloadDTO,
} from "../DTOs";

export class StockQuotesGainService {
  public async stockGains({
    stockName,
    purchaseDate,
    purchasedValue,
  }: StockGainsPayloadDTO): Promise<StockGainDTO> {
    const stockQuoteHistory = (await getStockHistory(stockName))[
      "Time Series (Daily)"
    ];

    if (!stockQuoteHistory)
      throw new Error(
        "Unavailable API service! Probably 5 requests per minute has expired."
      );

    const stockQuoteToday = await new ListQuoteService().listByCompany({
      stockName,
    });

    const stockQuotePast = stockQuoteHistory[purchaseDate];
    const priceAtDate = stockQuotePast["4. close"];

    if (purchasedValue > stockQuotePast["5. volume"])
      throw new Error(
        "Purchase Stock amount greater then Stock sold in the day."
      );

    // Patterns of variable names
    const capitalGains =
      stockQuoteToday.lastPrice * purchasedValue - priceAtDate * purchasedValue;
    const lastPrice = stockQuoteToday.lastPrice;
    const name = stockQuoteToday.name;
    const purchasedAmount = purchasedValue;
    const purchasedAt = purchaseDate;

    const stockGains = await this.createObjectStockGain({
      name,
      lastPrice,
      priceAtDate,
      purchasedAmount,
      purchasedAt,
      capitalGains,
    });

    return stockGains;
  }

  public async createObjectStockGain({
    name,
    lastPrice,
    priceAtDate,
    purchasedAmount,
    purchasedAt,
    capitalGains,
  }: StockGainObjectDTO): Promise<StockGainDTO> {
    return Object.assign({
      name,
      lastPrice,
      priceAtDate,
      purchasedAmount,
      purchasedAt,
      capitalGains,
    });
  }
}
