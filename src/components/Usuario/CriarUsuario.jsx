import React, { useState, useEffect} from "react";
import "./CriarUsuario.css";
import {createApiUsuarios} from "../../services/api";
import Usuario from "../../models/Usuario";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CriarUsuario = (props) => {
    const [usuarios, setUsuarios] = useState([]);

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

    const validaDados = (e) => {
        let status = true;
        const emailExiste = usuarios.find((usuario) => usuario.email === email)
        if (emailExiste){
            let status = false;
            setErrorEmail("E-mail já cadastrado!")
        }else if(password !== password_confirmation){
            setErrorPassword("As senhas estão diferentes!")
        }else if (password === password_confirmation && status == true){
            createUsuarios(props)
        }
      }

    const createUsuarios = async ({handleClose, getUsuarios}) => {
        handleClose()
        let user = new Usuario(id, email, password, password_confirmation, 
            nome, endereco, perfil_id, queixa_ids, created_at, updated_at);
        await createApiUsuarios(user);
        getUsuarios();
    }

    useEffect(() => {
        setUsuarios(props.usuarios)
        return () => {};
      }, []);


    return (
        <>
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
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={validaDados}>
                    Registrar
                </Button>
            </Modal.Footer>
        </>
    )
};

export default CriarUsuario;