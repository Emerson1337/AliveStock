export class StockAmountException extends Error {
  constructor() {
    super(`Purchase Stock amount greater then Stock sold in the day.`);
  }
}

export class StockQuoteNotFound extends Error {
  constructor(stockName: string) {
    super(`${stockName} quote not found!`);
  }
}
