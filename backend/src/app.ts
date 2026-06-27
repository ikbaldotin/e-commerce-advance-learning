import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config/env.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import registerRouter from "./modules/auth/auth.route.js";
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use("/api/v1/auth", registerRouter);
app.use(globalErrorHandler);
