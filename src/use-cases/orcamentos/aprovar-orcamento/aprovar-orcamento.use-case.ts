// src/use-cases/fornecer-orcamento/fornecer-orcamento.use-case.ts
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  Orcamento,
  StatusOrcamentoEnum,
} from "../../../dominio/entidades/orcamento.entidade";
import { IRepositorioOrcamento } from "../../interfaces/orcamento-repositorio.interface";
import { AprovarOrcamentoInput } from "./aprovar-orcamento.input";

@Injectable()
export class AprovarOrcamentoUseCase {
  constructor(
    @Inject("IRepositorioOrcamentos")
    private readonly repositorioOrcamentos: IRepositorioOrcamento
  ) {}

  public async input(input: AprovarOrcamentoInput): Promise<Orcamento> {
    const orcamento = await this.repositorioOrcamentos.buscarPorId(
      input.orcamentoId
    );
    if (!orcamento) {
      throw new NotFoundException("Orçamento não encontrado.");
    }

    if (orcamento.id_cliente !== input.clienteId) {
      throw new Error("Cliente não autorizado a aprovar este orçamento.");
    }

    if (
      orcamento.valorTotal <= 0 ||
      orcamento.status !== StatusOrcamentoEnum.FORNECIDO
    ) {
      throw new Error(
        "Não é possível autorizar um orçamento que ainda não foi fornecido."
      );
    }

    const orcamentoAtualizado = await this.repositorioOrcamentos.atualizar(
      input.orcamentoId,
      {
        status: input.aprovado
          ? StatusOrcamentoEnum.APROVADO
          : StatusOrcamentoEnum.REPROVADO,
      }
    );

    if (!orcamentoAtualizado) {
      throw new Error("Não foi possível atualizar o orçamento.");
    }

    return orcamentoAtualizado;
  }
}
