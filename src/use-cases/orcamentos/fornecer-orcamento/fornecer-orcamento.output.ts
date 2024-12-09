import { StatusOrcamentoEnum } from "../../../dominio/entidades/orcamento.entidade";

export interface FornecerOrcamentoOutput {
  orcamentoId: string;
  valorTotal: number;
  status: StatusOrcamentoEnum;
}
