export default class Usuario{
    id = "";
    email = "";
    password = "";
    password_confirmation = "";
    nome = "";
    endereco = "";
    perfil_id = "";
    queixa_ids = [];
    created_at = "";
    updated_at = "";
  
    constructor(
        id,
        email,
        password = "",
        password_confirmation = "",
        nome,
        endereco,
        perfil_id,
        queixa_ids,
        created_at,
        updated_at

    ){
      this.id = id;
      this.email = email;
      this.password = password;
      this.password_confirmation = password_confirmation;
      this.nome = nome;
      this.endereco = endereco;
      this.perfil_id = perfil_id;
      this.queixa_ids = queixa_ids;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }