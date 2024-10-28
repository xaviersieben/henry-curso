import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja los cambios en los campos del formulario
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );
      dispatch(setUserData(response.data));
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginCard}>
      <h2>Iniciar Sesión</h2>
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
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
      <p>
        ¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
};

export default Login;
