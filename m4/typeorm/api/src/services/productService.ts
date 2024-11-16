import { ProductRepository } from "../config/data-source";
import Product from "../entities/product";

export const getAllProductsService = async (): Promise<Product[]> => {
  const products = await ProductRepository.find();
  return products;
};
