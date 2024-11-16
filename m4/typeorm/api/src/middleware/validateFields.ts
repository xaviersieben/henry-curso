import { Request, Response, NextFunction } from "express";

export const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      res
        .status(400)
        .json({ error: `Faltan los campos: ${missingFields.join(", ")}` });
      return;
    }

    next();
  };
};
