import React, { useState, useEffect } from "react";
import "./DashboardUser.css";

import {getApiUsuarios, deleteApiUsuarios, createApiUsuarios} from "../../services/api";
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

 //Modal state
  const [show, setShow] = useState(false);

  //Model Usuário
  const [_id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [endereco, setEndereco] = useState("");
  const [perfil_id, setPerfil_id] = useState("");
  const [queixa_ids, setQueixa_ids] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [updated_at, setUpdated_at] = useState("");

  //Erro password
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

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

  const createUsuarios = async () => {
    handleClose()
    let user = new Usuario(_id, email, password, password_confirmation, 
      nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
      
    await createApiUsuarios(user);
    getUsuarios();
  }

  const deleteUsuarios = async (usuarioId) => {
    await deleteApiUsuarios(usuarioId);
    
    getUsuarios();
  }

  useEffect(() => {

    getUsuarios();

    return () => {};
  }, []);

  const validaDados = () => {
    let status = true;
    usuarios.map((usuario)=> {
      if (usuario.email === email){
        let status = false;
        setErrorEmail("E-mail já cadastrado!")
      }
    })
    if(password !== password_confirmation){
      setErrorPassword("As senhas estão diferentes!")
    }else if (password === password_confirmation && status == true){
      createUsuarios()
    }
  }

  return (
    <Container className="Container">
      <h1 className="mt-5 titulo">Verifique aqui todos os usuários cadastrados</h1>
      
        <div className="div-conteudo">
          <Button variant="primary" onClick={handleShow} className="mt-3 mr-4">
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
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errorEmail && (
                  <div style={{
                    color: "rgb(168,104,109)",
                    backgroun: "rgb(248,215,218)",
                    boderRadius: "3px",
                    padding: "2px 2px 2px 10px",
                    fontSizr: "0.8rem",
                    marginBottom: "0.5rem"
                  }}>
                    {errorEmail}
                  </div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Nome do usuário</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errorPassword && (
                  <div style={{
                    color: "rgb(168,104,109)",
                    backgroun: "rgb(248,215,218)",
                    boderRadius: "3px",
                    padding: "2px 2px 2px 10px",
                    fontSizr: "0.8rem",
                    marginBottom: "0.5rem"
                  }}>
                    {errorPassword}
                  </div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirme a senha</Form.Label>
                <Form.Control type="password" placeholder="Repita a senha" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)}/>
                {errorPassword && (
                  <div style={{
                    color: "rgb(168,104,109)",
                    backgroun: "rgb(248,215,218)",
                    boderRadius: "3px",
                    padding: "2px 2px 2px 10px",
                    fontSizr: "0.8rem",
                    marginBottom: "0.5rem"
                  }}>
                    {errorPassword}
                  </div>
                )}
              </Form.Group>

              <Form.Group  controlId="formGridAddress1">
                <Form.Label>Endereco</Form.Label>
                <Form.Control type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Perfil</Form.Label>
                <Form.Control as="select" onChange={(e) => setPerfil_id(e.target.value)}>
                  <option value="5fa1b6d84debe72ed41388ad">Comum</option>
                  <option value="5fa1b6b64debe72ed41388ac">Admin</option>
                </Form.Control>
              </Form.Group>

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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Endereço</th>
              <th>Perfil</th>
              {/* <th>Queixas</th> */}
              {/* <th>Criado_em</th> */}
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
    
            {usuarios && usuarios.map((usuario,idx)=> {
              return(
                <tr>
                  <td>{idx+1}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.endereco}</td>
                  <td>{usuario.perfil_id.$oid === "5fa1b6d84debe72ed41388ad" ? "Comum" : "Administrador"}</td>
                  {/* <td>{usuario.queixa_ids}</td> */}
                  {/* <td>{new Date(usuario.created_at).toUTCString()}</td> */}
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
