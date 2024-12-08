import { InjectModel } from "@nestjs/sequelize";
import { IRepositorioPecas } from "../../use-cases/interfaces/peca-repositorio.interface";
import { PecaModel } from "../models/peca.model";
import { Peca } from "../../dominio/entidades/peca.entidade";

export class RepositorioPecas implements IRepositorioPecas {
  constructor(
    @InjectModel(PecaModel)
    private readonly pecaModel: typeof PecaModel
  ) {}

  async buscarPorId(id: string): Promise<Peca | null> {
    const registro = await this.pecaModel.findByPk(id);
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarPorCategoria(categoria: string): Promise<Peca | null> {
    const registro = await this.pecaModel.findOne({ where: { categoria } });
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarPorNome(nome: string): Promise<Peca | null> {
    const registro = await this.pecaModel.findOne({ where: { nome } });
    return registro ? this.mapToEntity(registro) : null;
  }

  async buscarTodos(): Promise<Peca[]> {
    const registros = await this.pecaModel.findAll();
    return registros.map((r) => this.mapToEntity(r));
  }

  async salvar(peca: Peca): Promise<Peca> {
    const model: PecaModel = this.mapFromEntity(peca);

    const criado = await model.save();
    return this.mapToEntity(criado);
  }

  async atualizar(id: string, dados: Partial<Peca>): Promise<Peca | null> {
    const [rows] = await this.pecaModel.update(dados, {
      where: { id },
      returning: true,
    });
    if (rows > 0) {
      const atualizado = await this.pecaModel.findByPk(id);
      return atualizado ? this.mapToEntity(atualizado) : null;
    }
    return null;
  }

  async deletar(id: string): Promise<void> {
    await this.pecaModel.destroy({ where: { id } });
  }

  private mapToEntity(model: PecaModel): Peca {
    return new Peca(model.toJSON());
  }

  private mapFromEntity(entity: Peca): PecaModel {
    return PecaModel.build(entity);
  }
}
