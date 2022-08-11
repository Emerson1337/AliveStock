import { QuoteHistoryController } from "Controllers/QuoteHistoryController";

import { routes as router } from "../routes";

const quoteHistoryController = new QuoteHistoryController();

//QUOTE ROUTES
router.get(
  "/stocks/:stockName/history",
  quoteHistoryController.quoteHistoryByCompany
);
