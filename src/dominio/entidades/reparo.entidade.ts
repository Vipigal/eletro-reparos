import { uuid } from "../types/genericos";

export class Reparo {
  public readonly id!: uuid;
  public readonly id_aparelho!: uuid;
  public readonly descricao!: string;
  public readonly data!: Date;

  constructor(entity: Partial<Reparo>) {
    Object.assign(this, entity);
  }
}
