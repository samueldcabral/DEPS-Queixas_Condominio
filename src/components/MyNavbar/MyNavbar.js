import React, {  useContext, useEffect, useState } from "react";
import "./MyNavbar.css";

import { useHistory } from "react-router-dom";

import {QueixaContext} from "../../store/queixa";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { getLoggedUser } from "../../services/api";

const MyNavbar = () => {
  const {setUser} = useContext(QueixaContext);
  const [localUser, setLocalUser] = useState();
  const history = useHistory();
  
  const getLocalLoggedUser = async () => {
    const user = await getLoggedUser();
    setLocalUser(user);
    setUser(user);
  }

  useEffect(() => {
    getLocalLoggedUser();
    return () => {};
  }, []);

  const handleClick = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userPerfil");
    setUser("");
    history.push("/");
  }

  return (
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand onClick={() => history.push("/")} className="queixa_logo">Queixas de Condomínio</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Tela inicial</Nav.Link>
      <Nav.Link onClick={() => history.push("/Dashboard")}>Queixas</Nav.Link>
      <Nav.Link onClick={() => history.push("/DashboardUser")}>Usuários</Nav.Link>

    </Nav>
    {localUser ? <Button variant="outline-light" onClick={handleClick}>Sair do sistema</Button> 
    :
      <div style={{color: "white"}}>Seja bem-vindo!</div>
    // <Form inline>
    //   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //   <Button variant="outline-light">Search</Button>
    // </Form>
    }
    
  </Navbar>
  );
};

export default MyNavbar;
