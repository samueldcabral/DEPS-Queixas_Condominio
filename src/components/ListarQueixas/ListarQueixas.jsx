import React, { useState, useEffect, useContext } from "react";
import "./ListarQueixas.css";
import { QueixaContext } from "../../store/queixa";

import { useHistory } from "react-router-dom";

import { getApiQueixas, deleteApiQueixas, getApiUsuarios, createApiQueixas, getApiQueixasFindByPrivacidade, getApiQueixasFindByStatusId } from "../../services/api";
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
  const [resultado_filtro, setResultadoFiltro] = useState("");

  //Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [errorTitulo, setErrorTitulo] = useState("");

  const getDadosApi = async () => {
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
          privacidade, descricao, titulo, gravidade, tipo, criado_por } = element;

        return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
          privacidade, descricao, titulo, gravidade, tipo, criado_por);
      })
      setQueixas(resultArr2);

      getUsuarios();
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }

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

  const setQueixasPorFiltro = (resultadoFiltroArr) => {
    let resultArr = resultadoFiltroArr.data.map((element) => {
      let { _id, created_at, updated_at, usuarios_ids, status_id,
        privacidade, descricao, titulo, gravidade, tipo, criado_por } = element;

      return new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
        privacidade, descricao, titulo, gravidade, tipo, criado_por);
    })
    setQueixas(resultArr);
  }

  function checkStatus(filter) {
    const status = {
      publicas: () => getApiQueixasFindByPrivacidade(false),
      privadas: () => getApiQueixasFindByPrivacidade(true),
      aprovacao: () => getApiQueixasFindByStatusId("5fa1bae73ca57304b0fe6f90"),
      abertas: () => getApiQueixasFindByStatusId("5fa1ba373ca57304b0fe6f8c"),
      fechadas: () => getApiQueixasFindByStatusId("5fa1ba423ca57304b0fe6f8e"),
      espera: () => getApiQueixasFindByStatusId("5fbd59043ca5732d6c6370ae"),
      exclusao: () => getApiQueixasFindByStatusId("5fbd58d23ca5732d6c6370ac")
    };
  
    return status[filter]();
  }

  const getQueixas = async (filtro) => {
    try {
      setError("");
      setLoading(true);

      if (!filtro) return setQueixasPorFiltro(await getApiQueixas());

      return setQueixasPorFiltro(await checkStatus(filtro));

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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", margin: "auto" }}>
        <Button variant="primary" onClick={handleShow} className="mt-3 mr-4">
          Registrar nova denúncia
        </Button>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Filtrar por Privacidade</Form.Label>
              <Form.Control as="select" onChange={(e) => getQueixas(e.target.value)}>
                <option value="">Escolha a opção</option>
                <option value="privadas">Privadas</option>
                <option value="publicas">Públicas</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Filtrar por Status</Form.Label>
              <Form.Control as="select" onChange={(e) => getQueixas(e.target.value)}>
                <option value="">Escolha a opção</option>
                <option value="aprovacao">Pendente para Aprovação</option>
                <option value="abertas">Abertas</option>
                <option value="fechadas">Fechadas</option>
                <option value="espera">Em Espera</option>
                <option value="exclusao">Pendente parar Exclusão</option>
            </Form.Control>
          </Form.Group>
        </Form>
        </div>

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
                <th>Status</th>
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
                  return (
                    <tr key={queixa._id.$oid}>
                      <td>{idx + 1}</td>
                      <td>{queixa.titulo}</td>
                      <td>{queixa.descricao}</td>
                      <td>{queixa.tipo}</td>
                      <td>{queixa.gravidade}</td>
                      <td>{queixa.privacidade ? "Sim" : "Não"}</td>
                      <td>{queixa.status_id.$oid == '5fa1ba373ca57304b0fe6f8c' ? 'Aberta' 
                      : queixa.status_id.$oid == '5fa1ba423ca57304b0fe6f8e' ? 'Fechada' 
                      : queixa.status_id.$oid == '5fa1bae73ca57304b0fe6f90' ? 'Pendente para aprovação' 
                      : queixa.status_id.$oid == '5fbd58d23ca5732d6c6370ac' ? 'Pendente para exclusão' 
                      : queixa.status_id.$oid == '5fbd59043ca5732d6c6370ae' ? 'Em espera' 
                      : 'Status inválido'}</td>
                      <td>{new Date(queixa.created_at).toUTCString()}</td>
                      <td>{userName.nome}</td>
                      <td><Button size="sm" onClick={() => history.push("/queixa/"+queixa._id.$oid)}>Vizualizar</Button></td>
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
