import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./env";
import Credential from "../entities/Credential";
import Category from "../entities/Category";
import Order from "../entities/Order";
import Product from "../entities/product";
import User from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  password: DB_PASS,
  username: DB_USER,
  database: DB_NAME,
  port: Number(DB_PORT),
  synchronize: true,
  dropSchema: true,
  logging: ["error"],
  entities: [Category, Credential, Order, Product, User],
  subscribers: [],
  migrations: [],
});

export const CategoryRepository = AppDataSource.getRepository(Category);
export const CredentialRepository = AppDataSource.getRepository(Credential);
export const OrderRepository = AppDataSource.getRepository(Order);
export const ProductRepository = AppDataSource.getRepository(Product);
export const UserRepository = AppDataSource.getRepository(User);
