import { Router } from "express";
import checkLogin from "../middleware/checkLogin";
import { createOrder } from "../controllers/orderController";

const router = Router();

router.post("/", checkLogin, createOrder);

export default router;
