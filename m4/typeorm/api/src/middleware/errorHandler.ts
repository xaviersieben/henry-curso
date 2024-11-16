import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err); // Si ya se han enviado cabeceras, llama a next
  }
  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
