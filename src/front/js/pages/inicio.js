
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgInicio from "../../img/inicio.png"
import InfoCard from "../component/infoCard.jsx"
import ProfDestacados from "../component/profDestacados.jsx";
import { Link } from "react-router-dom";

export const Inicio = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <section className="p-0 m-0">
        <div className="container-fluid p-0">
          <div className="position-relative vh-100 w-100">
            <img
              src="https://livehealthymag.com/wp-content/uploads/2019/11/therapy-in-dubai-1200x800.jpg"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover' }}
              alt="..."
            />
            <div className="position-absolute  col-8 text-start text-light text-presentacion bg-opacity-50 p-3 rounded"
              style={{ top: '50%', left: '40%', transform: 'translate(-50%, -50%)' }}>
              <h1 className="mb-4">Bienvenido a HablemosUY</h1>
              <h5>
                HablemosUY es una plataforma de asistencia psicológica remota que conecta a psicólogos con usuarios que buscan apoyo y orientación profesional desde la comodidad de su hogar. Los psicólogos pueden registrarse para ofrecer sus servicios y sesiones, mientras que los usuarios tienen acceso a una gran variedad de especialistas para poder agendar sesiones de terapia según sus necesidades. Nuestro objetivo es facilitar el acceso a la salud mental, proporcionando un entorno seguro y accesible para todos.
              </h5>
             {store.logged == false &&

             
              <Link to="/vista-register">
                <button type="button" className="btn btn-outline-light ms-4 me-5">
                  Registrate Gratis
                </button>
              </Link>
              }
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 d-flex flex-column align-items-center">
        <div className="my-auto">
          <h2 className="text-inicio my-5 text-center">¿Cómo funciona?</h2>
          <div className="row justify-content-center text-center">
              
            <InfoCard title={<Link to={store.logged == false && "/vista-register" } className="text-dark fs-3 text-decoration-none">Regístrate</Link>}
              description={"Para poder agendar una sesión con uno de nuestros profesionales, primero debes registrarte, sólo toma 1 minuto y es gratis."}
              icono={"fa-solid fa-arrow-right"} />

            <InfoCard title={<Link to={store.logged == true ? "/profesionales":"/vista-login"}className="text-dark fs-3 text-decoration-none">Agendar sesión</Link>}
              description={"Luego de registrarte, puedes ver la lista de nuestros profesionales y sus especialidades, ver qué días y horarios tienen disponibles y agendar en el que más prefieras."}
              icono={"fa-regular fa-calendar-days"} />

            <InfoCard title={<Link to={store.logged == false && "/vista-login" } className="text-dark fs-3 text-decoration-none">Ingresar a la sesión</Link>}
              description={"Por último, debes acceder al sitio el día agendado, donde tendrá lugar la sesión con el/la profesional."}
              icono={"fa-regular fa-comments"} />
          </div>
        </div>
      </section>
      <section className="d-flex flex-column">
        <div className="my-auto">
          <h2 className="text-inicio my-5 text-center">Profesionales Destacados</h2>
          <div className="row justify-content-center">
            <ProfDestacados />
          </div>
        </div>
      </section>
    </>
  );
};