import axios from "axios";

const mailApi = axios.create({
  baseURL: `https://mail-redis-backend.herokuapp.com/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
  },
});

export async function sendEmail(nome, email, queixa_id, queixa_descricao, queixa_status) {
  return await mailApi.post("/mail", 
  {
    "nome": nome,
    "email": email,
    "queixa_id": queixa_id,
    "queixa_descricao":queixa_descricao,
    "queixa_status":queixa_status
  });
}
