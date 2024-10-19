import { Router } from "express";

const router = Router();

router.get("/", (req,res,) => {res.json({ message: "anda todo bien" })});

export default router;