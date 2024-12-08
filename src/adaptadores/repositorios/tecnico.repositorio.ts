import { InjectModel } from "@nestjs/sequelize";
import { IRepositorioTecnicos } from "../../use-cases/interfaces/tecnico-repositorio.interface";
import { Tecnico } from "../../dominio/entidades/tecnico.entidade";
import { CargoUsuarioEnum } from "../../dominio/interfaces/usuario.interface";
import { UserUtils } from "../../dominio/utils/user.utils";
import { Injectable } from "@nestjs/common";
import { UsuarioModel } from "../models/usuario.model";

@Injectable()
export class RepositorioTecnicos implements IRepositorioTecnicos {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel
  ) {}

  async buscarPorId(id: string): Promise<Tecnico | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { id, cargo: CargoUsuarioEnum.TECNICO },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorEmail(email: string): Promise<Tecnico | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { email, cargo: CargoUsuarioEnum.TECNICO },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorCPF(cpf: string): Promise<Tecnico | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { cpf, cargo: CargoUsuarioEnum.TECNICO },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarTodos(): Promise<Tecnico[]> {
    const usuarios = await this.usuarioModel.findAll({
      where: { cargo: CargoUsuarioEnum.TECNICO },
    });
    return usuarios.map((usuario: UsuarioModel) => this.mapToEntity(usuario));
  }

  async salvar(Tecnico: Tecnico): Promise<Tecnico> {
    const model: UsuarioModel = this.mapFromEntity(Tecnico);
    await model.save();
    return this.mapToEntity(model);
  }

  async atualizar(
    id: string,
    Tecnico: Partial<Tecnico>
  ): Promise<Tecnico | null> {
    const [rows] = await this.usuarioModel.update(Tecnico, {
      where: { id, cargo: CargoUsuarioEnum.TECNICO },
      returning: true,
    });
    if (rows > 0) {
      const updated = await this.usuarioModel.findOne({
        where: { id, cargo: CargoUsuarioEnum.TECNICO },
      });
      return updated ? this.mapToEntity(updated) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.usuarioModel.destroy({
      where: { id, cargo: CargoUsuarioEnum.TECNICO },
    });
  }

  private mapToEntity(model: UsuarioModel): Tecnico {
    return new Tecnico(model.toJSON());
  }

  private mapFromEntity(entity: Tecnico): UsuarioModel {
    return UsuarioModel.build({
      ...entity,
      cargo: CargoUsuarioEnum.TECNICO,
      senha: UserUtils.generatePassword(),
    });
  }
}
