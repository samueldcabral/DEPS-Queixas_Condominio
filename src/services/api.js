import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    "X-Usuario-Email":"adminjose@admin.com",
    "X-Usuario-Token":"DmAscNefsBfCk1bz8oDv"
  },
});

//exemplos de funcoes pra api
export async function getApiQueixas() {
  return await api.get("/queixas");
}

export async function createApiQueixas(queixa) {
  return await api.post("/queixas", {
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

export async function deleteApiUsuarios(usuario) {
  return await api.delete("/usuarios/"+usuario.$oid, {
    usuario,
  });
}
