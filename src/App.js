import React, { Component } from 'react';
import NuevaPersona from './componentes/NuevaPersona';
import ListaPersonas from './componentes/ListaPersonas';
import {BrowserRouter as Router, Route , Switch,Link} from 'react-router-dom';
import VentanaPersona from './componentes/VentanaPersona';


class App extends Component {
  state = { 
    personas: [],
    clicada: {}
   }

   // Cuando la aplicación carga
  componentDidMount() {
    const ListaQuirofanos = localStorage.getItem('QUIROFANOS');
    if(ListaQuirofanos) {
      this.setState({
        personas : JSON.parse(ListaQuirofanos)
      })
    }
  }

  // cuando eliminamos o agregamos una nueva cita
  componentDidUpdate() {
    localStorage.setItem('QUIROFANOS', JSON.stringify(this.state.personas));
  }

   crearPersona = persona => {
     this.setState({personas:[...this.state.personas, persona]})
   }

   //eliminar tareas relacionadas a la persona eliminada
eliminar_Tareas_Relacionadas = id => {
  let tareas = JSON.parse(localStorage.getItem('TAREAS'))
  if (tareas){
    let tareas_filtradas = tareas.filter( function (tarea){
      return tarea.idQuirofano !== id
  });
  localStorage.setItem('TAREAS', JSON.stringify(tareas_filtradas))
  }
  }
 
   eliminarPersona = id => {
    this.eliminar_Tareas_Relacionadas(id)
    const personasActuales = [...this.state.personas];
    const filtradas = personasActuales.filter(persona => persona.id !== id )
    this.setState( {personas : filtradas } )
}

personaClicada = persona => {
  this.setState ( { clicada : persona })
}

cargarPredef = (e) => {
  let quirofanos=[
    {id: 1,
    nombre:"Gabriel"},

    {id: 2, 
    nombre : "Yesica"}
  ]

  let tareas = [
    {id: 1,
    idQuirofano: 1,
    nombre:"Aprender React Native",
    completa:false},
    {id: 2,
      idQuirofano: 1,
      nombre:"Aprender también Android Studio",
      completa:false},
    {id: 3,
      idQuirofano: 1,
      nombre:"Ir al Gimnasio",
      completa:false},
      {id: 4,
        idQuirofano: 2,
        nombre:"Bañarme porque soy sucia",
        completa:false},
      {id: 5,
        idQuirofano: 2,
        nombre:"Cuidar el celu",
        completa:false}
  ]

  function cargarStorage(){
   
    localStorage.setItem("QUIROFANOS", JSON.stringify(quirofanos))
    localStorage.setItem("TAREAS", JSON.stringify(tareas))
    
    //const ListaQuirofanos = localStorage.getItem('QUIROFANOS');
    //this.setState({
     // personas : JSON.parse(ListaQuirofanos)
   // })
  }

  cargarStorage()
}



  render() { 
    return ( 
      <Router>
        <Switch>  
          
          <Route exact path = "/" render= {()=> (
                <div className="master">
                <div className="header">
                  <h1>ADM TAREAS</h1>
                  <Link to="/"><input type="button" onClick={this.cargarPredef} placeholder="Cargar Predefinidas"/></Link>
                </div>
                  <NuevaPersona
                    crearPersona={this.crearPersona}
                  />
                  <ListaPersonas
                    personas={this.state.personas}
                    eliminarPersona={this.eliminarPersona}
                    personaClicada = {this.personaClicada}
                    eliminar_Tareas_Relacionadas={this.eliminar_Tareas_Relacionadas}
                  />
              </div>
          )}   />

          <Route exact path = "/persona/:id" render = { ()=> (
            <VentanaPersona
               clicada = {this.state.clicada}
            />
          )} />
          
        </Switch>
      </Router>
     );
  }
}
 
export default App;
