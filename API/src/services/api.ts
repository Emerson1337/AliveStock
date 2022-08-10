import axios from "axios";

const STOCK_API_URL = process.env.STOCK_API_URL;

export const stockApi = axios.create({
  baseURL: STOCK_API_URL,
});
