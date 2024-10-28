"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
const loadTestAppointment_1 = require("./utils/loadTestAppointment");
const loadTestUser_1 = require("./utils/loadTestUser");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Inicializar conexión a la base de datos
        yield data_source_1.AppDataSource.initialize();
        console.log("✅ Database connected successfully");
        yield (0, loadTestUser_1.loadTestUsers)();
        yield (0, loadTestAppointment_1.loadTestAppointment)();
        // Iniciar el servidor
        server_1.default.listen(envs_1.PORT, () => {
            console.log(`🚀 Server running on port ${envs_1.PORT}`);
        });
    }
    catch (error) {
        // Registro estructurado del error
        console.error("❌ Failed to initialize the database:", error);
        // Intentar reconectar a la base de datos después de un tiempo
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("🔄 Retrying database connection...");
            yield startServer(); // Reintento
        }), 5000); // Espera de 5 segundos antes de reintentar
    }
});
// Ejecutar la función de inicio del servidor
startServer();
