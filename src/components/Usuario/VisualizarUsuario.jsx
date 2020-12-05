import React, { useState, useEffect, useCallback, useContext } from "react";
import "./VisualizarUsuario.css";
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { useHistory } from "react-router-dom";

import { getApiUsuario } from "../../services/api";
import { useParams } from "react-router-dom";

const VisualizarUsuario = () => {
  //Model Usuário
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [perfil, setPerfil] = useState("");
  const [queixas, setQueixas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const history = useHistory();

  const { usuarioId } = useParams();

  const getUsuario = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

    const result = await getApiUsuario(usuarioId);

    const { id, email, nome, endereco, queixas, perfil } = result.data;
    setId(id)
    setEmail(email)
    setNome(nome)
    setEndereco(endereco)
    setQueixas(queixas)
    setPerfil(perfil)

  } catch (erro) {
    setError("Algo deu errado");
  } finally {
    setLoading(false);
  }

  }, [usuarioId])

console.log(loading)
console.dir(queixas)
  useEffect(() => {
      getUsuario();
    return () => { };
  }, [getUsuario]);

  return (
    <Container fluid>
      {error !== "" && <h4 style={{ color: "red" }}>Erro: {error}</h4>}
      {!loading && id !== undefined &&
        <div style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "90vh" }}>
          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", minHeight: "30vh" }}>
            <Card.Body style={{ display: "flex", flex: "100%", flexWrap: "wrap", justifyContent: "space-between"}}>
              <div>
              <Card.Text style={{ display: "flex", flex: "100%", flexWrap: "wrap", flexDirection: "column", margin: "auto"}}>
                <span><h1>Nome: {nome}</h1></span>
                <span>Email: <b>{email}</b></span>
                <span>Endereço: <b>{endereco}</b></span>
                <span>perfil: <b>{perfil.tipo}</b></span>
              </Card.Text>
              </div>
            </Card.Body>
          </Card>
          <h3>Queixas de {nome}</h3>
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
                <th>Abrir</th>
              </tr>
            </thead>
            <tbody>
              {
                queixas && queixas.map((queixa, idx) => {

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
                      <td><Button size="sm" onClick={() => history.push("/queixa/"+queixa._id.$oid)}>Vizualizar</Button></td>
                    </tr>
                  )

                })
              }
            </tbody>
          </Table>
        </div>
      }
      { loading && <h1>Carregando...</h1>}
    </Container>
  )
}

export default VisualizarUsuario;