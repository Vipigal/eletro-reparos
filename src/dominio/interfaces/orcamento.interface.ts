import { StatusOrcamentoEnum } from "../entidades/orcamento.entidade";

export interface IOrcamento {
  id: string;
  aparelhoId: string;
  valorPecas: number;
  valorMaoDeObra: number;
  valorTotal: number;
  status: StatusOrcamentoEnum;
  id_cliente: string;
}
