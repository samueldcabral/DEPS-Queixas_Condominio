import React, { useState, useEffect } from "react";
import "./MyNavbar.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const MyNavbar = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Queixas de Condomínio</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Tela inicial</Nav.Link>
      <Nav.Link href="#features">Queixas</Nav.Link>

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
  );
};

export default MyNavbar;
