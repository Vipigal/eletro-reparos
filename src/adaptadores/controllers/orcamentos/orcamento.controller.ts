import { Body, Controller, Post } from "@nestjs/common";
import type { SolicitarOrcamentoInput } from "../../../use-cases/solicitar-orcamento/solicitar-orcamento.input";
import { SolicitarOrcamentoOutput } from "../../../use-cases/solicitar-orcamento/solicitar-orcamento.output";
import { SolicitarOrcamentoUseCase } from "../../../use-cases/solicitar-orcamento/solicitar-orcamento.use-case";

@Controller("orcamentos")
export class OrcamentoController {
  constructor(
    private readonly solicitarOrcamentoUseCase: SolicitarOrcamentoUseCase
  ) {}

  @Post()
  public async solicitarOrcamento(
    @Body() request: SolicitarOrcamentoInput
  ): Promise<SolicitarOrcamentoOutput> {
    return await this.solicitarOrcamentoUseCase.input(request);
  }
}
