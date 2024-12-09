import { uuid } from "../../../dominio/types/genericos";

// src/use-cases/fornecer-orcamento/fornecer-orcamento.input.ts
export interface FornecerOrcamentoPecaInput {
  pecaId: uuid;
  quantidade: number;
}

export interface FornecerOrcamentoInput {
  orcamentoId: uuid;
  clienteId: uuid;
  pecasNecessarias: FornecerOrcamentoPecaInput[];
  tempoEstimadoHoras: number;
}
