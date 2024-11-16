import { Request, Response } from "express";
import { getAllProductsService } from "../services/productService";
import { cachedController } from "../utils/cachedController";

export const getAllProducts = cachedController(
  async (req: Request, res: Response): Promise<void> => {
    const products = await getAllProductsService();

    res.json(products);
  }
);
