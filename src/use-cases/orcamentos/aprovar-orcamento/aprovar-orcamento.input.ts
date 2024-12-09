import { uuid } from "../../../dominio/types/genericos";

export interface AprovarOrcamentoInput {
  clienteId: uuid;
  orcamentoId: uuid;
  aprovado: boolean;
}
