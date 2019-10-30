import React from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Tarea = ({tarea,eliminarTarea, cambiarEstadoTarea, index }) => {


    const clickEliminar = e => {
        eliminarTarea(tarea.id)
    }

    const cambiarEstado = e => {
        if (tarea.completa === false){
            tarea.completa = true
        }else{
            tarea.completa = false
        }
        cambiarEstadoTarea(tarea, index)
    }

    return ( 
        <div className="tarea"  style={{ backgroundColor:  tarea.completa ? "green" : "red" }}>
                <h3> {tarea.nombre}</h3>
                <div className="botoneraTareas">
                    {tarea.completa ? (<i className="fas fa-check-circle"
                    onClick={cambiarEstado}>Completa</i>) : (<i className="fas fa-circle" onClick={cambiarEstado}>Incompleta</i>)}
                    <i className="fas fa-trash" onClick={clickEliminar}></i>
                </div>
                           
             </div>
     );
}
 
export default Tarea;