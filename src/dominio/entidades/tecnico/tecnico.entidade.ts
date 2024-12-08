import { CargoUsuarioEnum, IUsuario } from "../../interfaces/usuario.interface";
import { uuid } from "../../types/genericos";

export class Tecnico implements IUsuario {
  public readonly id: uuid;
  public readonly nome: string;
  public readonly cpf: string;
  public readonly email: string;
  public readonly telefone: string;
  public readonly senha: string;
  public readonly cargo: CargoUsuarioEnum = CargoUsuarioEnum.TECNICO;

  constructor(entity: Partial<Tecnico>) {
    Object.assign(this, entity);
  }
}
