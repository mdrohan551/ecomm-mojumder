// app.js
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// যদি .env use করো
import dotenv from "dotenv";
dotenv.config();

// Config import
import { DBURL } from "./src/config/Config.js";
import router from "./src/router/router.js";

const app = express();

// increase payload limit
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// MongoDB connection
const URL = `${DBURL}`;
const options = {
  autoIndex: true,
  serverSelectionTimeoutMS: 30000, // ৩০ সেকেন্ড যথেষ্ট
};

mongoose.connect(URL, options)
  .then(() => console.log("DB connection Success"))
  .catch((err) => console.log("DB connection Fail: " + err));

// Middleware
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 80000 });
app.use(limiter);


app.use(express.json());
app.use("/api/v1", router)
// Static folder
app.use(express.static('client/dist'));

// Export ESM style
export default app;
