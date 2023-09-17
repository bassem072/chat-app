import express from "express";
import "./app/config/dotenv.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dbConfig from "./db.js";
import authRoutes from "./app/routes/auth.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

authRoutes(app);

dbConfig(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
