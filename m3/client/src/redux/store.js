import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Importa solo el reducer

// Configuración del store con Redux Toolkit
const store = configureStore({
  reducer: {
    user: userReducer, // Posibilidad de agregar más slices en el futuro
  },
});

export default store;
