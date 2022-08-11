import { stockApi } from "Services/config/api";
import { urls as apiUrls } from "@src/lib/urls";

export const getQuoteStock = async (stockName: string) => {
  return await stockApi.get(apiUrls.quotes.getQuoteStock(), {
    params: {
      symbol: stockName,
    },
  });
};

export const getStockHistory = async (stockName: string) => {
  return (
    await stockApi.get(apiUrls.intraday.getStockHistory(), {
      params: {
        symbol: stockName,
      },
    })
  ).data;
};
