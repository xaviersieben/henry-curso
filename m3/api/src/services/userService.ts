import { createUserDto } from '../DTO/createUserDto';
import { userModel } from '../config/data-source';
import User from '../entities/User';

export const userService = {
  async createUser({ name, email, birthday, nDni, credentialId }: createUserDto): Promise<User> {
    try {
      const newUser = userModel.create({ name, email,birthday, nDni, credentialId });
      return await userModel.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      return await userModel.find();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  async getUserWithAppointments(userId: number): Promise<User | null> {
    try {
      return await userModel.findOne({
        where: { id: userId },
        relations: ['appointments'],
      });
    } catch (error) {
      console.error(`Error fetching user with appointments for user ID: ${userId}`, error);
      throw new Error('Failed to fetch user with appointments');
    }
  }
};
