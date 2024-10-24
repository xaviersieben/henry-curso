import { credentialModel, userModel } from "../config/data-source";
import User from "../entities/User";
import { Credential } from "../models/credentialModel";

export const credentialService = {
  createCredential: async (
    username: string,
    password: string
  ): Promise<Credential> => {
    try {
      const newCredential = credentialModel.create({ username, password });
      return await credentialModel.save(newCredential);
    } catch (error) {
      console.error("Error creating credential:", error);
      throw new Error("Credential creation failed");
    }
  },

  loginUser: async (
    username: string,
    password: string
  ): Promise<User | void> => {
    try {
      const credential = await credentialModel.findOne({ where: { username } });

      if (!credential || credential.password !== password) {
        throw new Error("User or password incorrect");
      }
      const user = await userModel.findOne({
        where: { credentialId: credential },
      });
      if (!user) {
        throw "User or password incorrect";
      }
      return user;
    } catch (error) {
      console.error("Error login user:", error);
      throw new Error("Error login user");
    }
  },
};
