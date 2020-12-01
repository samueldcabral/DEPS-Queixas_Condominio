import React, { useState, useEffect, useContext } from "react";
import "./ListarQueixas.css";
import { QueixaContext } from "../../store/queixa";

import { useHistory } from "react-router-dom";

import { getApiQueixas, deleteApiQueixas, getApiUsuarios, createApiQueixas } from "../../services/api";
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

import CriarQueixa from "../Queixa/CriarQueixa"

const ListarQueixas = () => {
  const [queixas, setQueixas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false); //Modal state
  const history = useHistory();

  const { user } = useContext(QueixaContext);

  // //Model Queixa
  // const [_id, set_Id] = useState("");
  // const [titulo, setTitulo] = useState("");
  // const [privada, setPrivada] = useState(false);
  // const [descricao, setDescricao] = useState("");
  // const [gravidade, setGravidade] = useState("");
  // const [status_id, setStatus_id] = useState("");
  // const [tipo, setTipo] = useState("");
  // const [criado_por, setCriado_por] = useState("");
  // const [usuarios_ids, setUsuarios_id] = useState([]);


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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [errorTitulo, setErrorTitulo] = useState("");

  const getDadosApi = async () => {
<<<<<<< HEAD
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
        privacidade, descricao, titulo, gravidade, tipo, criado_por} = element;
      
      return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
        privacidade, descricao, titulo, gravidade, tipo, criado_por);
    })
    setQueixas(resultArr2);

    getUsuarios();
    console.log(usuarios)
  } 
=======
    try {
      setError("");
      setLoading(true);
      let result = await getApiUsuarios();
      let resultArr = result.data.map((element) => {
        let { id, email, password, password_confirmation,
          nome, endereco, perfil_id, queixa_ids, created_at, updated_at } = element;

        return new Usuario(id, email, password, password_confirmation,
          nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
      })
      setUsuarios(resultArr);


      let result2 = await getApiQueixas();
      let resultArr2 = result2.data.map((element) => {
        let { _id, created_at, updated_at, usuarios_ids, status_id,
          privada, descricao, titulo, gravidade, tipo, criado_por } = element;

        return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
          privada, descricao, titulo, gravidade, tipo, criado_por);
      })
      setQueixas(resultArr2);

      getUsuarios();
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }
>>>>>>> a833ef03b9223dbc79235b6558ecdb49925eb640

  const getUsuarios = async () => {
    let result = await getApiUsuarios();
    let resultArr = result.data.map((element) => {
      let { id, email, nome, endereco, perfil_id, queixa_ids,
        created_at, updated_at } = element;

      return new Usuario(id, email, password, password_confirmation,
        nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
    })
    setUsuarios(resultArr);
  }

  const getQueixas = async () => {
    try {
      setError("");
      setLoading(true);

      let result = await getApiQueixas();
      let resultArr = result.data.map((element) => {
        let { _id, created_at, updated_at, usuarios_ids, status_id,
          privada, descricao, titulo, gravidade, tipo, criado_por } = element;

        return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
          privada, descricao, titulo, gravidade, tipo, criado_por);
      })
      setQueixas(resultArr);
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }

  const deleteQueixas = async (queixaID) => {
    await deleteApiQueixas(queixaID);
    getQueixas();
  }

  useEffect(() => {

    getDadosApi();

    return () => { };
  }, []);

  return (
    <Container className="Container">
      <h1 className="mt-5 titulo">Verifique aqui as queixas recentes</h1>

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
          {/* componente modal */}
          <CriarQueixa getQueixas={getQueixas} handleClose={handleClose} queixas={queixas}></CriarQueixa>
        </Modal>
      </div>

      <div className="div-conteudo">
        {error !== "" && <h4 style={{ color: "red" }}>Erro: {error}</h4>}
        {!loading && queixas !== [] &&
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
                queixas && queixas.map((queixa, idx) => {

                  const userName = usuarios.find((user) => user.id.$oid === queixa.criado_por)
<<<<<<< HEAD
                  return(
                    <tr>
                      <td>{idx+1}</td>
=======
                  return (
                    <tr key={queixa._id.$oid}>
                      <td>{idx + 1}</td>
>>>>>>> a833ef03b9223dbc79235b6558ecdb49925eb640
                      <td>{queixa.titulo}</td>
                      <td>{queixa.descricao}</td>
                      <td>{queixa.tipo}</td>
                      <td>{queixa.gravidade}</td>
                      <td>{queixa.privacidade ? "Sim" : "Não"}</td>
                      <td>{new Date(queixa.created_at).toUTCString()}</td>
                      <td>{userName.nome}</td>
<<<<<<< HEAD
                      <td><Button size="sm" onClick={() => history.push("/queixa/"+queixa._id.$oid)}>Vizualizar</Button></td>
=======

                      <td><Button size="sm" onClick={() => history.push("/queixa/" + queixa._id.$oid)}>Vizualizar</Button></td>
>>>>>>> a833ef03b9223dbc79235b6558ecdb49925eb640
                      <td><Button size="sm">Editar</Button></td>
                      <td><Button size="sm" onClick={() => deleteQueixas(queixa._id)}>Excluir</Button></td>
                    </tr>
                  )

                })
              }
            </tbody>
          </Table>
        }
        {loading && <h1>Carregando...</h1>}
      </div>

    </Container>
  );
};

export default ListarQueixas;
