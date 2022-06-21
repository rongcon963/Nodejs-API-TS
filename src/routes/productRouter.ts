import express, {Request, Response} from "express";
import * as productModel from "../models/product";
import {Product, BasicProduct} from "../types/product";
const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
  productModel.findAll((err: Error, orders: Product[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": orders});
  });
});

productRouter.post("/", async (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  
  productModel.create(newProduct, (err: Error, productId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"orderId": productId});
  });
});

productRouter.get("/:id", async (req: Request, res: Response) => {
    const productId: number = Number(req.params.id);
    productModel.findOne(productId, (err: Error, order: Product) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
      res.status(200).json({"data": order});
    })
});

productRouter.put("/:id", async (req: Request, res: Response) => {
  const product: Product = req.body;
  productModel.update(product, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

productRouter.delete("/:id", async (req: Request, res: Response) => {
  const productId: number = Number(req.params.id);
  productModel.drop(productId, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

export {productRouter};
