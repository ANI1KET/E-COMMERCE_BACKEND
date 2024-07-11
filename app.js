import express, { json, urlencoded } from 'express';
const app = express();
import cors from 'cors';

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from 'dotenv';

import bodyparserpkg from 'body-parser';
const { urlencoded: _urlencoded } = bodyparserpkg;

import errorMiddleware from "./middleware/error.js";

config({ path: "config/config.env" });

app.use(json({ limit: '5mb' }));
app.use(urlencoded({ limit: '5mb', extended: true }));

app.use(json());
app.use(cookieParser());
app.use(_urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({
    origin: true,
    credentials: true,
}));

import product from './routes/productRoute.js';
import user from './routes/userRoute.js';
import order from './routes/orderRoute.js';
import payment from "./routes/paymentRoute.js";

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddleware);

export default app;
