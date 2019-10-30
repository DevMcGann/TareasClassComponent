import React from 'react';
import {Link} from 'react-router-dom'

const Persona = ({persona,eliminarPersona,personaClicada}) => {

    const eliminar = e =>{
        eliminarPersona(persona.id)
    }

    const handleClick = (e) => {
        personaClicada(persona); //devolver callback a App
    }


    return ( 
        <React.Fragment>
        <Link to={`/persona/${persona.id}`}> <h1 onClick={handleClick}>{persona.nombre}</h1> </Link> 
        <button
                className="btn btn-danger"
                onClick={eliminar}
            >Borrar </button>
        </React.Fragment>
     );
}
 
export default Persona;