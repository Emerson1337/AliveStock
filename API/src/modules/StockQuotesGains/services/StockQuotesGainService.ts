import { StockQuoteNotFound } from "Validators/StockException";
import { UnavailableServiceException } from "Validators/UnavailableServiceException";
import { ListQuoteService } from "Modules/StockQuotes/services";
import { getStockHistory } from "Services/routeCalls/routeCallsService";
import {
  StockGainDTO,
  StockGainObjectDTO,
  StockGainsPayloadDTO,
} from "../DTOs";
import { StockAmountException } from "Validators/StockException";

export class StockQuotesGainService {
  public async stockGains({
    stockName,
    purchaseDate,
    purchasedValue,
  }: StockGainsPayloadDTO): Promise<StockGainDTO> {
    const stockQuoteHistory = (await getStockHistory(stockName))[
      "Time Series (Daily)"
    ];

    if (!stockQuoteHistory) throw new StockQuoteNotFound(stockName);

    if (stockQuoteHistory["Note"]) throw new UnavailableServiceException();

    const stockQuoteToday = await new ListQuoteService().listByCompany({
      stockName,
    });

    const stockQuotePast = stockQuoteHistory[purchaseDate];
    const priceAtDate = stockQuotePast["4. close"];

    if (purchasedValue > stockQuotePast["5. volume"])
      throw new StockAmountException();

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
