import styles from './Ingresar.module.css';
import Iniciar_sesion from "./Iniciar_sesion.jsx";
import Registro from "./Registro.jsx";
import { useContext, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import Context from '../../context/context.jsx';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

function Ingresar() {
  const { handleRegistro, handleLogin, login, loginRef } = useContext(Context);

  const handleGoogleLogin = async () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  }
  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.classList.add("active");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <div className={styles.container_inputs}>
          <div className={styles.container_titles}>
            <h3 onClick={handleLogin} className={`navlink ${styles.h3}`} ref={loginRef}>Iniciar sesión</h3>
            <h3 onClick={handleRegistro} className={`navlink ${styles.h3}`}>Crear cuenta</h3>
          </div>

          <div className={styles.container_buttons}>
            <button onClick={handleGoogleLogin} className={styles.btn_services}><FcGoogle />Continuar con Google</button>
            {/* <button onClick={handleFacebookLogin} className={styles.btn_services}><SiFacebook />Continuar con Facebook</button> */}
            {/* <button className={styles.btn_services}><FaApple />Continuar con Apple</button> */}
          </div>

          {login ? <Iniciar_sesion /> : <Registro />}
        </div>

        <div className={styles.content_img}>
          <img src="img-register.webp" alt="equipo desarrollando" className={styles.img} />
        </div>

      </div>
    </div>
  )
}
export default Ingresar;
