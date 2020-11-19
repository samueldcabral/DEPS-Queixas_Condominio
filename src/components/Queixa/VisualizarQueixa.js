import React, { useState, useEffect, useCallback } from "react";
import "./VisualizarQueixa.css";

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

import { getApiQueixa } from "../../services/api";
import Queixa from "../../models/Queixa";
import { useParams } from "react-router-dom"
// import {useHistory} from "react-router-dom";

const VisualizarQueixa = () => {
  // const [state, setState] = useState("");
  // const history = useHistory();

  const { queixaId } = useParams();
  const [queixa, setQueixa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQueixa = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      
      const result = await getApiQueixa(queixaId);

      const { criado_por, created_at, descricao, gravidade, privacidade, status_id,
        tipo, titulo, updated_at, usuarios_ids, _id } = result.data;

      const queixa = new Queixa(criado_por, created_at, descricao, gravidade, privacidade, status_id,
        tipo, titulo, updated_at, usuarios_ids, _id);

      setQueixa(queixa);
    } catch (error) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  }, [queixaId])

  useEffect(() => {
    getQueixa();
    return () => { };
  }, [getQueixa]);

  // const handleSubmit = (e) => {
  //   history.push("/Dashboard");
  // }

  return (
    <Container fluid>
      {error !== "" && <h4 style={{color: "red"}}>Erro: {error}</h4>}
      {!loading && queixa !== null &&
        <div style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "90vh" }}>
          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "50vh" }}>
            <Card.Body>
              <Card.Title>{queixa.titulo}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
          </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

          <Card style={{ display: "flex", flex: "100%", flexWrap: "wrap", width: "80%", margin: "auto", height: "40vh" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
          </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

        </div>
        } 
        { loading && <h1>Carregando...</h1> }
    </Container>
  );
};

export default VisualizarQueixa;