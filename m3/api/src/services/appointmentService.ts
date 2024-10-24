import { appointmentModel, userModel } from "../config/data-source";
import Appointment from "../entities/Appointment";
import { AppointmentModel } from "../models/appointmentModel";

export const appointmentService = {
  async getAllAppointment(): Promise<Appointment[]> {
    try {
      return await appointmentModel.find({
        relations: ["user"],
        order: { date: "ASC" },
      });
    } catch (error) {
      console.error("appointment no find", error);
      throw new Error("appointment no find");
    }
  },

  async createAppointment({
    date,
    time,
    description,
    userId,
  }: AppointmentModel): Promise<Appointment | void> {
    try {
      const newAppointment = appointmentModel.create({
        date,
        time,
        description,
      });
      const user = await userModel.findOneBy({ id: userId });
      if (!user) throw new Error("User not find");
      newAppointment.user = user;

      return await appointmentModel.save(newAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw new Error("Appointment creation failed");
    }
  },
  async statusAppointment(id: number): Promise<Appointment | void> {
    const appointment = await appointmentModel.findOneBy({ id });

    try {
      if (appointment) {
        appointment.status = appointment.status === "active" ? "cancelled" : "active";

        return await appointmentModel.save(appointment);
      }
      throw new Error("Appointment update failed");
    } catch (error) {
      console.error("Error update appointment:", error);
      throw new Error("Appointment update failed");
    }
  },

  async getAppointmentDetails(
    appointmentId: number
  ): Promise<Appointment | null> {
    try {
      return await appointmentModel.findOne({
        where: { id: appointmentId },
        relations: ["user"],
      });
    } catch (error) {
      console.error(
        `Error fetching user with appointments for user ID: ${appointmentId}`,
        error
      );
      throw new Error("Failed to fetch user with appointments");
    }
  },
};
