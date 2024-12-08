import { Inject, Injectable } from "@nestjs/common";
import { SolicitarOrcamentoInput } from "./solicitar-orcamento.input";
import type { IRepositorioClientes } from "../interfaces/cliente-repositorio.interface";
import { Cliente } from "../../dominio/cliente/cliente.entidade";

@Injectable()
export class SolicitarOrcamentoUseCase {
  public constructor(
    @Inject("IRepositorioClientes")
    private readonly repositorioClientes: IRepositorioClientes
  ) {}

  public async input(input: SolicitarOrcamentoInput): Promise<Cliente[]> {
    console.log(input);
    return await this.repositorioClientes.buscarTodos();
  }
}
