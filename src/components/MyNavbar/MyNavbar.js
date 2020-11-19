import React, {  useContext, useEffect } from "react";
import "./MyNavbar.css";

import { useHistory } from "react-router-dom";

import {QueixaContext} from "../../store/queixa";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const MyNavbar = () => {
  const {state} = useContext(QueixaContext);
  const history = useHistory();
  
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand onClick={() => history.push("/")} className="queixa_logo">Queixas de Condomínio</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Tela inicial</Nav.Link>
      <Nav.Link href="#features">Queixas</Nav.Link>

    </Nav>
    {state ? <div>user is {state.email}</div> 
    :
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    }
    
  </Navbar>
  );
};

export default MyNavbar;
