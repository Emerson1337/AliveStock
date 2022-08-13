import { InvalidResponseDataException } from "Validators/DataException";
import { QuoteHistoryDTO } from "Modules/StockQuotesHistory/DTOs/QuoteHistoryDTO";
import { getStockHistory } from "Services/routeCalls/routeCallsService";

import { StockHistoryDTO } from "../DTOs";

export class ListQuoteHistoryService {
  public async listHistoryQuoteByCompany({
    stockName,
    dateFrom,
    dateTo,
  }: StockHistoryDTO): Promise<QuoteHistoryDTO> {
    const stockHistoryQuote = await getStockHistory(stockName);

    if (!stockHistoryQuote["Time Series (Daily)"]) {
      throw new InvalidResponseDataException(stockName);
    }

    const historyObject = await this.customizeObjectToReturn(
      stockHistoryQuote["Time Series (Daily)"],
      stockName,
      dateFrom,
      dateTo
    );

    return historyObject;
  }

  public async customizeObjectToReturn(
    historyByDate: any,
    stockName: string,
    fromDate: Date,
    toDate: Date
  ): Promise<QuoteHistoryDTO> {
    const keysDate = Object.keys(historyByDate);

    const historyData = Object.assign({
      name: stockName,
      prices: [],
    });

    for (const date of keysDate) {
      const dateObject = new Date(date);

      this.checkDateInterval(dateObject, fromDate, toDate) &&
        historyData.prices.push({
          opening: Number(historyByDate[date]["1. open"]),
          high: Number(historyByDate[date]["2. high"]),
          low: Number(historyByDate[date]["3. low"]),
          closing: Number(historyByDate[date]["4. close"]),
          pricedAt: date,
          volume: Number(historyByDate[date]["5. volume"]),
        });
    }

    return historyData;
  }

  public checkDateInterval(dateObject: Date, fromDate: Date, toDate: Date) {
    if (
      dateObject.getTime() >= fromDate.getTime() &&
      dateObject.getTime() <= toDate.getTime()
    )
      return true;
    else return false;
  }
}
