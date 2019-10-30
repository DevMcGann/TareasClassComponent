import React, { Component } from 'react';
import uuid from 'uuid';



class NuevaPersona extends Component {

    state = {  persona: {nombre:""} }

    handleChange = e => {
        this.setState({
          persona:{
            ...this.state.persona,
            [e.target.name] : e.target.value
        }})
       }
    
       handleSubmit = e => {
         e.preventDefault();
         const newPersona = {...this.state.persona};
         newPersona.id = uuid();
         this.props.crearPersona(newPersona)
         
       }
    
    render() { 
        return (  
            <div className="formulario">
          <form onSubmit={this.handleSubmit} >
            <input type="text" placeholder="Agregar Persona" name="nombre" value={this.state.persona.nombre} onChange={this.handleChange}/>
            <input type="submit" placeholder="Agregar"/>
          </form>
        </div>
        );
    }
}
 
export default NuevaPersona;
