const API_TOKEN = process.env.API_TOKEN;

export const urls = {
  quotes: {
    getQuoteStock: (): string =>
      `/query?apikey=${API_TOKEN}&function=GLOBAL_QUOTE`,
  },
  intraday: {
    getStockHistory: (): string =>
      `/query?apikey=${API_TOKEN}&function=TIME_SERIES_DAILY&outputsize=full`,
  },
};
