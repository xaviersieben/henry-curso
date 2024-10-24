import { Request, Response } from "express";
import { registerUser } from "../controllers/userController";

export const loadTestUsers = async () => {
  const testUsers = [
    {
      username: "testuser1",
      password: "password123",
      name: "Test User 1",
      email: "testuser1@example.com",
      birthday: "1990-01-01",
      nDni: "12345678A",
    },
    {
      username: "testuser2",
      password: "password123",
      name: "Test User 2",
      email: "testuser2@example.com",
      birthday: "1991-02-02",
      nDni: "12345678B",
    },
    {
      username: "testuser3",
      password: "password123",
      name: "Test User 3",
      email: "testuser3@example.com",
      birthday: "1992-03-03",
      nDni: "12345678C",
    },
    {
      username: "testuser4",
      password: "password123",
      name: "Test User 4",
      email: "testuser4@example.com",
      birthday: "1993-04-04",
      nDni: "12345678D",
    },
    {
      username: "testuser5",
      password: "password123",
      name: "Test User 5",
      email: "testuser5@example.com",
      birthday: "1994-05-05",
      nDni: "12345678E",
    },
  ];

  for (const user of testUsers) {
    try {
      // Crear el request simulado
      const req = {
        body: user,
      } as Request;

      // Crear el response simulado
      const res = {
        status: (statusCode: number) => ({
          json: (data: any) => {
            console.log(
              `Usuario de prueba cargado con éxito: ${JSON.stringify(data)}`
            );
          },
        }),
      } as unknown as Response;

      // Llamar al controlador de registro
      await registerUser(req, res);
    } catch (error) {
      console.error("Error cargando usuario de prueba:", error);
    }
  }
};
