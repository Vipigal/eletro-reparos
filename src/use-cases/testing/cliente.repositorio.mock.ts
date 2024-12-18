import { Cliente } from "../../dominio/entidades/cliente.entidade";
import { CargoUsuarioEnum } from "../../dominio/interfaces/usuario.interface";
import { UserUtils } from "../../dominio/utils/user.utils";
import { IRepositorioClientes } from "../interfaces/cliente-repositorio.interface";

export class LocalRepositorioClientes implements IRepositorioClientes {
  private clientes: Cliente[] = [];

  async criarMockClientes() {
    const cliente1 = new Cliente({
      id: "1",
      cpf: "123.456.789-00",
      email: "joao@gmail.com",
      endereco: "Rua 1 - SP",
      nome: "Joao",
      telefone: "31984123812",
      senha: UserUtils.generatePassword(),
      cargo: CargoUsuarioEnum.CLIENTE,
    });

    const cliente2 = new Cliente({
      id: "2",
      cpf: "123.456.987-00",
      email: "marcos@gmail.com",
      endereco: "Rua 1 - SP",
      nome: "Marcos",
      telefone: "319841234812",
      senha: UserUtils.generatePassword(),
      cargo: CargoUsuarioEnum.CLIENTE,
    });

    this.clientes.push(cliente1, cliente2);
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    return this.clientes.find((cliente) => cliente.id === id) || null;
  }

  async buscarPorCPF(cpf: string): Promise<Cliente | null> {
    return this.clientes.find((cliente) => cliente.cpf === cpf) || null;
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    return this.clientes.find((cliente) => cliente.email === email) || null;
  }

  async buscarTodos(): Promise<Cliente[]> {
    return this.clientes;
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    const novoCliente = {
      ...cliente,
      id: UserUtils.generateUUID(),
      cargo: CargoUsuarioEnum.CLIENTE,
    };
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  async atualizar(
    id: string,
    dados: Partial<Cliente>
  ): Promise<Cliente | null> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id);
    if (index === -1) return null;

    this.clientes[index] = { ...this.clientes[index], ...dados };
    return this.clientes[index];
  }

  async deletar(id: string): Promise<void> {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
  }
}
