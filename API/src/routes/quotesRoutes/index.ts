import { QuoteController } from "../../controllers/QuoteController";

import { routes as router } from "../routes";

const quoteController = new QuoteController();

//QUOTE ROUTES
router.get("/quotes/:companyName", quoteController.listQuoteByCompany);
