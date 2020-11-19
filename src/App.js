import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import { QueixaProvider } from "./store/queixa";
// import {QueixaContext} from "./store/store";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import MyNavbar from "./components/MyNavbar/MyNavbar";

import VisualizarQueixa from "./components/Queixa/VisualizarQueixa";

function App() {
  // const [user, setUser] = useState();
  return (
    // <QueixaContext.Provider value={{
    //   user,
    //   setUser
    // }}>
    <QueixaProvider>
      <Router>
        <MyNavbar/>

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/queixa/:queixaId" exact component={VisualizarQueixa}/>
        </Switch>
      </Router>
    </QueixaProvider>
    // </QueixaContext.Provider>
  );
  
}

export default App;
