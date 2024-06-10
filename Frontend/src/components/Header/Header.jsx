import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import Context from "../../context/context"
import OptionsUser from "./OptionsUser";

const Header = () => {
  const { loggedIn, setLoggedIn, navigate } = useContext(Context);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    navigate('/login');
    setLoggedIn(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_menu}>
        <Link to="/">
          <img className={styles.logo} src="/Logotipo.png" alt="logo" />
        </Link>
        <ul className={styles.container_ul}>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink)}
            to="/"
          >
            Inicio
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink)}
            to="/servicios"
          >
            Servicios
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink)}
            to="/galeria"
          >
            Galería
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink)}
            to="/contacto"
          >
            Contacto
          </NavLink>
        </ul>

        {loggedIn ? (
          <OptionsUser handleLogout={handleLogout} />
        ) : (
          <Link to="/ingresar">
            <button className={styles.btn}>Ingresar</button>
          </Link>
        )}

      </div>
    </div>
  );
};

export default Header;
