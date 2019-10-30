import React from 'react';
import Persona from './Persona';

const ListaPersonas = ({personas, eliminarPersona,personaClicada,eliminar_Tareas_Relacionadas}) => {
    
    
    
    const mensaje = Object.keys(personas).length === 0 ? 'No hay personas' : 'Administra las personas aqui';

    return (
        
        <div className="listaPersonas">
            <h1>{mensaje}</h1>
            {personas.map (persona => (
                <Persona
                    key={persona.id}
                    persona={persona}
                    eliminarPersona={eliminarPersona}
                    personaClicada = {personaClicada}
                    eliminar_Tareas_Relacionadas={eliminar_Tareas_Relacionadas}
                />
            ))}
        </div>
      );
}
 
export default ListaPersonas;