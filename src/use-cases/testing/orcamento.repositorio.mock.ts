import { UUIDV4 } from "sequelize";
import { Orcamento } from "../../dominio/entidades/orcamento.entidade";
import { uuid } from "../../dominio/types/genericos";
import { IRepositorioOrcamento } from "../interfaces/orcamento-repositorio.interface";
import { UserUtils } from "../../dominio/utils/user.utils";

export class LocalRepositorioOrcamentos implements IRepositorioOrcamento {
  private orcamentos: Orcamento[] = [];

  async buscarPorId(id: uuid) {
    return this.orcamentos.find((orcamento) => orcamento.id === id) || null;
  }

  async buscarTodos() {
    return this.orcamentos;
  }

  async salvar(orcamento: Orcamento) {
    const novoOrcamento = { ...orcamento, id: UserUtils.generateUUID() };
    this.orcamentos.push(novoOrcamento);
    return novoOrcamento;
  }

  async atualizar(id: uuid, dados: Partial<Orcamento>) {
    const index = this.orcamentos.findIndex((orcamento) => orcamento.id === id);
    if (index === -1) return null;

    this.orcamentos[index] = { ...this.orcamentos[index], ...dados };
    return this.orcamentos[index];
  }

  async deletar(id: uuid) {
    this.orcamentos = this.orcamentos.filter(
      (orcamento) => orcamento.id !== id
    );
  }
}
