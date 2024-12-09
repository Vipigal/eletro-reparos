import { IOrcamento } from "../interfaces/orcamento.interface";
import { uuid } from "../types/genericos";

export class Orcamento implements IOrcamento {
  public readonly id!: uuid;
  public readonly aparelhoId!: uuid;
  public readonly valorPecas!: number;
  public readonly valorMaoDeObra!: number;
  public readonly valorTotal!: number;
  public readonly status!: StatusOrcamentoEnum;
  public readonly id_cliente!: uuid;

  constructor(entity: Partial<IOrcamento>) {
    Object.assign(this, entity);
  }
}

export enum StatusOrcamentoEnum {
  APROVADO = "APROVADO",
  REPROVADO = "REPROVADO",
  SOLICITADO = "SOLICITADO",
  FORNECIDO = "FORNECIDO",
}
