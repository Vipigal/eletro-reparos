import { Aparelho } from "../../dominio/entidades/aparelho.entidade";
import { uuid } from "../../dominio/types/genericos";

export interface IRepositorioAparelho {
  buscarPorId(id: string): Promise<Aparelho | null>;
  buscarPorSerial(serial: string, id_cliente: uuid): Promise<Aparelho | null>;
  buscarTodos(): Promise<Aparelho[]>;
  salvar(aparelho: Aparelho): Promise<Aparelho>;
  atualizar(id: string, dados: Partial<Aparelho>): Promise<Aparelho | null>;
  deletar(id: string): Promise<void>;
}
