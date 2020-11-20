import React, { useState, useEffect, useContext } from 'react'
import Queixa from '../../models/Queixa';

import {getApiQueixas, setAxiosHeaders} from "../../services/api";
import {QueixaContext} from "../../store/queixa";

const Teste = () => {
  const [queixas, setQueixas] = useState([{titulo: "Nao encontrou queixa"}, {titulo: "Nao mesmo"}]);
  const [erro, setErro]= useState("")
  const {user} = useContext(QueixaContext);
console.log(user)
  const getQueixas = async () => {
    try {
      let result = await getApiQueixas();

    let resultArr = result.data.map((element) => {
      let {criado_por, created_at, descricao, gravidade, privacidade, status_id, 
        tipo, titulo, updated_at, usuarios_ids, _id} = element;
      
      return new Queixa(criado_por, created_at, descricao, gravidade, privacidade, status_id, 
          tipo, titulo, updated_at, usuarios_ids, _id);
    })

    setQueixas(resultArr);
    
    } catch (error) {
      console.log("Deu ruim")
      console.log(error)
      setErro("KKKKKKKKeKKKK")
    }
  }

  useEffect(() => {
    setAxiosHeaders(user);
    getQueixas()
  
  }, [])

  return (
    <div>
      {queixas && queixas.map((queixa) => <div>{queixa.titulo}</div>)}
      {erro && <div>{erro}</div>}
    </div>
  )
}

export default Teste;