import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import { QueixaProvider } from "./store/queixa";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardUser from "./components/DashboardUser/DashboardUser";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import VisualizarQueixa from "./components/Queixa/VisualizarQueixa";
import Teste from "./components/Teste/Teste";

function App() {
  return (
    <QueixaProvider>
      <Router>
        <MyNavbar/>

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/dashboardUser" exact component={DashboardUser}/>
          <Route path="/queixa/:queixaId" exact component={VisualizarQueixa}/>

          <Route path="/teste" exact component={Teste}/>
        </Switch>
      </Router>
    </QueixaProvider>
  );
  
}

export default App;
