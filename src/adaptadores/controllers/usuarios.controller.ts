import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosInput } from "../../use-cases/usuarios/usuarios.input";
import { UsuariosUseCase } from "../../use-cases/usuarios/usuarios.use-case";

@Controller("usuarios")
export class UsuariosController {
  public constructor(private readonly usuariosUseCase: UsuariosUseCase) {}

  @Post()
  async criarUsuario(@Body() request: UsuariosInput) {
    return await this.usuariosUseCase.criarUsuario(request);
  }

  @Get()
  async buscarUsuarios() {
    return this.usuariosUseCase.buscarUsuarios();
  }
}
