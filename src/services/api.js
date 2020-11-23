import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    // "X-Usuario-Email": localStorage.getItem("email") ? localStorage.getItem("email") : "adminjose@admin.com",
    // "X-Usuario-Token": localStorage.getItem("token") ? localStorage.getItem("token") : "DmAscNefsBfCk1bz8oDv"
  },
});

//Middleware
export function setAxiosHeaders({email, authentication_token}){
  api.defaults.headers["X-Usuario-Email"] = email;
  api.defaults.headers["X-Usuario-Token"] = authentication_token;
}

export async function getApiComentarios(queixaId) {
  return await api.get(`/comentarios/find_by_queixa_id/${queixaId}`);
}

export async function getApiQueixas() {
  return await api.get("/queixas");
}

export async function getApiQueixa(queixaId) {
  return await api.get(`/queixas/${queixaId}`);
}

export async function createApiQueixas(status_id, privada, descricao, titulo, gravidade, tipo, userId) {
  return await api.post("/queixas", 
  {
    "status_id": status_id,
    "privacidade": privada,
    "descricao": descricao,
    "titulo": titulo,
    "gravidade": gravidade,
    "tipo": tipo,
    "criado_por": userId
  });
}

export async function updateApiQueixas(queixa) {
  return await api.put("/queixas/"+queixa.$oid, {
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
//comentarios
export async function createApiComentarios(descricao, queixaId, userId) {
  return await api.post("/comentarios", 
  {
    "descricao": descricao,
    "usuario_id": userId,
    "queixa_id": queixaId
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

export async function getApiUsuario(usuarioId) {
  return await api.get(`/usuarios/${usuarioId}`);
}

//perfils
export async function getApiPerfils() {
  return await api.get("/perfils");
}