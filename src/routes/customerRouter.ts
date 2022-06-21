import express, {Request, Response} from "express";
import * as customerModel from "../models/customer";
import {Customer, BasicCustomer} from "../types/customer";
const customerRouter = express.Router();

customerRouter.get("/", async (req: Request, res: Response) => {
  customerModel.findAll((err: Error, cutomers: Customer[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": cutomers});
  });
});

customerRouter.post("/", async (req: Request, res: Response) => {
  const newOrder: Customer = req.body;
  
  customerModel.create(newOrder, (err: Error, customerId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"orderId": customerId});
  });
});

customerRouter.get("/:id", async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.id);
    customerModel.findOne(customerId, (err: Error, customer: Customer) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
      res.status(200).json({"data": customer});
    })
});

customerRouter.put("/:id", async (req: Request, res: Response) => {
  const customer: Customer = req.body;
  customerModel.update(customer, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

customerRouter.delete("/:id", async (req: Request, res: Response) => {
  const customerId: number = Number(req.params.id);
  customerModel.drop(customerId, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

export {customerRouter};
