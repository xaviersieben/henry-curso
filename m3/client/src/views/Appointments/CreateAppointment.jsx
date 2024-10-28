import { useState, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './CreateAppointmentForm.module.css';

const CreateAppointmentForm = ({ user }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        serviceId: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData({
            date: '',
            time: '',
            serviceId: '',
            description: '',
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await axios.post(`http://localhost:3000/appointments`, {
                ...formData,
                userId: user.id,
            });
            alert("Cita creada correctamente");
            resetForm();
        } catch (err) {
            console.error('Error creando cita:', err);
            setError('No se pudo crear la cita. Intente nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles['form-container']} aria-live="assertive">
            <div>
                <label htmlFor="date">Fecha:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="time">Hora:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="serviceId">Servicio:</label>
                <select
                    id="serviceId"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un Servicio</option>
                    <option value="1">Limpieza</option>
                    <option value="2">Blanqueamiento</option>
                    <option value="3">Exámenes</option>
                    <option value="4">Restauración</option>
                </select>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Agrega una descripción (opcional)"
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creando..." : "Crear Turno"}
                </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
};

CreateAppointmentForm.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
};

export default CreateAppointmentForm;
