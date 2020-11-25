import React from 'react';

import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

import User from "../../assets/img/user.png";
import Queixas from "../../assets/img/queixas.png";
import { useHistory } from 'react-router-dom';

const DashboardAdmin = () => {
  const history = useHistory();
  
  const goToPage = (pageTitle) => {
    if(pageTitle === "usuarios") {
      history.push("/listarUsuarios")
    }else {
      history.push("/listarQueixas")
    }
  }


  return (
    <Container>
      <Jumbotron className="mt-3">
        <h1>Olá, Admin!</h1>
        <p>
          Esse é seu Dashboard e aqui você terá suas principais funções.
        </p>
      </Jumbotron>
      <div style={{display: "flex", justifyContent: "space-around"}} className="mt-3">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={User} style={{height: "200px"}}/>
        <Card.Body>
          <Card.Title>Gerenciar usuários</Card.Title>
          <Card.Text>
            Clique abaixo para verificar e manipular os registros de usuários no sistema.
          </Card.Text>
          <Button variant="primary" onClick={() => goToPage("usuarios")}>Gerenciar Usuários</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={Queixas} style={{height: "200px"}}/>
        <Card.Body>
          <Card.Title>Gerenciar Queixas</Card.Title>
          <Card.Text>
          Clique abaixo para verificar e manipular as queixas registradas no sistema.
          </Card.Text>
          <Button variant="primary" onClick={() => goToPage("queixas")}>Gerenciar Queixas</Button>
        </Card.Body>
      </Card>
      </div>
      
    </Container>
  )
}

export default DashboardAdmin;
