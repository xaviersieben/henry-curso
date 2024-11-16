import { Request, Response } from "express";
import { cachedController } from "../utils/cachedController";
import { createOrderService } from "../services/orderService";

export const createOrder = cachedController(
  async (req: Request, res: Response): Promise<void> => {
    const { products, userId } = req.body;
    const newOrder = await createOrderService({ userId, products });
    res.status(201).send(newOrder);
  }
);
