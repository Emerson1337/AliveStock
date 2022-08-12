import { QuoteController } from "Controllers/StockQuoteController";

import { routes as router } from "../routes";

const quoteController = new QuoteController();

//QUOTE ROUTES
router.get("/stock/:stockName/quote", quoteController.listQuoteByCompany);
