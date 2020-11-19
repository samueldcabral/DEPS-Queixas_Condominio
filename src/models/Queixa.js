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
    criado_por,
    created_at,
    descricao,
    gravidade,
    privacidade,
    status_id,
    tipo,
    titulo,
    updated_at,
    usuarios_ids,
    _id,
  ){
    this.criado_por = criado_por;
    this._id = _id;
    this.created_at = created_at
    this.descricao = descricao
    this.gravidade = gravidade
    this.privacidade = privacidade
    this.status_id = status_id;
    this.tipo = tipo
    this.titulo = titulo;
    this.updated_at = updated_at;
    this.usuarios_ids = usuarios_ids;
  }
}