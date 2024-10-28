import { format } from "date-fns";
import styles from "./Appointment.module.css";
import PropTypes from "prop-types";

import { useState, useMemo } from "react";

const Appointment = ({
  id,
  date,
  time,
  status,
  description,
  user,
  onUpdateStatus,
}) => {
  const formattedDate = useMemo(
    () => format(new Date(date), "MMMM dd, yyyy"),
    [date]
  );
  const [appointmentStatus, setAppointmentStatus] = useState(status);

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "¿Está seguro que desea cancelar este turno?"
    );
    if (confirmCancel) {
      onUpdateStatus(id, "cancelled");
      setAppointmentStatus("cancelled");
    }
  };

  const isCancelled = appointmentStatus === "cancelled";
  const buttonLabel = isCancelled ? "Cancelado" : "Activo";
  const buttonClass = isCancelled
    ? styles.cancelledButton
    : styles.activeButton;

  return (
    <div className={styles.appointmentCard}>
      <h2>Turno {id}</h2>
      <p>Día: {formattedDate}</p>
      <p>Hora: {time}</p>
      <p>Descripción: {description}</p>
      {user && <p>Usuario: {user.name}</p>}
      <button
        className={buttonClass}
        onClick={handleCancel}
        disabled={isCancelled}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

Appointment.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onUpdateStatus: PropTypes.func.isRequired,
};

Appointment.defaultProps = {
  onUpdateStatus: () => {},
};
export default Appointment;
