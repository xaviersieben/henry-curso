import { Router } from "express";
import User from "./user.router";
import Product from "./product.router";
import Order from "./order.router";

const router = Router();

router.use("/user", User);
router.use("/product", Product);
router.use("/order", Order);

export default router;
