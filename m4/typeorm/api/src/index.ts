import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/env";
import { preLoadCategories } from "./helpers/preLoadCategory";
import { preLoadProducts } from "./helpers/preLoadProduct";
import server from "./server";

const startServer = async () => {
  try {
    //Inicializo base de datos
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    await preLoadCategories();
    await preLoadProducts();
    //Inicializo servidor
    server.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to initialize the database:", error);
  }
};

startServer();
