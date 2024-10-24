import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";
import { loadTestAppointment } from "./utils/loadTestAppointment";
import { loadTestUsers } from "./utils/loadTestUser";

const startServer = async () => {
  try {
    // Inicializar conexión a la base de datos
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    await loadTestUsers()
    await loadTestAppointment()

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    // Registro estructurado del error
    console.error("❌ Failed to initialize the database:", error);

    // Intentar reconectar a la base de datos después de un tiempo
    setTimeout(async () => {
      console.log("🔄 Retrying database connection...");
      await startServer(); // Reintento
    }, 5000); // Espera de 5 segundos antes de reintentar
  }
};

// Ejecutar la función de inicio del servidor
startServer();
