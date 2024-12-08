import { InjectModel } from "@nestjs/sequelize";
import { IRepositorioClientes } from "../../use-cases/interfaces/cliente-repositorio.interface";
import { Cliente } from "../../dominio/cliente/cliente.entidade";
import { CargoUsuarioEnum } from "../../dominio/interfaces/usuario.interface";
import { UserUtils } from "../../dominio/utils/user.utils";
import { Injectable } from "@nestjs/common";
import { UsuarioModel } from "../models/usuario.model";

@Injectable()
export class RepositorioClientes implements IRepositorioClientes {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel
  ) {}

  async buscarPorId(id: string): Promise<Cliente | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { id, cargo: CargoUsuarioEnum.CLIENTE },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { email, cargo: CargoUsuarioEnum.CLIENTE },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarPorCPF(cpf: string): Promise<Cliente | null> {
    const usuario = await this.usuarioModel.findOne({
      where: { cpf, cargo: CargoUsuarioEnum.CLIENTE },
    });
    return usuario ? this.mapToEntity(usuario) : null;
  }

  async buscarTodos(): Promise<Cliente[]> {
    const usuarios = await this.usuarioModel.findAll({
      where: { cargo: CargoUsuarioEnum.CLIENTE },
    });
    return usuarios.map((usuario: UsuarioModel) => this.mapToEntity(usuario));
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    const model: UsuarioModel = this.mapFromEntity(cliente);
    await model.save();
    return this.mapToEntity(model);
  }

  async atualizar(
    id: string,
    cliente: Partial<Cliente>
  ): Promise<Cliente | null> {
    const [rows] = await this.usuarioModel.update(cliente, {
      where: { id, cargo: CargoUsuarioEnum.CLIENTE },
      returning: true,
    });
    if (rows > 0) {
      const updated = await this.usuarioModel.findOne({
        where: { id, cargo: CargoUsuarioEnum.CLIENTE },
      });
      return updated ? this.mapToEntity(updated) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.usuarioModel.destroy({
      where: { id, cargo: CargoUsuarioEnum.CLIENTE },
    });
  }

  private mapToEntity(model: UsuarioModel): Cliente {
    return new Cliente(model.toJSON());
  }

  private mapFromEntity(entity: Cliente): UsuarioModel {
    return UsuarioModel.build({
      ...entity,
      cargo: CargoUsuarioEnum.CLIENTE,
      senha: UserUtils.generatePassword(),
    });
  }
}
