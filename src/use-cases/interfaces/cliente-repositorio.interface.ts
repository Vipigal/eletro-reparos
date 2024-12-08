import { Cliente } from "../../dominio/entidades/cliente.entidade";

export interface IRepositorioClientes {
  buscarPorId(id: string): Promise<Cliente | null>;
  buscarPorEmail(email: string): Promise<Cliente | null>;
  buscarPorCPF(cpf: string): Promise<Cliente | null>;
  buscarTodos(): Promise<Cliente[]>;
  salvar(cliente: Partial<Cliente>): Promise<Cliente>;
  deletar(id: string): Promise<void>;
}
