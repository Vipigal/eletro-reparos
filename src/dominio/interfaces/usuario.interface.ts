export interface IUsuario {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  endereco?: string | null;
  cargo: CargoUsuarioEnum;
}

export enum CargoUsuarioEnum {
  CLIENTE = "cliente",
  TECNICO = "tecnico",
  ADMINISTRADOR = "administrador",
}
