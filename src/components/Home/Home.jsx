import React, { useEffect, useContext, useState } from "react";
import "./Home.css";
import HousePng from "./../../assets/img/house.png"

import {useHistory} from "react-router-dom";

import {loginApiUsuario, setAxiosHeaders, getApiPerfils, getLoggedUser} from "../../services/api";

import { QueixaContext } from '../../store/queixa'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { sendEmail } from "../../services/mailApi";

const Home = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();

  const {user, setUser} = useContext(QueixaContext)

  useEffect(() => {
    if(localStorage.getItem("userId")){
      if(localStorage.getItem("userPerfil") === "admin"){
          history.push("/dashboard-admin")
        }else {
          history.push("/dashboard")
        }
    }
    return () => {};
  }, []);

  const signIn = async (usuario) => {
    try {
      setLoading(true);
      const result = await loginApiUsuario(usuario);

      localStorage.setItem("userId", result.data.data.usuario._id.$oid)
      localStorage.setItem("userEmail", result.data.data.usuario.email)
      localStorage.setItem("userToken", result.data.data.usuario.authentication_token)
      
      setUser(result.data.data.usuario);
      setAxiosHeaders(result.data.data.usuario);

      const result2 = await getApiPerfils();
      const perfilApi = result2.data.filter((perfil) => perfil._id.$oid === result.data.data.usuario.perfil_id.$oid)
      const nomePerfil = perfilApi[0].tipo
      setUser(prevState => ({...prevState, perfil: nomePerfil}));

      localStorage.setItem("userPerfil", nomePerfil)

      console.log("Chegou na parte da rota")
      if(nomePerfil === "admin"){
        history.push("/dashboard-admin")
      }else {
        history.push("/dashboard")
      }

    } catch (error) {
      setErros(prevState => ({...prevState, 
        email: email ? "" : "Email errado",
        senha: password ? "" : "Senha errada"
      }));
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      setErros(prevState => ({...prevState, 
                              email: email ? "" : "Digite seu Email",
                              senha: password ? "" : "Digite sua senha"
                            }));
    }else {
      try {
        let usuario = {email, password};
        signIn(usuario);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSendApiEmail = async () => {
    const mailData = {
      nome: "nuvem hoje",
      email: "nuvem@nuvem.com",
      queixa_id: "nuvem2435r2",
      queixa_descricao: "A melhor nuvem do dai",
      queixa_status: "Nuvens"
    }
    try {
      await sendEmail(mailData.nome, mailData.email, mailData.queixa_id, mailData.queixa_descricao, mailData.queixa_status);
      alert("Email enviado")
    } catch (error) {
      console.log(error);
      alert("Email NAO enviado")
    }
  }

  return (
      <div style={{display: "flex", flex: "100%", width:"60%", margin: "auto", height: "90vh"}}>

      <img src={HousePng} alt="" style={{width: "inherit", opacity: "0.7"}}/>

      <Form style={{margin: "auto"}} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Digite seu email</Form.Label>
          <Form.Control type="email" placeholder="Email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
          {erros.email && 
            <Alert variant="danger" style={{marginTop: "5px", fontSize: "0.8rem", padding: "4px"}}>
              {erros.email}
            </Alert>
            // <div style={{color: "red"}}>{erros.email}</div>
          }
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Digite sua senha</Form.Label>
          <Form.Control type="password" placeholder="Senha..." value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {erros.senha && 
            <Alert variant="danger" style={{marginTop: "5px", fontSize: "0.8rem", padding: "4px"}} >
              {erros.senha}
            </Alert>
          }
        </Form.Group>
        <Button variant="primary" type="submit" >
          Entrar
        </Button>
        
        {loading && <Spinner animation="border" variant="warning"/>}
      </Form>

      <button className="btn btn-info" onClick={handleSendApiEmail}>Clickque me</button>
      </div>
      
  );
};

export default Home;
