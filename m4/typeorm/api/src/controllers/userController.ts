import { Request, Response } from "express";
import { cachedController } from "../utils/cachedController";
import {
  loginUserService,
  registerUserService,
} from "../services/userServices";
import { validateFields } from "../middleware/validateFields";

export const registerUser = [
  validateFields(["email", "password", "name", "address", "phone"]),
  cachedController(async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, address, phone } = req.body;

    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });
    res.status(201).send(newUser);
    return;
  }),
];

export const loginUser = [
  validateFields(["email", "password"]),
  cachedController(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await loginUserService({ email, password });
    res.send({
      login: true,
      user: user.user,
      token: user.token,
    });
  }),
];
