import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import {orderRouter} from "./routes/orderRouter";
import {productRouter} from "./routes/productRouter";
import {customerRouter} from "./routes/customerRouter";


dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port);