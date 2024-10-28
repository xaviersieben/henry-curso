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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTestUsers = void 0;
const userController_1 = require("../controllers/userController");
const loadTestUsers = () => __awaiter(void 0, void 0, void 0, function* () {
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
            };
            // Crear el response simulado
            const res = {
                status: (statusCode) => ({
                    json: (data) => {
                        console.log(`Usuario de prueba cargado con éxito: ${JSON.stringify(data)}`);
                    },
                }),
            };
            // Llamar al controlador de registro
            yield (0, userController_1.registerUser)(req, res);
        }
        catch (error) {
            console.error("Error cargando usuario de prueba:", error);
        }
    }
});
exports.loadTestUsers = loadTestUsers;
