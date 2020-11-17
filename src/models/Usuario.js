export default class Usuario{
    email = "";
    password = "";
    password_confirmation = "";
    nome = "";
    endereco = "";
    perfil_id = "";
  
    constructor(
        email,
        password,
        password_confirmation,
        nome,
        endereco,
        perfil_id,
    ){
      this.email = email;
      this.password = password
      this.password_confirmation = password_confirmation
      this.nome = nome
      this.endereco = endereco
      this.status_id = status_id;
      this.perfil_id = perfil_id
    }
  }