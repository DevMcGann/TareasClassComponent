import React, { Component } from 'react';
import uuid from 'uuid';
import Tarea from './Tarea';

class VentanaPersona extends Component {
    

    
    state = { 
        tareasArray:[],
        tareaNueva:{ nombre: ""},
        quirofanoClicado:this.props.clicada  //Solucionar tema de que pierde referencia cuando refrescamos pantalla
     }
     
     ////////////////////////////////LOCAL STORAGE//////////////////
     componentDidMount() {
        
         this.setState({quirofanoClicado: clicado})
        const listaTareas = localStorage.getItem('TAREAS');
        console.log(JSON.stringify(listaTareas))
        if(listaTareas) {
          this.setState({
            tareasArray : JSON.parse(listaTareas)    //NO ESTA ACTIALIZANDO STATE?
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
         // console.log("tarea " + JSON.stringify(tarea) )
          this.setState({ ...this.state.tareasArray, tarea})   //HOUSTON WE HAVE A PROBLEM HERE
         
      }

      handleChange = e => {
        this.setState({
          tareaNueva:{
            ...this.state.tareaNueva.nombre,
            [e.target.name] : e.target.value
        }})
       }
       
       ///////////////////////////////////////////////////////

       eliminaTarea = id => {
        const nuevasTareas = [...this.state.tareasArray];
        var newArray = nuevasTareas.filter(function (tar) {
            return tar.id !== id 
          });
          this.setState( { tareasArray:newArray})
    }

    todasIncompletas= e=> {
        const copiaArray = [...this.state.tareasArray]
        copiaArray.map(tarea => (
            tarea.complete=false
        ))
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
                             eliminaTarea={this.eliminaTarea}
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