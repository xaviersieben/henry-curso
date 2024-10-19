"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa los módulos necesarios
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import usersRouter from './routes/users';
// import appointmentsRouter from './routes/appointments';
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Cargar configuración del entorno
dotenv_1.default.config();
// Crear instancia del servidor
const server = (0, express_1.default)();
// Configurar CORS de forma segura
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Utilizar variables de entorno
    optionsSuccessStatus: 200,
    credentials: true, // Permitir credenciales si es necesario
};
// Middleware
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
server.use((0, morgan_1.default)("combined")); // Registrar las solicitudes (útil para debugging y producción)
// Rutas
// server.use('/users', usersRouter);
// server.use('/appointments', appointmentsRouter);
// Manejo de rutas inexistentes
server.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
});
// Middleware de manejo de errores centralizado
server.use(errorHandler_1.errorHandler);
// Exportar servidor para su uso en index.ts
exports.default = server;
