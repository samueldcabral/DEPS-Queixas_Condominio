import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import { QueixaProvider } from "./store/queixa";

import Home from "./components/Home/Home";
import ListarQueixas from "./components/ListarQueixas/ListarQueixas";
import ListarUsuarios from "./components/ListarUsuarios/ListarUsuarios";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import VisualizarQueixa from "./components/Queixa/VisualizarQueixa";
import VisualizarUsuario from "./components/Usuario/VisualizarUsuario";
import Teste from "./components/Teste/Teste";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import DashboardUsuario from "./components/DashboardUsuario/DashboardUsuario";

function App() {
  return (
    <QueixaProvider>
      <Router>
        <MyNavbar/>

        <Switch>
          <Route path="/" exact component={Home}/>

          {/* Dashboards / */}
          <Route path="/dashboard-admin" exact component={DashboardAdmin}/>
          <Route path="/dashboard" exact component={DashboardUsuario}/>

          <Route path="/listarQueixas" exact component={ListarQueixas}/>
          <Route path="/listarUsuarios" exact component={ListarUsuarios}/>
          <Route path="/queixa/:queixaId" exact component={VisualizarQueixa}/>
          <Route path="/usuario/:usuarioId" exact component={VisualizarUsuario}/>

          <Route path="/teste" exact component={Teste}/>
        </Switch>
      </Router>
    </QueixaProvider>
  );
  
}

export default App;
