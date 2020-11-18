import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import {getApiQueixas, deleteApiQueixas} from "../../services/api";
import Queixa from "../../models/Queixa";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

const Dashboard = () => {
  const [queixas, setQueixas] = useState([]);
  const [show, setShow] = useState(false); //Modal state
  const [titulo, setTitulo] = useState("");
  const [privada, setPrivada] = useState(false);

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQueixas = async () => {
    let result = await getApiQueixas();

    let resultArr = result.data.map((element) => {
      let {created_at, descricao, gravidade, privacidade, status_id, 
        tipo, titulo, updated_at, usuarios_ids, _id} = element;
      
      return new Queixa(created_at, descricao, gravidade, privacidade, status_id, 
          tipo, titulo, updated_at, usuarios_ids, _id);
    })

    setQueixas(resultArr);
  }

  const deleteQueixas = async (queixaID) => {
    await deleteApiQueixas(queixaID);
    
    getQueixas();
  }

  useEffect(() => {

    getQueixas();

    return () => {};
  }, []);



  
  return (
    <Container className="Container">
      <h1 className="mt-5 titulo">Verifique aqui suas queixas recentes</h1>

      <div className="div-conteudo">
        {/* {queixas && <p>{JSON.stringify(queixas, null, '\t')}</p>} */}
        <Button variant="primary" onClick={handleShow} className="mt-3 mr-4">
          Registrar nova denúncia
        </Button>
        <ButtonGroup vertical className="mt-3 mr-4">
              <DropdownButton as={ButtonGroup} title="Listar denúncias" id="bg-vertical-dropdown-1">
              <Dropdown.Item eventKey="1">Por denúncia aberta</Dropdown.Item>
              <Dropdown.Item eventKey="2">Por denúncia fechada</Dropdown.Item>
              <Dropdown.Item eventKey="3">Por gravidade leve</Dropdown.Item>
              </DropdownButton>
        </ButtonGroup>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registre sua denúncia</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Título da denúncia</Form.Label>
              <Form.Control type="text" placeholder="Digite o título" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="É denúncia privada?" checked={privada} onChange={(e) => setPrivada(e.target.checked)}/>
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
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Gravidade</th>
              <th>Privado?</th>
              <th>Criado_em</th>
              <th>Abrir</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
    
            {queixas && queixas.map((queixa,idx)=> {
              return(
                <tr>
                  <td>{idx+1}</td>
                  <td>{queixa.titulo}</td>
                  <td>{queixa.descricao}</td>
                  <td>{queixa.tipo}</td>
                  <td>{queixa.gravidade}</td>
                  <td>{queixa.privacidade ? "Sim" : "Não"}</td>
                  <td>{new Date(queixa.created_at).toUTCString()}</td>
                  <td><Button size="sm">Vizualizar</Button></td>
                  <td><Button size="sm">Editar</Button></td>
                  <td><Button size="sm" onClick={() => deleteQueixas(queixa._id)}>Excluir</Button></td>
                </tr>
              )
            })}
          
          </tbody>
        </Table>
      </div>

    </Container>
  );
};

export default Dashboard;
