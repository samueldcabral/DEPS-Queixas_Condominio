import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardUser from "./components/DashboardUser/DashboardUser";
import MyNavbar from "./components/MyNavbar/MyNavbar";

import {QueixaContext} from "./store/store";

function App() {
  const [user, setUser] = useState();

  return (
    <QueixaContext.Provider value={{
      user,
      setUser
    }}>
      <Router>
        <MyNavbar/>

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/dashboardUser" exact component={DashboardUser}/>
        </Switch>
      </Router>

    </QueixaContext.Provider>
  );
  
}

export default App;
