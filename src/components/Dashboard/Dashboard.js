import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import {QueixaContext} from "../../store/queixa";

import { useHistory } from "react-router-dom";

import {getApiQueixas, deleteApiQueixas, getApiUsuarios, createApiQueixas} from "../../services/api";
import Queixa from "../../models/Queixa";
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
  const [queixas, setQueixas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false); //Modal state
  const history = useHistory();

  const {user} = useContext(QueixaContext);

  //Model Queixa
  const [_id, set_Id] = useState("");
  const [titulo, setTitulo] = useState("");
  const [privada, setPrivada] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [gravidade, setGravidade] = useState("");
  const [status_id, setStatus_id] = useState("");
  const [tipo, setTipo] = useState("");
  const [criado_por, setCriado_por] = useState("");
  const [usuarios_ids, setUsuarios_id] = useState([]);

  //Model Usuário
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [endereco, setEndereco] = useState("");
  const [perfil_id, setPerfil_id] = useState("");
  const [queixa_ids, setQueixa_ids] = useState([]);
  const [created_at, setCreated_at] = useState("");
  const [updated_at, setUpdated_at] = useState("");

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorTitulo, setErrorTitulo] = useState("");

  const getDadosApi = async () => {
    let result = await getApiUsuarios();
    let resultArr = result.data.map((element) => {
      let {id, email, password, password_confirmation, 
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at} = element;
      
      return new Usuario(id, email, password, password_confirmation, 
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
    })
    setUsuarios(resultArr);

    let result2 = await getApiQueixas();
    let resultArr2 = result2.data.map((element) => {
      let {_id, created_at, updated_at, usuarios_ids, status_id,
        privada, descricao, titulo, gravidade, tipo, criado_por} = element;
      
      return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
        privada, descricao, titulo, gravidade, tipo, criado_por);
    })
    setQueixas(resultArr2);
  } 

  const getUsuarios = async () => {
    let result = await getApiUsuarios();
    let resultArr = result.data.map((element) => {
      let {id, email, nome, endereco, perfil_id, queixa_ids,
        created_at, updated_at} = element;
      
      return new Usuario(id, email, password, password_confirmation, 
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
    })
    setUsuarios(resultArr);
  }

  const getQueixas = async () => {
    let result = await getApiQueixas();
    let resultArr = result.data.map((element) => {
      let {_id, created_at, updated_at, usuarios_ids, status_id,
        privada, descricao, titulo, gravidade, tipo, criado_por} = element;
      
      return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
        privada, descricao, titulo, gravidade, tipo, criado_por);
    })
    setQueixas(resultArr);
  }

  const validaDados = () => {
    queixas.map((queixa)=> {
      if (queixa.titulo === titulo){
        setErrorTitulo("Título já cadastrado!")
      }else{
        createQueixas()
      }
    })
  }

  const createQueixas = async () => {
    handleClose()
    let queixa = new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
      privada, descricao, titulo, gravidade, tipo, user._id.$oid);
      console.log(queixa)
    await createApiQueixas(queixa);
    getQueixas();
  }

  const deleteQueixas = async (queixaID) => {
    await deleteApiQueixas(queixaID);
    getQueixas();
  }

  useEffect(() => {

    getDadosApi();

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
            <Form.Group>
              <Form.Label>Título da denúncia</Form.Label>
              <Form.Control type="text" placeholder="Digite o título" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
              {errorTitulo && (
                  <div style={{
                    color: "rgb(168,104,109)",
                    backgroun: "rgb(248,215,218)",
                    boderRadius: "3px",
                    padding: "2px 2px 2px 10px",
                    fontSizr: "0.8rem",
                    marginBottom: "0.5rem"
                  }}>
                    {errorTitulo}
                  </div>
                )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" placeholder="Detalhe aqui sua denúncia" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Gravidade</Form.Label>
                <Form.Control as="select" onChange={(e) => setGravidade(e.target.value)}>
                  <option value="Leve">Leve</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Grave">Grave</option>
                  <option value="Gravissima">Gravíssima</option>
                </Form.Control>
              </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Tipo</Form.Label>
                <Form.Control as="select" onChange={(e) => setTipo(e.target.value)}>
                  <option value="Homicidio">Homicídio</option>
                  <option value="Roubo">Roubo</option>
                  <option value="Furto">Furto</option>
                  <option value="Pertubacao Publica">Pertubação Pública</option>
                </Form.Control>
              </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="É denúncia privada?" checked={privada} onChange={(e) => setPrivada(e.target.checked)}/>
            </Form.Group>

            {/* Isso só aparece se o usuário logado for admin, se não, o padrão é pendente */}
            {/* Onde perfil_id vai ser o usuário que vem no contexto */}
            {/* { perfil_id == "Admin" (          */}
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Status</Form.Label>
                  <Form.Control as="select" onChange={(e) => setStatus_id(e.target.value)}>
                    <option value="5fa1ba373ca57304b0fe6f8c">Aberto</option>
                    <option value="5fa1ba423ca57304b0fe6f8e">Fechado</option>
                    <option value="5fa1bae73ca57304b0fe6f90">Pendente</option>
                </Form.Control>
              </Form.Group>
            {/* )} */}

          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={validaDados}>
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
              <th>Criado_por</th>
              <th>Abrir</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              queixas && queixas.map((queixa,idx)=> {

                  const userName = usuarios.filter((user) => user.id.$oid === queixa.criado_por)
                  return(
                    <tr>
                      <td>{idx+1}</td>
                      <td>{queixa.titulo}</td>
                      <td>{queixa.descricao}</td>
                      <td>{queixa.tipo}</td>
                      <td>{queixa.gravidade}</td>
                      <td>{queixa.privacidade ? "Sim" : "Não"}</td>
                      <td>{new Date(queixa.created_at).toUTCString()}</td>
                      <td>{userName[0].nome}</td>
                      <td><Button size="sm" onClick={() => history.push("/queixa/"+queixa._id.$oid)}>Vizualizar</Button></td>
                      <td><Button size="sm">Editar</Button></td>
                      <td><Button size="sm" onClick={() => deleteQueixas(queixa._id)}>Excluir</Button></td>
                    </tr>
                  )

              })
            }
          </tbody>
        </Table>
      </div>

    </Container>
  );
};

export default Dashboard;
