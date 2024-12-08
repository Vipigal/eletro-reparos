import { Peca } from "../../dominio/entidades/peca.entidade";
import { UserUtils } from "../../dominio/utils/user.utils";
import { IRepositorioPecas } from "../interfaces/peca-repositorio.interface";

export class LocalRepositorioPecas implements IRepositorioPecas {
  private pecas: Peca[] = [];

  async criarMockPecas() {
    const peca1 = new Peca({
      id: "1",
      nome: "Peca 1",
      categoria: "Categoria 1",
      preco: 100,
      codigo: "123",
      peso: 10,
      tamanho: "10x10",
    });

    const peca2 = new Peca({
      id: "2",
      nome: "Peca 2",
      categoria: "Categoria 2",
      preco: 200,
      codigo: "456",
      peso: 10,
      tamanho: "20x10",
    });

    this.pecas.push(peca1, peca2);
  }

  async buscarPorId(id: string) {
    return this.pecas.find((peca) => peca.id === id) || null;
  }

  async buscarTodos() {
    return this.pecas;
  }

  async buscarPorCategoria(categoria: string): Promise<Peca | null> {
    return this.pecas.find((peca) => peca.categoria === categoria) || null;
  }

  async buscarPorNome(nome: string): Promise<Peca | null> {
    return this.pecas.find((peca) => peca.nome === nome) || null;
  }

  async salvar(peca: any) {
    const novaPeca = { ...peca, id: UserUtils.generateUUID() };
    this.pecas.push(novaPeca);
    return novaPeca;
  }

  async atualizar(id: string, dados: Partial<any>) {
    const index = this.pecas.findIndex((peca) => peca.id === id);
    if (index === -1) return null;

    this.pecas[index] = { ...this.pecas[index], ...dados };
    return this.pecas[index];
  }

  async deletar(id: string) {
    this.pecas = this.pecas.filter((peca) => peca.id !== id);
  }
}
