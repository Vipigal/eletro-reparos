import { Tecnico } from "../../dominio/entidades/tecnico.entidade";

export interface IRepositorioTecnicos {
  buscarPorId(id: string): Promise<Tecnico | null>;
  buscarPorEmail(email: string): Promise<Tecnico | null>;
  buscarPorCPF(cpf: string): Promise<Tecnico | null>;
  buscarTodos(): Promise<Tecnico[]>;
  salvar(tecnico: Partial<Tecnico>): Promise<Tecnico>;
  deletar(id: string): Promise<void>;
}
