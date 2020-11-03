import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import MyNavbar from "./components/MyNavbar/MyNavbar";

function App() {
  return (
    <Router>
      <MyNavbar/>

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </Switch>
    </Router>
  );
  
}

export default App;
