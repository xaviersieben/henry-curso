import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

// Servicio centralizado para llamadas a la API de autenticación
const registerUser = async (formData) => {
  const response = await axios.post(
    `http://localhost:3000/register/register`,
    formData
  );
  return response.data;
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja los cambios en los campos de entrada
  const handleChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      navigate("/login", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al registrar usuario";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerCard}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
