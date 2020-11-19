import React, { useState, useEffect, useCallback } from "react";
import "./VisualizarQueixa.css";

import { getApiQueixa, getApiComentarios } from "../../services/api";
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Queixa from "../../models/Queixa";
import Comentario from "../../models/Comentario";
import { useParams } from "react-router-dom"
// import {useHistory} from "react-router-dom";

const VisualizarQueixa = () => {
  // const [state, setState] = useState("");
  // const history = useHistory();

  const { queixaId } = useParams();
  const [queixa, setQueixa] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQueixa = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const result = await getApiQueixa(queixaId);

      const { criado_por, created_at, descricao, gravidade, privacidade, status_id,
        tipo, titulo, updated_at, usuarios_ids, _id } = result.data;

      const queixaCriada = new Queixa(criado_por, created_at, descricao, gravidade, privacidade, status_id,
        tipo, titulo, updated_at, usuarios_ids, _id);

      setQueixa(queixaCriada);
    } catch (erro) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }, [queixaId])

  const getComentarios = async () => {
    let result = await getApiComentarios(queixaId);

    let resultArr = result.data.map((element) => {
      let { descricao, usuario_id, queixa_id, _id } = element;

      return new Comentario(descricao, usuario_id, queixa_id, _id);
    })

    setComentarios(resultArr);
  }

  useEffect(() => {
    getQueixa();
    getComentarios();
    return () => { };
  }, [getQueixa]);

  // const handleSubmit = (e) => {
  //   history.push("/Dashboard");
  // }

  return (
    <Container fluid>
      {error !== "" && <h4 style={{ color: "red" }}>Erro: {error}</h4>}
      {!loading && queixa !== null &&
        <div style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "90vh" }}>
          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "50vh" }}>
            <Card.Body>
              <Card.Title><h1>{queixa.titulo}</h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Criado por: {queixa.criado_por}</Card.Subtitle>
              <Card.Text style={{display: "flex", flex: "100%", flexDirection: "column"}}>
                <span>Tipo: {queixa.tipo}</span>
                <span>Gravidade: {queixa.gravidade}</span>
                <span>Descrição: <b>{queixa.descricao}</b></span>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto" }}>
            <Card.Body>
              <Card.Title>Comentários</Card.Title>
              <Card.Text>
                {comentarios && comentarios.map((comentario, idx) => {
                  console.log(comentario)
                  return (
                    <Card>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{comentario.usuario_id.$oid}</Card.Subtitle>
                        <Card.Title>{comentario.descricao}</Card.Title>
                        <Card.Link href="#">Responder</Card.Link>
                      </Card.Body>
                    </Card>
                  )
                })}
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