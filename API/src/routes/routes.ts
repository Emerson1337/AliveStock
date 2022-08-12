import { Router } from "express";

const routes = Router();

import "./StockQuotesRoutes";
import "./StockQuotesHistoryRoutes";
import "./StockQuotesComparisonRoutes";
import "./StockQuotesGainRoutes";

export { routes };
