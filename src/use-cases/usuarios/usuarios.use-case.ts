import { Inject, Injectable } from "@nestjs/common";
import { IRepositorioClientes } from "../interfaces/cliente-repositorio.interface";
import { UsuariosInput } from "./usuarios.input";

@Injectable()
export class UsuariosUseCase {
  public constructor(
    @Inject("IRepositorioClientes")
    private readonly repositorioClientes: IRepositorioClientes
  ) {}

  async criarUsuario(input: UsuariosInput) {
    return await this.repositorioClientes.salvar({ ...input });
  }

  async buscarUsuarios() {
    return await this.repositorioClientes.buscarTodos();
  }
}
