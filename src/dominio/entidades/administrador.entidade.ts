import { CargoUsuarioEnum, IUsuario } from "../interfaces/usuario.interface";

export class Administrador implements IUsuario {
  public readonly id: string;
  public readonly nome: string;
  public readonly cpf: string;
  public readonly email: string;
  public readonly telefone: string;
  public readonly senha: string;
  public readonly cargo: CargoUsuarioEnum = CargoUsuarioEnum.ADMINISTRADOR;

  constructor(entity: Partial<Administrador>) {
    Object.assign(this, entity);
  }
}
