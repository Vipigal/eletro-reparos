import { Aparelho } from "../../dominio/entidades/aparelho/aparelho.entidade";

export interface IRepositorioAparelho {
  buscarPorId(id: string): Promise<Aparelho | null>;
  buscarTodos(): Promise<Aparelho[]>;
  salvar(aparelho: Aparelho): Promise<Aparelho>;
  atualizar(id: string, dados: Partial<Aparelho>): Promise<Aparelho | null>;
  deletar(id: string): Promise<void>;
}
