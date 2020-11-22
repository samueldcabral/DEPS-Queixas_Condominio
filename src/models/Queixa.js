export default class Queixa{
  _id = "";
  criado_por = "";
  tipo = "";
  gravidade = "";
  titulo = [];
  descricao = "";
  privacidade = "";
  usuarios = [];
  comentarios = [];
  arquivos = [];
  privacidade = false;
  status_id = "";
  created_at = "";
  criado_por = "";

  constructor(
    _id,
    created_at,
    updated_at,
    usuarios_ids,
    status_id,
    privacidade,
    descricao,
    titulo,
    gravidade,
    tipo,
    criado_por,
  ){
    this._id = _id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.usuarios_ids = usuarios_ids;
    this.status_id = status_id;
    this.privacidade = privacidade;
    this.descricao = descricao;
    this.titulo = titulo;
    this.gravidade = gravidade;
    this.tipo = tipo;
    this.criado_por = criado_por;
  }
}