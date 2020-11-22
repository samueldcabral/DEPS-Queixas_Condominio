import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    // "X-Usuario-Email": localStorage.getItem("email") ? localStorage.getItem("email") : "4adminjose@admin.com",
    // "X-Usuario-Token": localStorage.getItem("token") ? localStorage.getItem("token") : "4DmAscNefsBfCk1bz8oDv"
  },
});

//Middleware
export function setAxiosHeaders({email, authentication_token}){
  api.defaults.headers["X-Usuario-Email"] = email;
  api.defaults.headers["X-Usuario-Token"] = authentication_token;
}

//exemplos de funcoes pra api
export async function getApiQueixas() {
  return await api.get("/queixas");
}

export async function getApiQueixa(queixaId) {
  return await api.get(`/queixas/${queixaId}`);
}

export async function createApiQueixas(queixa) {
  return await api.post("/queixas", {
    queixa,
  });
}

export async function updateApiQueixas(queixa) {
  return await api.put("/queixas/"+queixa.$oid, {
    queixa,
  });
}

export async function deleteApiQueixas(queixa) {
  return await api.delete("/queixas/"+queixa.$oid, {
    queixa,
  });
}


//Usuarios
export async function getApiUsuarios() {
  return await api.get("/usuarios");
}

export async function createApiUsuarios(usuario) {
  return await api.post("/sign_up", {
    usuario,
  });
}

export async function loginApiUsuario(usuario) {
  return await api.post("/sign_in", {
    usuario
  })
}

export async function updateApiUsuarios(usuario) {
  return await api.put("/usuarios/"+usuario.$oid, {
    usuario,
  });
}

export async function deleteApiUsuarios(usuario) {
  return await api.delete("/usuarios/"+usuario.$oid, {
    usuario,
  });
}

//perfils
export async function getApiPerfils() {
  return await api.get("/perfils");
}