// src/use-cases/fornecer-orcamento/fornecer-orcamento.input.ts
export interface FornecerOrcamentoPecaInput {
  pecaId: string;
  quantidade: number;
}

export interface FornecerOrcamentoInput {
  orcamentoId: string;
  pecasNecessarias: FornecerOrcamentoPecaInput[];
  tempoEstimadoHoras: number;
}
