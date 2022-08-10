import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export { app };
