export interface IReparo {
  id: string;
  orcamentoId: string;
  tecnicoId: string;
  status: string; // e.g. "Em andamento", "Concluído"
  descricao: string;
  dataInicio: Date;
  dataFimPrevista?: Date | null;
  dataFimReal?: Date | null;
}
