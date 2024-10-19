import { AppDataSource } from './config/data-source';
import { PORT } from './config/envs';
import server from './server';

// Función asincrónica para inicializar la base de datos y el servidor
const startServer = async () => {
  try {
    // Inicializar conexión a la base de datos
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    // Registro estructurado del error
    console.error("❌ Failed to initialize the application:", error);

    // Forzar salida del proceso en caso de error crítico
    process.exit(1); // Código de salida 1 indica error
  }
};

// Ejecutar la función de inicio del servidor
startServer();

