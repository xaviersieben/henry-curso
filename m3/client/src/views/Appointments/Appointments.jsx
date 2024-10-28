import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./Appointments.module.css";
// import { setUserData } from "../../redux/userSlice";

// Servicio centralizado para la API
const fetchUserAppointments = async (userId) => {
  const { data } = await axios.get(`http://localhost:3000/user/${userId}`);
  return data.appointments;
};

const cancelAppointment = async (appointmentId) => {
  await axios.put(`http://localhost:3000/appointments/${appointmentId}`);
};

const Appointments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const appointmentsData = await fetchUserAppointments(user.id);
        setAppointments(appointmentsData);
        // dispatch(setUserAppointments(appointmentsData));  // Actualiza Redux si es necesario
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Error al obtener los turnos");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [user, dispatch]);

  const handleCancelAppointment = useCallback(
    async (id) => {
      const confirmCancel = window.confirm("¿Está seguro que desea cancelar este turno?");
      if (!confirmCancel) return;
      
      try {
        await cancelAppointment(id);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
        alert("Turno cancelado exitosamente");
      } catch (err) {
        console.error("Error cancelling appointment:", err);
        alert("Error al cancelar el turno");
      }
    },
    []
  );

  if (isLoading) return <p>Cargando turnos...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles["appointment-list"]}>
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.id}
          {...appointment}
          onCancel={() => handleCancelAppointment(appointment.id)}
        />
      ))}
    </div>
  );
};

export default Appointments;
