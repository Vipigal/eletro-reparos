import { IPeca } from "../interfaces/peca.interface";
import { uuid } from "../types/genericos";

export class Peca implements IPeca {
  public readonly id!: uuid;
  public readonly nome!: string;
  public readonly codigo!: string;
  public readonly categoria!: string;
  public readonly fabricante!: string;
  public readonly tamanho!: string;
  public readonly peso!: number;
  public readonly preco!: number;

  constructor(entity: Partial<IPeca>) {
    Object.assign(this, entity);
  }
}
