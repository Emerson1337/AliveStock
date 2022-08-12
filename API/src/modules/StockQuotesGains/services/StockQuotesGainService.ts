import { ListQuoteService } from "Modules/StockQuotes/services";
import { QuotesComparisonService } from "Modules/StockQuotesComparison/services";
import { getStockHistory } from "Services/routeCalls/routeCallsService";
import { formatDate } from "Helpers/dateFormatter";
import { StockGainDTO, StockGainsPayloadDTO } from "../DTOs";

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

    const previousPurchaseDate = formatDate(new Date(purchaseDate));

    const stockQuote = stockQuoteHistory[purchaseDate];
    const previousStockQuote = stockQuoteHistory[previousPurchaseDate];

    const closePrice = stockQuote["4. close"];
    const previousClose = previousStockQuote["4. close"];

    const changePercent = (previousClose - closePrice) / closePrice;
    // if change is negative, then the new price grown up
    const capitalGains = -(purchasedValue * changePercent);

    const gainPercent: StockGainDTO = {
      name: stockName,
      lastPrice: stockQuoteToday.lastPrice,
      priceAtDate: closePrice,
      purchasedAmount: purchasedValue,
      purchasedAt: purchaseDate,
      capitalGains,
    };

    return gainPercent;
  }
}
