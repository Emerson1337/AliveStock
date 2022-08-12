import { StockQuotesGainController } from "Controllers/StockQuotesGainController";

import { routes as router } from "../routes";

const stockQuotesGainController = new StockQuotesGainController();

//QUOTE ROUTES
router.get(
  "/stocks/:stockName/gains",
  stockQuotesGainController.stockQuoteGains
);
