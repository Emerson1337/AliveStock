import { ComparisonQuoteController } from "Controllers/StockComparisonQuoteController";

import { routes as router } from "../routes";

const comparisonQuoteController = new ComparisonQuoteController();

//QUOTE ROUTES
router.get(
  "/stocks/:stockName/compare",
  comparisonQuoteController.compareStocksQuotes
);
