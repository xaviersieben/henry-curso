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
exports.userService = void 0;
const data_source_1 = require("../config/data-source");
exports.userService = {
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, birthday, nDni, credentialId }) {
            try {
                const newUser = data_source_1.userModel.create({ name, email, birthday, nDni, credentialId });
                return yield data_source_1.userModel.save(newUser);
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('User creation failed');
            }
        });
    },
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.userModel.find();
            }
            catch (error) {
                console.error('Error fetching all users:', error);
                throw new Error('Failed to fetch users');
            }
        });
    },
    getUserWithAppointments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.userModel.findOne({
                    where: { id: userId },
                    relations: ['appointments'],
                });
            }
            catch (error) {
                console.error(`Error fetching user with appointments for user ID: ${userId}`, error);
                throw new Error('Failed to fetch user with appointments');
            }
        });
    }
};
