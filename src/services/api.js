import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:7000/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
  },
});

//exemplos de funcoes pra api
export async function getApiQueixas() {
  return await api.get("/queixas");
}

export async function createApiQueixas(queixa) {
  return await api.post("queixas", {
    queixa,
  });
}
