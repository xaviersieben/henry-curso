import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  userAppointments: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Acción para establecer los datos del usuario
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    
    // Acción para agregar una cita del usuario
    addUserAppointment: (state, action) => {
      state.userAppointments.push(action.payload);
    },

    // Acción para eliminar una cita por ID
    removeUserAppointment: (state, action) => {
      state.userAppointments = state.userAppointments.filter(
        appointment => appointment.id !== action.payload
      );
    },

    // Acción para limpiar los datos del usuario (por ejemplo, en logout)
    clearUserData: (state) => {
      state.userData = {};
      state.userAppointments = [];
    },
  },
});

// Exportar las acciones
export const { setUserData, addUserAppointment, removeUserAppointment, clearUserData } = userSlice.actions;

// Exportar el reducer para integrarlo en el store de Redux
export default userSlice.reducer;

