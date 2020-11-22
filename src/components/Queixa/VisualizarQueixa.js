import React, { useState, useEffect, useCallback } from "react";
import "./VisualizarQueixa.css";

import { getApiQueixa, getApiComentarios, getApiUsuarios } from "../../services/api";
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card";
import Usuario from "../../models/Usuario";
import Queixa from "../../models/Queixa";
import Comentario from "../../models/Comentario";
import { useParams } from "react-router-dom"
// import {useHistory} from "react-router-dom";

const VisualizarQueixa = () => {
  // const [state, setState] = useState("");
  // const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const { queixaId } = useParams();
  const [queixa, setQueixa] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [comentariosUsuario, setComentariosUsuario] = useState({});
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

  const getComentarios = useCallback(async () => {
    let result = await getApiComentarios(queixaId);
    
    let resultArr = result.data.map((element) => {
      let { descricao, usuario_id, queixa_id, id } = element;
      let { nome } = element.usuario
      // console.log(nome)
      return new Comentario(descricao, usuario_id, queixa_id, id, nome);
    })

    setComentarios(resultArr);
  },[queixaId])

  console.dir(comentarios)

  const getUsuarios = useCallback(async () => {
    let result = await getApiUsuarios();

    let usuarioArr = result.data.map((element) => {
      let { id, email, nome, endereco, perfil_id } = element;

      return new Usuario(id, email, "", "", nome, endereco, perfil_id, "", "", "");
    })

    setUsuarios(usuarioArr);
  },[])

  const filtrarUsuarioPorQueixa = (queixa) => {
    const queixaUserName = usuarios.find((user) => user.id.$oid === queixa.criado_por)
    if (!queixaUserName)
      return (<Card.Subtitle className="mb-2 text-muted">Usuario nao encontrado</Card.Subtitle>)

    return (
      <Card.Subtitle className="mb-2 text-muted">Criado por: {queixaUserName.nome}</Card.Subtitle>
    )
  }

  useEffect(() => {
    (async () => {
      await getUsuarios();
      await getQueixa();
      await getComentarios();
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
          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "50vh" }}>
            <Card.Body>
              <Card.Title><h1>{queixa.titulo}</h1></Card.Title>
              {
                filtrarUsuarioPorQueixa(queixa)
              }
              <Card.Text style={{ display: "flex", flex: "100%", flexDirection: "column" }}>
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