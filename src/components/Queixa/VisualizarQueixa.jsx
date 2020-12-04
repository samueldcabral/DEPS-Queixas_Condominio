import React, { useState, useEffect, useCallback, useContext } from "react";
import "./VisualizarQueixa.css";

import { getApiQueixa, getApiComentarios, getApiUsuarios, createApiComentarios, editarApiStatusQueixa } from "../../services/api";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Usuario from "../../models/Usuario";
import Queixa from "../../models/Queixa";
import Comentario from "../../models/Comentario";
import { useParams } from "react-router-dom"
import { QueixaContext } from "../../store/queixa";
// import {useHistory} from "react-router-dom";

const VisualizarQueixa = () => {
  // const [state, setState] = useState("");
  // const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const { queixaId } = useParams();
  const [queixa, setQueixa] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [novoComentario, setNovoComentario] = useState("");
  const [status_id, setStatus_id] = useState("");
  const { user } = useContext(QueixaContext);


  const getQueixa = useCallback(async () => {
      const result = await getApiQueixa(queixaId);

      const { criado_por, created_at, descricao, gravidade, privacidade, status_id,
        tipo, titulo, updated_at, usuarios_ids, _id } = result.data;

      const queixaCriada = new Queixa(_id, created_at, updated_at, usuarios_ids, status_id,
        privacidade, descricao, titulo, gravidade, tipo, criado_por);

      setQueixa(queixaCriada);
  }, [queixaId])

  const getComentarios = useCallback(async () => {
    let result = await getApiComentarios(queixaId);

    let resultArr = result.data.map((element) => {
      let { descricao, usuario_id, queixa_id, id } = element;
      let { nome } = element.usuario
      return new Comentario(descricao, usuario_id, queixa_id, id, nome);
    })

    setComentarios(resultArr);
  }, [queixaId])

  const createComentarios = async () => {
    if (novoComentario !== "") {
      await createApiComentarios(novoComentario, queixaId, user.id.$oid);
      getComentarios();
      setNovoComentario("")
    }
  }

  const getUsuarios = useCallback(async () => {
    let result = await getApiUsuarios();

    let usuarioArr = result.data.map((element) => {
      let { id, email, nome, endereco, perfil_id } = element;

      return new Usuario(id, email, "", "", nome, endereco, perfil_id, "", "", "");
    })

    setUsuarios(usuarioArr);
  }, [])

  const filtrarUsuarioPorQueixa = (queixa) => {
    const queixaUserName = usuarios.find((user) => user.id.$oid === queixa.criado_por)
    if (!queixaUserName)
      return (<Card.Subtitle className="mb-2 text-muted">Usuario nao encontrado</Card.Subtitle>)

    return (
      <Card.Subtitle className="mb-2 text-muted">Criado por: {queixaUserName.nome}</Card.Subtitle>
    )
  }

  const editarStatusQueixa = async () => {
    if (status_id !== "") {
      await editarApiStatusQueixa(status_id, queixa);
      getQueixa();
      alert('Status da queixa alterado')
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
  
      await getUsuarios();
      await getQueixa();
      await getComentarios();
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
    })()

    return () => { };
  }, [getQueixa, getUsuarios, getComentarios]);

  // const handleSubmit = (e) => {
  //   history.push("/Dashboard");
  // }

  return (
    <Container fluid>
      {error !== "" && <h4 style={{ color: "red" }}>Erro: {error}</h4>}
      {!loading && queixa !== null &&
        <div style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "90vh" }}>
          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", minHeight: "30vh" }}>
            <Card.Body style={{ display: "flex", flex: "100%", flexWrap: "wrap", justifyContent: "space-between"}}>
              <div>
              <Card.Title><h1>{queixa.titulo}</h1></Card.Title>
              {
                filtrarUsuarioPorQueixa(queixa)
              }
              <Card.Text style={{ display: "flex", flex: "100%", flexWrap: "wrap", flexDirection: "column", margin: "auto"}}>
                <span>Tipo: {queixa.tipo}</span>
                <span>Gravidade: {queixa.gravidade}</span>
                <span>Descrição: <b>{queixa.descricao}</b></span>
                <span>Status ID: <b>{queixa.status_id.$oid}</b></span>
              </Card.Text>
              </div>
              {localStorage.getItem("userPerfil") === "admin" &&
              <div>
                <Form>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Status</Form.Label>
                      <Form.Control as="select" onChange={(e) => {setStatus_id(e.target.value)}}>
                        <option value="">Escolha a opção</option>
                        <option value="5fa1ba373ca57304b0fe6f8c">Aberto</option>
                        <option value="5fa1ba423ca57304b0fe6f8e">Fechado</option>
                        <option value="5fbd59043ca5732d6c6370ae">Em espera</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                  <Button variant="primary" onClick={editarStatusQueixa}>Alterar Status</Button>
              </div>
              }
            </Card.Body>
          </Card>

          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto" }}>
            <Card.Body>
              <Card.Title>Comentários</Card.Title>
              <Card.Text>
                {
                  comentarios && comentarios.map((comentario) => {
                    return (
                      <Card key={comentario.id.$oid}>
                        <Card.Body>
                          <Card.Subtitle className="mb-2 text-muted">Criado por: {comentario.usuario.nome}</Card.Subtitle>
                          <Card.Title>{comentario.descricao}</Card.Title>
                          <Card.Link href="#">Responder</Card.Link>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group>
                        <Form.Control style={{minHeight: "150px"}}
                         as="textarea" aria-label="Novo comentário" placeholder="Novo comentário" value={novoComentario} onChange={(e) => setNovoComentario(e.target.value)}/>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                  <Button variant="primary" onClick={createComentarios}>Comentar</Button>
                </Card>
              </Card.Text>
            </Card.Body>
          </Card>

        </div>
      }
      { loading && <h1>Carregando...</h1>}
    </Container>
  );
};

export default VisualizarQueixa;