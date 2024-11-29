import styles from "./panel.module.css";
import { useContext,useEffect, useState } from "react";
import Context from "../../../context/context.jsx";
import CardReserva from "./components/cardReserva.jsx";
import { parse, isAfter, isBefore} from "date-fns";

const UsuarioPanel = () => {
const { usuario, servicios } = useContext(Context);
const [filtro, setFiltro] = useState('activas');
const [reservas, setReservas] = useState(usuario.listaReservas);
const [reservasFiltradas, setReservasFiltradas] = useState([]); // Para almacenar las reservas filtradas


const aplicarFiltro = (nuevoFiltro) => {
  const hoy = new Date();

  const reservasFiltradas = reservas.filter((reserva) => {
    if (!reserva.fecha) {
      console.log(`La reserva con ID ${reserva.id || "desconocido"} no tiene fecha.`);
      return false;
    }

    // Parsear la fecha al formato correcto y aplicar filtro
    const fechaReserva = parse(reserva.fecha.trim(), "dd/MM/yyyy", new Date());
    if (nuevoFiltro === "activas") {
      return isAfter(fechaReserva, hoy); // Fecha futura
    } else if (nuevoFiltro === "finalizadas") {
      return isBefore(fechaReserva, hoy); // Fecha pasada
    }

    return true;
  });
  setReservasFiltradas(reservasFiltradas);
};

  useEffect(() => {
    if (reservas && servicios) {
      const data = reservas.map((reserva) => {
        // Buscar el servicio correspondiente a la reserva
        const servicio = servicios.find(s => s.servicioID.toString() == reserva.servicioID.toString());
        console.log(servicio);
        return servicio // Añadir el servicio a data
      })
      setReservas(data);
      aplicarFiltro(filtro);
    } else {
      console.warn("Reservas o servicios no disponibles");
    }
  }, []);
  
  return (
    <div className={styles.container_user_panel}>
      <div className={styles.container_reservas}>
        <h2 className={styles.title}>Reservas</h2>
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value); 
            aplicarFiltro(e.target.value); 
          }}
          className={styles.select}
        >
          <option value="activas">Activas</option>
          <option value="finalizadas">Finalizadas</option>
        </select>

        { reservasFiltradas.length > 0 ? reservasFiltradas.map((reserva, index) => {
          return (
            <CardReserva
              key={index}
              id={reserva.reservaId}
              imagen={reserva.imagen}
              titulo={reserva.titulo}
              fecha={reserva.fecha}
              hora={reserva.hora}
              categoria={reserva.categoria}
            />
          );
        }) 
      : <p> No hay reservas</p>}
      </div>
    </div>
  );

}
export default UsuarioPanel;
