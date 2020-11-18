import React, { useState, useEffect } from "react";
import "./DashboardUser.css";

import {getApiUsuarios, deleteApiUsuarios} from "../../services/api";
import Usuario from "../../models/Usuario";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false); //Modal state
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState(false);

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsuarios = async () => {
    let result = await getApiUsuarios();

    let resultArr = result.data.map((element) => {
      let {_id, email, password, password_confirmation, 
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at} = element;
      
      return new Usuario(_id, email, password, password_confirmation, 
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
    })

    setUsuarios(resultArr);
  }

  const deleteUsuarios = async (usuarioId) => {
    await deleteApiUsuarios(usuarioId);
    
    getUsuarios();
  }

  useEffect(() => {

    getUsuarios();

    return () => {};
  }, []);



  return (
    <Container className="Container">
      <h1 className="mt-5 titulo">Verifique aqui todos os usuários cadastrados</h1>
      
        <div className="div-conteudo">
          <Button mb-0 variant="primary" onClick={handleShow} className="mt-3 mr-4">
            Registrar novo usuários
          </Button>
          <ButtonGroup vertical className="mt-3 mr-4">
            <DropdownButton as={ButtonGroup} title="Listar usuários" id="bg-vertical-dropdown-1">
            <Dropdown.Item eventKey="1">Por denúncia aberta</Dropdown.Item>
            <Dropdown.Item eventKey="2">Por denúncia fechada</Dropdown.Item>
            <Dropdown.Item eventKey="3">Por alguma outra coisa</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registre um novo usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail do usuário</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Nome do usuário</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do usuário" onChange={(e) => setNome(e.target.value)}/>
              </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Registrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

      <div className="div-conteudo">
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Endereço</th>
              <th>Perfil</th>
              {/* <th>Queixas</th> */}
              <th>Criado_em</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
    
            {usuarios && usuarios.map((usuario,idx)=> {
                console.log(usuario.perfil_id)
              return(
                <tr>
                  <td>{idx+1}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.endereco}</td>
                  <td>{usuario.perfil_id.$oid === "5fa1b6d84debe72ed41388ad" ? "Comum" : "Administrador"}</td>
                  {/* <td>{usuario.queixa_ids}</td> */}
                  <td>{new Date(usuario.created_at).toUTCString()}</td>
                  <td><Button size="sm">Editar</Button></td>
                  <td><Button size="sm" onClick={() => deleteUsuarios(usuario._id)}>Excluir</Button></td>
                </tr>
              )
            })}
          
          </tbody>
        </Table>
      </div>
    {/* </div> */}

    </Container>
  );
};

export default Dashboard;
