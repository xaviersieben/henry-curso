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
exports.loginUser = exports.registerUser = exports.getUserWithAppointments = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserWithAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }
    try {
        const user = yield userService_1.userService.getUserWithAppointments(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error(`Error fetching user with appointments for user ID: ${userId}`, error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserWithAppointments = getUserWithAppointments;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, email, birthday, nDni } = req.body;
    if (!username || !password || !name || !email || !birthday || !nDni) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const credential = yield credentialService_1.credentialService.createCredential(username, password);
        const newUser = yield userService_1.userService.createUser({
            name,
            email,
            birthday,
            nDni,
            credentialId: credential,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(400).json({ message: "Invalid data" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Missing username or password" });
        return;
    }
    try {
        const user = yield credentialService_1.credentialService.loginUser(username, password);
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
