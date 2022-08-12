import { ListQuoteService } from "Modules/StockQuotes/services";
import { getStockHistory } from "Services/routeCalls/routeCallsService";
import { formatDate } from "Helpers/dateFormatter";
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

    const stockQuoteToday = await new ListQuoteService().listByCompany({
      stockName,
    });

    const stockQuotePast = stockQuoteHistory[purchaseDate];
    const priceAtDate = stockQuotePast["4. close"];

    const changePercent =
      (priceAtDate - stockQuoteToday.lastPrice) / priceAtDate;

    // Patterns of variable names
    const capitalGains = -(purchasedValue * changePercent); // if change is negative, then the new price grown up
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
