import { CredentialRepository } from "../config/data-source";
import Credential from "../entities/Credential";
import bcrypt from "bcrypt";

export const createCredentialService = async (
  password: string
): Promise<Credential> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const credential = CredentialRepository.create({ password: hashedPassword });
  return await CredentialRepository.save(credential);
};

export const checkPasswordService = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
