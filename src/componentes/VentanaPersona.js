import React, { Component } from 'react';
import uuid from 'uuid';
import Tarea from './Tarea';

class VentanaPersona extends Component {
    

    
    state = { 
        tareasArray:[],
        tareaNueva:{ nombre: ""},
        quirofanoClicado:this.props.clicada  //Solucionar tema de que pierde referencia cuando refrescamos pantalla (podria arreglarlo con LS)
     }
     
     ////////////////////////////////LOCAL STORAGE//////////////////
     componentDidMount() {
        const listaTareas = localStorage.getItem('TAREAS');
        if(listaTareas) {
          this.setState({
            tareasArray : JSON.parse(listaTareas)    
          })
        }
      }
    
      componentDidUpdate() {
        localStorage.setItem('TAREAS', JSON.stringify(this.state.tareasArray));
      }
     //////////////////////////////////////////////////////////////////////



      //////////////////////////Formulario///////////////////////////
      handleSubmit = e => {
          e.preventDefault();
          const tarea = {
              id:uuid(),
              idQuirofano: this.state.quirofanoClicado.id,
              nombre:this.state.tareaNueva.nombre,
              completa:false
          }
          this.setState({tareasArray:[...this.state.tareasArray, tarea]})   
         
      }

      handleChange = e => {
        this.setState({
          tareaNueva:{
            ...this.state.tareaNueva.nombre,
            [e.target.name] : e.target.value
        }})
       }
       
       ///////////////////////////////////////////////////////

       eliminarTarea = id => {
        const nuevasTareas = [...this.state.tareasArray];
        var newArray = nuevasTareas.filter(function (tar) {
            return tar.id !== id 
          });
          this.setState( { tareasArray:newArray})
    }

    todasIncompletas= e=> {    // filtrar por idquirofano antes y despues si cambiar en el array
        const copiaArray = [...this.state.tareasArray]
        //var newArray = copiaArray.filter(function (tar) {
            //return tar.idQuirofano === this.state.quirofanoClicado.id 
       // });
       copiaArray.forEach(tarea => (tarea.completa = false))
      
        this.setState({ tareasArray:copiaArray})
   }

   cambiarEstadoTarea = (tarea,index) => {
        
        const tareaModificada = tarea
        const indiceOriginal = index
        const copiaArray = [...this.state.tareasArray]
        var newArray = copiaArray.filter(function (tar) {
            return tar.id !== tarea.id 
        });
        newArray.splice(indiceOriginal,0, tareaModificada)
        this.setState({ tareasArray:newArray});
}



    render() { 
        return ( 
     <React.Fragment>
        <div className="quirofanoSeleccionado">
        <h1>{this.state.quirofanoClicado.nombre}</h1>

            <div className="nuevaTarea">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Nueva Tarea" 
                        onChange={this.handleChange} required
                        value={this.state.tareaNueva.nombre}
                        name="nombre"
                    />
                </form>
                <button onClick={this.todasIncompletas}>Marcar todas Incompletas</button>
            </div>

            {!this.state.tareasArray.length ? (<p>No hay tareas</p>) : (
                 <div className="listaTareas">
                        
                        
                     {this.state.tareasArray.map((tarea,index) => tarea.idQuirofano === this.state.quirofanoClicado.id ? (
                         <Tarea 
                             key={index}
                             tarea={tarea}
                             id={tarea.id}
                             eliminarTarea={this.eliminarTarea}
                             cambiarEstadoTarea={this.cambiarEstadoTarea} 
                             index={index}
                             
                            />
                        ):(null)
                        )}
                
                </div>
            )}
        </div>
    </React.Fragment>
    );//return
    } //render
}//class
 
export default VentanaPersona;