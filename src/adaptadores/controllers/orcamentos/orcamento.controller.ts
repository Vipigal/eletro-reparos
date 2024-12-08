import { Body, Controller, Post } from "@nestjs/common";
import { SolicitarOrcamentoUseCase } from "../../../use-cases/solicitar-orcamento/solicitar-orcamento.use-case";
import type { SolicitarOrcamentoInput } from "../../../use-cases/solicitar-orcamento/solicitar-orcamento.input";
import { Cliente } from "../../../dominio/cliente/cliente.entidade";

@Controller("orcamentos")
export class OrcamentoController {
  constructor(
    private readonly solicitarOrcamentoUseCase: SolicitarOrcamentoUseCase
  ) {}

  @Post()
  public async solicitarOrcamento(
    @Body() request: SolicitarOrcamentoInput
  ): Promise<Cliente[]> {
    return await this.solicitarOrcamentoUseCase.input(request);
  }
}
