import { Orcamento } from "../../dominio/entidades/orcamento.entidade";

export interface IRepositorioOrcamento {
  buscarPorId(id: string): Promise<Orcamento | null>;
  buscarTodos(): Promise<Orcamento[]>;
  salvar(orcamento: Orcamento): Promise<Orcamento>;
  atualizar(id: string, dados: Partial<Orcamento>): Promise<Orcamento | null>;
  deletar(id: string): Promise<void>;
}
