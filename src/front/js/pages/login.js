import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { loginUser } from "../component/actions"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [dataForm, setDataForm] = useState({
        email: '',     // Inicialmente vacío 
        password: '',  // Inicialmente vacío
    });
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value }); // Actualiza el estado con el nuevo valor
    };

    const handleClick = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Comienza a cargar antes de realizar cualquier acción
    
        try {
            // Supongamos que `dataForm` contiene los datos del formulario, como email y password
            const result = await loginUser(dataForm);
    
            if (result.user && typeof result.user.is_teacher !== 'undefined') {
                // Guarda el token en el almacenamiento local
                localStorage.setItem('token', result.data.token);
    
                // Determina el rol del usuario y navega a la página correspondiente
                const userRole = result.user.is_teacher;
                console.log("userRole:", userRole); // Muestra el rol en la consola para depuración
    
                if (userRole) {
                    navigate('/dashboard-profesor'); // Redirige al panel del profesor
                } else {
                    navigate('/dashboard-alumno'); // Redirige al panel del alumno
                }
            } else {
                // Maneja el caso en que el inicio de sesión no fue exitoso
                setMessage('Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            // Maneja errores que puedan ocurrir durante el proceso de inicio de sesión
            console.error('Error en handleSubmit:', error);
            setMessage('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
        } finally {
            setLoading(false); // Asegúrate de que el estado de carga se restablezca
        }
    };
    
   
    return (
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioLogin" onSubmit={handleSubmit}>
                <h4 className="mt-2 mb-4">Inicia sesión</h4>
                <label>Email
                    <input
                        className="form-control"
                        name="email"
                        value={dataForm.email}
                        placeholder="Introduce tu email aquí"
                        onChange={handleChange}
                        type="email"
                        required
                    />
                </label>
                <label>Password
                    <div className="contenedor-password">
                        <input
                            className="form-control"
                            name="password"
                            value={dataForm.password}
                            placeholder=""
                            onChange={handleChange}
                            type={visible ? "text" : "password"}
                            required
                        />
                        {visible ? 
                            <span className="fa-solid fa-eye-slash icon" onClick={handleClick}></span> 
                            : 
                            <span className="fa-solid fa-eye icon" onClick={handleClick}></span>
                        }
                    </div>
                </label>
                <input
                    className="btn btn-primary mt-3"
                    value="Iniciar sesión"
                    type="submit"
                    disabled={loading}
                />
                <p>{message}</p>
            </form>
        </div>
    );
};
