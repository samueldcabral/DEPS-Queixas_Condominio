import Usuario from "./Usuario";

export default class Comentario{
  id = "";
  descricao = "";
  queixa_id = "";
  usuario_id = "";
  usuario = null;
  

  constructor(
    descricao,
    queixa_id,
    usuario_id,
    id,
    nome
  ){
    this.usuario = new Usuario("","","","",nome,"","","","","")
    this.descricao = descricao
    this.usuario_id = usuario_id
    this.queixa_id = queixa_id
    this.id = id;
  }
}