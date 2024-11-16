import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Usuario no encontrado");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
  } catch (error) {
    throw new Error("token invalido");
  }
  console.log("Token Check OK");

  next();
};

export default checkLogin;
