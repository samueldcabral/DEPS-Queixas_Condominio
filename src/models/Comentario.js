export default class Comentario{
  _id = "";
  descricao = "";
  queixa_id = "";
  usuario_id = "";

  constructor(
    descricao,
    queixa_id,
    usuario_id,
    _id,
  ){
    this.descricao = descricao
    this.usuario_id = usuario_id
    this.queixa_id = queixa_id
    this._id = _id;
  }
}