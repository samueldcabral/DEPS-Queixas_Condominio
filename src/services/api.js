import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    "X-Usuario-Email":"joaozinho@teste.com",
    "X-Usuario-Token":"y94S-wkLUZy59-QW-x1G"
  },
});

//exemplos de funcoes pra api
export async function getApiQueixas() {
  return await api.get("/queixas");
}

export async function getApiQueixa(queixaId) {
  return await api.get(`/queixas/${queixaId}`);
}

export async function createApiQueixas(queixa) {
  return await api.post("queixas", {
    queixa,
  });
}
