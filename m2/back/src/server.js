// Importaciones usando ES Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRouter from "./routes/movieRouter.js";
import directorRouter from "./routes/directorRouter.js";

// Configuración de dotenv para cargar variables de entorno
dotenv.config();

// Validación de variables de entorno críticas
const { PORT, MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("La variable MONGODB_URI es obligatoria.");
}

// Inicialización de la aplicación Express
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Definición de rutas
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "¡Hola desde el servidor modernizado!" });
// });

app.use("/movies", movieRouter);
app.use("/director", directorRouter);

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB Atlas:", error);
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
  }
}

// Función para iniciar el servidor
function startServer() {
  app.listen(PORT || 3000, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT || 3000}`);
  });
}

// Inicialización de la aplicación
async function initializeApp() {
  await connectToDatabase();
  startServer();
}

// Manejo de errores globales (opcional)
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

// Ejecución de la inicialización
initializeApp().catch((error) => {
  console.error("Error al inicializar la aplicación:", error);
});
