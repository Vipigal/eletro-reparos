import { uuid } from "../types/genericos";

export class Orcamento {
  public readonly id!: uuid;
  public readonly id_aparelho!: uuid;
  public readonly valor!: number;
  public readonly descricao!: string;
  public readonly data!: Date;

  constructor(entity: Partial<Orcamento>) {
    Object.assign(this, entity);
  }
}
