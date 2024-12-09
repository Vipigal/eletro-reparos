export interface SolicitarOrcamentoInput {
  cpfCliente: string;
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  enderecoCliente?: string;
  tipoAparelho: string;
  marcaAparelho: string;
  modeloAparelho: string;
  serieAparelho: string;
  defeitoAparelho: string;
}
