// src/adaptadores/repositorios/orcamento.repositorio.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { IRepositorioOrcamento } from "../../use-cases/interfaces/orcamento-repositorio.interface";
import { Orcamento } from "../../dominio/entidades/orcamento.entidade";
import { OrcamentoModel } from "../models/orcamento.model";

@Injectable()
export class RepositorioOrcamentos implements IRepositorioOrcamento {
  constructor(
    @InjectModel(OrcamentoModel)
    private readonly orcamentoModel: typeof OrcamentoModel
  ) {}

  async buscarPorId(id: string): Promise<Orcamento | null> {
    const registro = await this.orcamentoModel.findByPk(id);
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarTodos(): Promise<Orcamento[]> {
    const registros = await this.orcamentoModel.findAll();
    return registros.map((r) => this.mapToEntity(r));
  }

  async salvar(orcamento: Orcamento): Promise<Orcamento> {
    const model: OrcamentoModel = this.mapFromEntity(orcamento);

    const criado = await model.save();
    return this.mapToEntity(criado);
  }

  async atualizar(
    id: string,
    dados: Partial<Orcamento>
  ): Promise<Orcamento | null> {
    const [rows] = await this.orcamentoModel.update(dados, {
      where: { id },
      returning: true,
    });
    if (rows > 0) {
      const atualizado = await this.orcamentoModel.findByPk(id);
      return atualizado ? this.mapToEntity(atualizado) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.orcamentoModel.destroy({ where: { id } });
  }

  private mapToEntity(model: OrcamentoModel): Orcamento {
    return new Orcamento(model.toJSON());
  }

  private mapFromEntity(entity: Orcamento): OrcamentoModel {
    return OrcamentoModel.build(entity);
  }
}
