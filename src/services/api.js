import axios from "axios";

// https://queixas.herokuapp.com/

const api = axios.create({
  // baseURL: `https://queixas.herokuapp.com/`,
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    // "X-Usuario-Email": localStorage.getItem("email") ? localStorage.getItem("email") : "adminjose@admin.com",
    // "X-Usuario-Token": localStorage.getItem("token") ? localStorage.getItem("token") : "DmAscNefsBfCk1bz8oDv"
  },
});

export async function getLoggedUser() {
  const userId = localStorage.getItem("userId");
  if(userId) {
    setAxiosHeadersLocalStorage(localStorage.getItem("userEmail"), localStorage.getItem("userToken"))
    const result = await getApiUsuarios();
    
    const user = result.data.find(element => element.id.$oid === userId);
    const userPerfil = await getPerfilFromUser(user.perfil_id.$oid);
    user.perfil = userPerfil;

    return user;

  }else{
    return null;
  }
}

export async function getPerfilFromUser(userId) {
  const result2 = await getApiPerfils();
  const perfilApi = result2.data.filter((perfil) => perfil._id.$oid === userId)
  return perfilApi[0].tipo
}

//Middleware
export function setAxiosHeadersLocalStorage(email, authentication_token) {
  api.defaults.headers["X-Usuario-Email"] = email;
  api.defaults.headers["X-Usuario-Token"] = authentication_token;
}

export function setAxiosHeaders({email, authentication_token}){
  api.defaults.headers["X-Usuario-Email"] = email;
  api.defaults.headers["X-Usuario-Token"] = authentication_token;
}

//Comentarios
export async function getApiComentarios(queixaId) {
  return await api.get(`/comentarios/find_by_queixa_id/${queixaId}`);
}

//Queixas
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

export async function deleteApiQueixas(queixa) {
  return await api.delete("/queixas/"+queixa.$oid, {
    queixa,
  });
}

export async function editarApiStatusQueixa(status_id, queixa) {
  return await api.put("/queixas/"+queixa._id.$oid, 
  {
    "status_id": status_id,
    "privacidade": queixa.privacidade,
    "descricao": queixa.descricao,
    "titulo": queixa.titulo,
    "gravidade": queixa.gravidade,
    "tipo": queixa.tipo,
    "criado_por": queixa.criado_por
  });
}
export async function getApiQueixasFindByPrivacidade(privacidade) {
    return await api.get(`queixas/find_by_privacidade/${privacidade}`);
}
export async function getApiQueixasFindByStatusId(id) {
    return await api.get(`queixas/find_by_status_id/${id}`);
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

export async function getApiUsuario(usuarioId) {
  return await api.get(`/usuarios/${usuarioId}`);
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