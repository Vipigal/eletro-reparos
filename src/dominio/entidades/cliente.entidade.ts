import { CargoUsuarioEnum, IUsuario } from "../interfaces/usuario.interface";
import { uuid } from "../types/genericos";

export class Cliente implements IUsuario {
  public readonly id: uuid;
  public readonly nome: string;
  public readonly cpf: string;
  public readonly email: string;
  public readonly telefone: string;
  public readonly senha: string;
  public endereco: string | null = null;
  public readonly cargo: CargoUsuarioEnum = CargoUsuarioEnum.CLIENTE;

  constructor(entity: Partial<Cliente>) {
    Object.assign(this, entity);
  }
}
