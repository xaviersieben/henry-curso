import { Request, Response } from "express";
import { userService } from "../services/userService";
import { credentialService } from "../services/credentialService";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserWithAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const user = await userService.getUserWithAppointments(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(
      `Error fetching user with appointments for user ID: ${userId}`,
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password, name, email, birthday, nDni } = req.body;

  if (!username || !password || !name || !email || !birthday || !nDni) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const credential = await credentialService.createCredential(
      username,
      password
    );
    const newUser = await userService.createUser({
      name,
      email,
      birthday,
      nDni,
      credentialId: credential,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: "Invalid data" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Missing username or password" });
    return;
  }

  try {
    const user = await credentialService.loginUser(username, password);

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
