import { IFornecedor } from "../interfaces/fornecedor.interface";

export class Fornecedor implements IFornecedor {
  public readonly id!: string;
  public readonly nome!: string;
  public readonly cnpj!: string;
  public readonly contato!: string;
  public readonly endereco!: string;

  constructor(entity: Partial<IFornecedor>) {
    Object.assign(this, entity);
  }
}
