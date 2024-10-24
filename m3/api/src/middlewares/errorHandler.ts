import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err); // Si ya se han enviado cabeceras, llama a next
  }
  res.status(500).json({ message: "Internal server error" });
};
