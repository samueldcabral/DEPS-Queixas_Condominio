import React, { useState, useEffect, useContext } from "react";
import "./CriarQueixa.css";
import {getApiQueixas, deleteApiQueixas, getApiUsuarios, createApiQueixas} from "../../services/api";
import Queixa from "../../models/Queixa";
import {QueixaContext} from "../../store/queixa";

import {useHistory} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

const CriarQueixa = (props) => {

  const [queixas, setQueixas] = useState([]);
  //Model Queixa
  const [_id, set_Id] = useState("");
  const [titulo, setTitulo] = useState("");
  const [privada, setPrivada] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [gravidade, setGravidade] = useState("");
  const [status_id, setStatus_id] = useState("5fa1bae73ca57304b0fe6f90");
  const [tipo, setTipo] = useState("");
  const [criado_por, setCriado_por] = useState("");
  const [usuarios_ids, setUsuarios_id] = useState([]);

  const [errorTitulo, setErrorTitulo] = useState("");
  const {user} = useContext(QueixaContext);

  const validaDados = (e) => {
    e.preventDefault();
    let passou = true
    const tituloJaExiste = queixas.find((queixa) => queixa.titulo === titulo)
      if (tituloJaExiste){
        passou = false
        setErrorTitulo("Título já cadastrado!")
      }
      if (passou = true)
        createQueixas(props)
    }

  const createQueixas = async ({handleClose, getQueixas}) => {
    handleClose();
    await createApiQueixas(status_id, privada, descricao, titulo, gravidade, tipo, localStorage.getItem("userId"));
    getQueixas();
  }

  useEffect(() => {
    setQueixas(props.queixas)
    return () => {};
  }, []);

  return (
    <>
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
          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={validaDados}>
              Registrar
            </Button>
          </Modal.Footer>
    </>
  );
};

export default CriarQueixa;
