// src/use-cases/fornecer-orcamento/fornecer-orcamento.use-case.ts
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IRepositorioOrcamento } from "../../interfaces/orcamento-repositorio.interface";
import { IRepositorioPecas } from "../../interfaces/peca-repositorio.interface";
import { FornecerOrcamentoInput } from "./fornecer-orcamento.input";
import { FornecerOrcamentoOutput } from "./fornecer-orcamento.output";
import {
  MARGEM_DE_LUCRO,
  VALOR_MAO_DE_OBRA_TECNICO_POR_HORA,
} from "../../../dominio/constantes/valores";
import { IEmailService } from "../../interfaces/email-service.interface";
import { IRepositorioClientes } from "../../interfaces/cliente-repositorio.interface";
import { StatusOrcamentoEnum } from "../../../dominio/entidades/orcamento.entidade";

@Injectable()
export class FornecerOrcamentoUseCase {
  constructor(
    @Inject("IRepositorioOrcamentos")
    private readonly repositorioOrcamentos: IRepositorioOrcamento,
    @Inject("IRepositorioPecas")
    private readonly repositorioPecas: IRepositorioPecas,
    @Inject("IRepositorioClientes")
    private readonly repositorioClientes: IRepositorioClientes,
    @Inject("IEmailService")
    private readonly emailService: IEmailService
  ) {}

  public async input(
    input: FornecerOrcamentoInput
  ): Promise<FornecerOrcamentoOutput> {
    const orcamento = await this.repositorioOrcamentos.buscarPorId(
      input.orcamentoId
    );
    if (!orcamento) {
      throw new NotFoundException("Orçamento não encontrado.");
    }

    if (orcamento.id_cliente !== input.clienteId) {
      throw new NotFoundException("Cliente não autorizado.");
    }
    const cliente = await this.repositorioClientes.buscarPorId(input.clienteId);

    if (!cliente) {
      throw new NotFoundException("Cliente não encontrado.");
    }

    let valorPecas = 0;
    for (const item of input.pecasNecessarias) {
      const peca = await this.repositorioPecas.buscarPorId(item.pecaId);
      if (!peca) {
        throw new NotFoundException(
          `Peça com ID ${item.pecaId} não encontrada.`
        );
      }
      valorPecas += peca.preco * item.quantidade;
    }

    const valorMaoDeObra =
      input.tempoEstimadoHoras * VALOR_MAO_DE_OBRA_TECNICO_POR_HORA;

    const valorTotal = (valorPecas + valorMaoDeObra) * (1 + MARGEM_DE_LUCRO);

    const orcamentoAtualizado = await this.repositorioOrcamentos.atualizar(
      input.orcamentoId,
      {
        valorPecas,
        valorMaoDeObra,
        valorTotal,
        status: StatusOrcamentoEnum.FORNECIDO,
      }
    );

    if (!orcamentoAtualizado) {
      throw new Error("Não foi possível atualizar o orçamento.");
    }

    await this.emailService.sendEmail(
      cliente.email,
      "Orçamento disponível",
      "Olá, seu orçamento está disponível. Acesse o sistema para mais detalhes."
    );

    return {
      orcamentoId: orcamentoAtualizado.id,
      valorTotal,
      status: orcamentoAtualizado.status,
    };
  }
}
