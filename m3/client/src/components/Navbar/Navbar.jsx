import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.jpeg";

function Navbar() {
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  const logout = () => dispatch(setUserData({}));

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className={styles.linksSection}>
        {user && user.id ? (
          <>
            <NavLink to="/appointments">Turnos</NavLink>

            <NavLink to="/create-appointment">Crear Turno</NavLink>
          </>
        ) : null}

        <NavLink to="/about">Acerca de</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
      </div>

      <div className={styles.authLinks}>
        {user.id ? (
          <NavLink to="/" onClick={logout}>
            Cerrar sesión
          </NavLink>
        ) : (
          <NavLink to="/login">Iniciar sesión</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
