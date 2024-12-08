// src/use-cases/fornecer-orcamento/fornecer-orcamento.use-case.ts
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IRepositorioOrcamento } from "../interfaces/orcamento-repositorio.interface";
import { IRepositorioPecas } from "../interfaces/peca-repositorio.interface";
import { FornecerOrcamentoInput } from "./fornecer-orcamento.input";
import { FornecerOrcamentoOutput } from "./fornecer-orcamento.output";
import {
  MARGEM_DE_LUCRO,
  VALOR_MAO_DE_OBRA_TECNICO_POR_HORA,
} from "../../dominio/constantes/valores";

@Injectable()
export class FornecerOrcamentoUseCase {
  constructor(
    @Inject("IRepositorioOrcamentos")
    private readonly repositorioOrcamentos: IRepositorioOrcamento,
    @Inject("IRepositorioPecas")
    private readonly repositorioPecas: IRepositorioPecas
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
        // Nesse estágio, o gerente forneceu o orçamento, mas quem aprova é o cliente,
        // então "aprovado" continua false.
        aprovado: false,
      }
    );

    if (!orcamentoAtualizado) {
      throw new Error("Não foi possível atualizar o orçamento.");
    }

    // Opcional: Aqui poderíamos notificar o cliente que o orçamento está disponível,
    // mas isso dependeria da arquitetura do projeto (um outro use case ou serviço para notificação).

    return { orcamentoId: orcamentoAtualizado.id, valorTotal };
  }
}
