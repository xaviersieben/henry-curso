import { UserRepository } from "../config/data-source";
import RegisterUserDto from "../dtos/registerUsers.dto";
import LoginUserDto from "../dtos/loginUser.dto";
import User from "../entities/User";
import {
  checkPasswordService,
  createCredentialService,
} from "./credentialService";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<User> => {
  const user = UserRepository.create(registerUserDto);
  const { password } = registerUserDto;
  const credential = await createCredentialService(password);
  user.credential = credential;
  return await UserRepository.save(user);
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: User }> => {
  const { email, password } = loginUserDto;
  const user = await UserRepository.findOne({
    where: {
      email,
    },
    relations: ["credential", "orders"],
  });
  if (!user) throw new Error("Usuario no encontrado");
  const isPasswordValid = await checkPasswordService(
    password,
    user.credential.password
  );
  if (!isPasswordValid) throw new Error("Contraseña incorrecta");

  // Genera el token JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return { user, token };
};
