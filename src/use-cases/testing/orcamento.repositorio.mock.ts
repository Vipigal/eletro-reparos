import { UUIDV4 } from "sequelize";
import { Orcamento } from "../../dominio/entidades/orcamento.entidade";
import { uuid } from "../../dominio/types/genericos";
import { IRepositorioOrcamento } from "../interfaces/orcamento-repositorio.interface";
import { UserUtils } from "../../dominio/utils/user.utils";

export class LocalRepositorioOrcamentos implements IRepositorioOrcamento {
  private orcamentos: Orcamento[] = [];

  async criarMockOrcamentos() {
    const orcamento1 = new Orcamento({
      id: "1",
      aparelhoId: "1",
      valorPecas: 100,
      valorMaoDeObra: 50,
      valorTotal: 150,
      aprovado: false,
      id_cliente: "1",
    });

    const orcamento2 = new Orcamento({
      id: "2",
      aparelhoId: "2",
      valorPecas: 200,
      valorMaoDeObra: 100,
      valorTotal: 300,
      aprovado: false,
      id_cliente: "2",
    });

    this.orcamentos.push(orcamento1, orcamento2);
  }

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
