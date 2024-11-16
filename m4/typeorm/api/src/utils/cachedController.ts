import { Request, Response, NextFunction } from "express";

export const cachedController = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error("Error en cachedController:", error);
      res.status(500).json({
        error: "Ocurrió un error en el servidor.",
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };
};
