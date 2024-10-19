"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
// import User from "../entities/User"
// import Credential from "../entities/Credential"
// import Appointment from "../entities/Appointment"
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST || "localhost",
    port: Number(envs_1.DB_PORT) || 5432,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASS,
    database: envs_1.DB_NAME,
    synchronize: true,
    // dropSchema: true,
    logging: ["error"],
    entities: [],
    subscribers: [],
    migrations: [],
});
// export const userModel = AppDataSource.getRepository(User)
// export const credentialModel = AppDataSource.getRepository(Credential)
// export const appointmentModel = AppDataSource.getRepository(Appointment)
