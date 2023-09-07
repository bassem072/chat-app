import express from "express";
import mongoose from "mongoose";
import "./app/config/dotenv.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import dbConfig from "./db.js";
import authRoutes from "./app/routes/auth.routes.js";
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookieParser());

authRoutes(app);

dbConfig(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
