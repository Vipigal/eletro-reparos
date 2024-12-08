import { Aparelho } from "../../dominio/entidades/aparelho.entidade";
import { uuid } from "../../dominio/types/genericos";
import { UserUtils } from "../../dominio/utils/user.utils";
import { IRepositorioAparelho } from "../interfaces/aparelho-repositorio.interface";

export class LocalRepositorioAparelhos implements IRepositorioAparelho {
  private aparelhos: Aparelho[] = [];

  async buscarPorId(id: string) {
    return this.aparelhos.find((aparelho) => aparelho.id === id) || null;
  }

  async buscarPorSerial(serial: string, id_cliente: uuid) {
    return (
      this.aparelhos.find(
        (aparelho) =>
          aparelho.serial === serial && aparelho.id_cliente === id_cliente
      ) || null
    );
  }

  async buscarTodos() {
    return this.aparelhos;
  }

  async salvar(aparelho: Aparelho) {
    const novoAparelho = { ...aparelho, id: UserUtils.generateUUID() };
    this.aparelhos.push(novoAparelho);
    return novoAparelho;
  }

  async atualizar(id: uuid, dados: Partial<Aparelho>) {
    const index = this.aparelhos.findIndex((aparelho) => aparelho.id === id);
    if (index === -1) return null;

    this.aparelhos[index] = { ...this.aparelhos[index], ...dados };
    return this.aparelhos[index];
  }

  async deletar(id: uuid) {
    this.aparelhos = this.aparelhos.filter((aparelho) => aparelho.id !== id);
  }
}
