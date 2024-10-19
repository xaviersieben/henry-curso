// Importa los módulos necesarios
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import routes from './routes/index'

// Cargar configuración del entorno
dotenv.config();

// Crear instancia del servidor
const server: Application = express();

// Configurar CORS de forma segura
const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Utilizar variables de entorno
  optionsSuccessStatus: 200,
  credentials: true, // Permitir credenciales si es necesario
};

// Middleware
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("combined")); // Registrar las solicitudes (útil para debugging y producción)

// Rutas
server.use('/',routes)

// Manejo de rutas inexistentes
server.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Middleware de manejo de errores centralizado
server.use(errorHandler);

// Exportar servidor para su uso en index.ts
export default server;
