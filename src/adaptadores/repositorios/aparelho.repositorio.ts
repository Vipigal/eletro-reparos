// src/adaptadores/repositorios/aparelho.repositorio.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Aparelho } from "../../dominio/entidades/aparelho.entidade";
import { AparelhoModel } from "../models/aparelho.model";
import { IRepositorioAparelho } from "../../use-cases/interfaces/aparelho-repositorio.interface";
import { uuid } from "../../dominio/types/genericos";

@Injectable()
export class RepositorioAparelhos implements IRepositorioAparelho {
  constructor(
    @InjectModel(AparelhoModel)
    private readonly aparelhoModel: typeof AparelhoModel
  ) {}

  async buscarPorId(id: string): Promise<Aparelho | null> {
    const registro = await this.aparelhoModel.findByPk(id);
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarPorSerial(
    serial: string,
    id_cliente: uuid
  ): Promise<Aparelho | null> {
    const registro = await this.aparelhoModel.findOne({
      where: { serial, id_cliente },
    });
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarTodos(): Promise<Aparelho[]> {
    const registros = await this.aparelhoModel.findAll();
    return registros.map((r) => this.mapToEntity(r));
  }

  async salvar(aparelho: Aparelho): Promise<Aparelho> {
    const model: AparelhoModel = this.mapFromEntity(aparelho);
    const criado = await model.save();
    return this.mapToEntity(criado);
  }

  async atualizar(
    id: string,
    dados: Partial<Aparelho>
  ): Promise<Aparelho | null> {
    const [rows] = await this.aparelhoModel.update(dados, {
      where: { id },
      returning: true,
    });
    if (rows > 0) {
      const atualizado = await this.aparelhoModel.findByPk(id);
      return atualizado ? this.mapToEntity(atualizado) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.aparelhoModel.destroy({ where: { id } });
  }

  private mapToEntity(model: AparelhoModel): Aparelho {
    return new Aparelho(model.toJSON());
  }

  private mapFromEntity(entity: Aparelho): AparelhoModel {
    return AparelhoModel.build(entity);
  }
}
