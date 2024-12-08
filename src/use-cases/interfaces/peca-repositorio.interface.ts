import { Peca } from "../../dominio/entidades/peca.entidade";

export interface IRepositorioPecas {
  buscarPorId(id: string): Promise<Peca | null>;
  buscarPorNome(nome: string): Promise<Peca | null>;
  buscarPorCategoria(categoria: string): Promise<Peca | null>;
  buscarTodos(): Promise<Peca[]>;
  salvar(peca: Partial<Peca>): Promise<Peca>;
  deletar(id: string): Promise<void>;
}
