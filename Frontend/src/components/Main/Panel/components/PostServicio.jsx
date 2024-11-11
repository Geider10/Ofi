// ServicioForm.js
import React from 'react';
import { useContext, useRef } from 'react';
import styles from '../panel.module.css'
import axios from 'axios';
import Context from "../../../../context/context.jsx";
import { ToastContainer } from "react-toastify";

const ServicioForm = () => {
    const { authToken, usuario, msgSuccess} = useContext(Context);
    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const formData = {
            usuarioId: usuario._id,
            titulo: form.get('titulo'),
            descripcion: form.get('descripcion'),
            imagen: form.get('imagen'),
            disponible: true,
            fecha: form.get('fecha'),
            hora: form.get('hora'),
            categoria: form.get('categoria')
            
        };

        try {
            const response = await axios.post('http://localhost:3000/servicios', formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                }
            );
            msgSuccess('Se creo un servicio con éxito')
            formRef.current.reset()            
        } catch (error) {
            console.error('Error al crear el servicio:', error);
        }
    };

    return (
            <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                <div className={styles.card_info}>
                    <div className={styles.img_servicio}>
                        <input type="text" name="imagen" placeholder='Imágen' required className={styles.input_img} />
                    </div>
                    <div className={styles.inputs_textContainer}>
                        <div className={styles.inputs_conjunto}>
                            <div className={styles.div_inputs}> 
                                <input type="text" name="titulo" placeholder='Título' required className={styles.inputs} />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text" name="fecha" placeholder='Fecha (DD/MM/AAAA)' required className={styles.inputs} />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text" name="hora" placeholder='Hora (HH:MM-HH:MM)' required className={styles.inputs} />
                            </div>

                        </div>
                        <div>
                            <input type="text" name="descripcion" placeholder='Descripción' required className={styles.inputs} />
                        </div>
                        <div>
                            <select name="categoria" className={styles.inputs}>
                                <option value='' disabled>Categoría</option>
                                <option value="Oficinas">Oficinas</option>
                                <option value="Salas">Salas</option>
                                <option value="Eventos">Eventos</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button type="submit" className={styles.btn}>Crear</button>
                </div>
                <ToastContainer/>
            </form>
    );
};

export default ServicioForm;
