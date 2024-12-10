import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import { Application } from "express";
import morgan from "morgan";
import routes from "./routes";
import notFoundMiddleware from "./middleware/notFoundMiddleware";
import errorHandler from "./middleware/errorHandler";

// Cargar configuración del entorno
dotenv.config();

// Crear instancia del servidor
const server: Application = express();

// Configurar CORS de forma segura
const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

//Middleware
server.use(cors(corsOptions));
server.use(morgan("combined"));
server.use(express.json());

//Rutas

server.use("/", routes);

// Manejo de rutas inexistentes
server.use(notFoundMiddleware);

// Middleware de manejo de errores centralizado
server.use(errorHandler);

export default server;
