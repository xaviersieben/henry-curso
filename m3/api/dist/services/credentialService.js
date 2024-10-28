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
exports.credentialService = void 0;
const data_source_1 = require("../config/data-source");
exports.credentialService = {
    createCredential: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCredential = data_source_1.credentialModel.create({ username, password });
            return yield data_source_1.credentialModel.save(newCredential);
        }
        catch (error) {
            console.error("Error creating credential:", error);
            throw new Error("Credential creation failed");
        }
    }),
    loginUser: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credential = yield data_source_1.credentialModel.findOne({ where: { username } });
            if (!credential || credential.password !== password) {
                throw new Error("User or password incorrect");
            }
            const user = yield data_source_1.userModel.findOne({
                where: { credentialId: credential },
            });
            if (!user) {
                throw "User or password incorrect";
            }
            return user;
        }
        catch (error) {
            console.error("Error login user:", error);
            throw new Error("Error login user");
        }
    }),
};
