import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cliente } from "../../dominio/entidades/cliente.entidade";
import { CargoUsuarioEnum } from "../../dominio/interfaces/usuario.interface";
import { UserUtils } from "../../dominio/utils/user.utils";
import { IRepositorioAdministradores } from "../../use-cases/interfaces/administrador-repositorio.interface";
import { UsuarioModel } from "../models/usuario.model";
import { Administrador } from "../../dominio/entidades/administrador.entidade";

@Injectable()
export class RepositorioAdministradores implements IRepositorioAdministradores {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel
  ) {}

  async buscarPorId(id: string): Promise<Administrador | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { id, cargo: CargoUsuarioEnum.ADMINISTRADOR },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorEmail(email: string): Promise<Administrador | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { email, cargo: CargoUsuarioEnum.ADMINISTRADOR },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorCPF(cpf: string): Promise<Administrador | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { cpf, cargo: CargoUsuarioEnum.ADMINISTRADOR },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarTodos(): Promise<Administrador[]> {
    const usuarios = await this.usuarioModel.findAll({
      where: { cargo: CargoUsuarioEnum.ADMINISTRADOR },
    });
    return usuarios.map((usuario: UsuarioModel) => this.mapToEntity(usuario));
  }

  async salvar(administrador: Administrador): Promise<Administrador> {
    const model: UsuarioModel = this.mapFromEntity(administrador);
    await model.save();
    return this.mapToEntity(model);
  }

  async atualizar(
    id: string,
    administrador: Partial<Administrador>
  ): Promise<Administrador | null> {
    const [rows] = await this.usuarioModel.update(administrador, {
      where: { id, cargo: CargoUsuarioEnum.ADMINISTRADOR },
      returning: true,
    });
    if (rows > 0) {
      const updated = await this.usuarioModel.findOne({
        where: { id, cargo: CargoUsuarioEnum.ADMINISTRADOR },
      });
      return updated ? this.mapToEntity(updated) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.usuarioModel.destroy({
      where: { id, cargo: CargoUsuarioEnum.ADMINISTRADOR },
    });
  }

  private mapToEntity(model: UsuarioModel): Administrador {
    return new Administrador(model.toJSON());
  }

  private mapFromEntity(entity: Administrador): UsuarioModel {
    return UsuarioModel.build({
      ...entity,
      cargo: CargoUsuarioEnum.ADMINISTRADOR,
      senha: UserUtils.generatePassword(),
    });
  }
}
