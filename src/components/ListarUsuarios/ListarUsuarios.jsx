import React, { useState, useEffect } from "react";
import "./ListarUsuarios.css";

import { getApiUsuarios, deleteApiUsuarios, createApiUsuarios, updateApiUsuarios } from "../../services/api";
import Usuario from "../../models/Usuario";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

import CriarUsuario from "../Usuario/CriarUsuario"
import { useHistory } from "react-router-dom";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const history = useHistory();

  //Modal state
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalEmail, setModalEmail] = useState();
  const [modalId, setModalId] = useState();
  const [modalNome, setModalNome] = useState();
  // const [modalPassword, setModalPassword] = useState();
  // const [modalPasswordConfirmation, setmodalPasswordConfirmation] = useState();
  const [modalEndereco, setModalEndereco] = useState();
  const [modalPerfil, setModalPerfil] = useState();


  //Model Usuário
  const [id, setId] = useState("");
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
  //Erro e loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = (usuario) => {
    console.log(usuario)
    setShowEdit(true);
    setModalEmail(usuario.email);
    setModalNome(usuario.nome);
    setModalId(usuario.id.$oid);
    // setModalPassword(usuario.password);
    // setmodalPasswordConfirmation(usuario.password_confirmation);
    setModalEndereco(usuario.endereco);
    // setModalPerfil(usuario.perfil);
    // modalEditUser(usuario)

  }
  const handleCloseEdit = () => setShowEdit(false);


  const getUsuarios = async () => {
    try {
      setError("");
      setLoading(true);
      let result = await getApiUsuarios();

      let resultArr = result.data.map((element) => {
        let { id, email, nome, endereco, perfil_id, queixa_ids,
          created_at, updated_at } = element;

        return new Usuario(id, email, password, password_confirmation,
          nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
      })
      setUsuarios(resultArr);
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }

  const validaDados = () => {
    let status = true;
    usuarios.map((usuario) => {
      if (usuario.email === email) {
        let status = false;
        setErrorEmail("E-mail já cadastrado!")
      }
    })
    if (password !== password_confirmation) {
      setErrorPassword("As senhas estão diferentes!")
    } else if (password === password_confirmation && status == true) {
      createUsuarios()
    }
  }

  const handleModalEdit = () => {
    let usuario = {
      nome: modalNome,
      email: modalEmail,
      endereco: modalEndereco,
      "$oid": modalId
    }

    updateApiUsuarios(usuario);
    setShowEdit(false);
    history.go(0)
  }

  const createUsuarios = async () => {
    handleClose()
    let user = new Usuario(id, email, password, password_confirmation,
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

    return () => { };
  }, []);

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
          <CriarUsuario getUsuarios={getUsuarios} handleClose={handleClose} usuarios={usuarios}></CriarUsuario>
        </Modal>
      </div>

      <div className="div-conteudo">
        {error !== "" && <h4 style={{ color: "red" }}>Erro: {error}</h4>}
        {!loading && usuarios !== [] &&
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Perfil</th>
                <th>Queixas</th>
                {/* <th>Criado_em</th> */}
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>

              {usuarios && usuarios.map((usuario, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.endereco}</td>
                    <td>{usuario.perfil_id.$oid === "5fa1b6d84debe72ed41388ad" ? "Comum" : "Administrador"}</td>
                    <td><Button size="sm">Visualizar</Button></td>
                    {/* <td>{new Date(usuario.created_at).toUTCString()}</td> */}
                    <td><Button size="sm" onClick={() => handleShowEdit(usuario)}>Editar</Button></td>
                    {/* <td><Button size="sm" onClick={() => modalEditUser(usuario)}>Editar</Button></td> */}
                    <td><Button size="sm" onClick={() => deleteUsuarios(usuario.id)}>Excluir</Button></td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        }
        {loading && <h1>Carregando...</h1>}
      </div>
      {/* </div> */}


      {/* ///////////////////////////////////////////////////////////////////////// */}
      <>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Atualize o usuário</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail do usuário</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} />
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
                <Form.Control type="text" placeholder="Digite o nome do usuário" value={modalNome} onChange={(e) => setModalNome(e.target.value)} />
              </Form.Group>

              {/* <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" value={modalPassword} onChange={(e) => setModalPassword(e.target.value)}/>
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
              <Form.Control type="password" placeholder="Repita a senha" value={modalPasswordConfirmation} onChange={(e) => setmodalPasswordConfirmation(e.target.value)}/>
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
            </Form.Group> */}

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Endereco</Form.Label>
                <Form.Control type="text" placeholder="Endereço" value={modalEndereco} onChange={(e) => setModalEndereco(e.target.value)} />
              </Form.Group>

              {/* <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Perfil</Form.Label>
              <Form.Control value={modalPerfil} as="select" onChange={(e) => setModalPerfil(e.target.value)}>
                <option value="5fa1b6d84debe72ed41388ad">Comum</option>
                <option value="5fa1b6b64debe72ed41388ac">Admin</option>
              </Form.Control>
            </Form.Group> */}

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleModalEdit}>
              Atualizar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
};

export default ListarUsuarios;