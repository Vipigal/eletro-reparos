import { Administrador } from "../../dominio/entidades/administrador.entidade";

export interface IRepositorioAdministradores {
  buscarPorId(id: string): Promise<Administrador | null>;
  buscarPorEmail(email: string): Promise<Administrador | null>;
  buscarPorCPF(cpf: string): Promise<Administrador | null>;
  buscarTodos(): Promise<Administrador[]>;
  salvar(administrador: Partial<Administrador>): Promise<Administrador>;
  deletar(id: string): Promise<void>;
}
