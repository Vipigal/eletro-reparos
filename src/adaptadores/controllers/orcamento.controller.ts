import { Body, Controller, Post } from "@nestjs/common";
import { Orcamento } from "../../dominio/entidades/orcamento.entidade";
import { AprovarOrcamentoInput } from "../../use-cases/orcamentos/aprovar-orcamento/aprovar-orcamento.input";
import { AprovarOrcamentoUseCase } from "../../use-cases/orcamentos/aprovar-orcamento/aprovar-orcamento.use-case";
import { FornecerOrcamentoInput } from "../../use-cases/orcamentos/fornecer-orcamento/fornecer-orcamento.input";
import { FornecerOrcamentoOutput } from "../../use-cases/orcamentos/fornecer-orcamento/fornecer-orcamento.output";
import { FornecerOrcamentoUseCase } from "../../use-cases/orcamentos/fornecer-orcamento/fornecer-orcamento.use-case";
import type { SolicitarOrcamentoInput } from "../../use-cases/orcamentos/solicitar-orcamento/solicitar-orcamento.input";
import { SolicitarOrcamentoOutput } from "../../use-cases/orcamentos/solicitar-orcamento/solicitar-orcamento.output";
import { SolicitarOrcamentoUseCase } from "../../use-cases/orcamentos/solicitar-orcamento/solicitar-orcamento.use-case";

@Controller("orcamentos")
export class OrcamentoController {
  constructor(
    private readonly solicitarOrcamentoUseCase: SolicitarOrcamentoUseCase,
    private readonly aprovarOrcamentoUseCase: AprovarOrcamentoUseCase,
    private readonly fornecerOrcamentoUseCase: FornecerOrcamentoUseCase
  ) {}

  @Post("solicitar")
  public async solicitarOrcamento(
    @Body() request: SolicitarOrcamentoInput
  ): Promise<SolicitarOrcamentoOutput> {
    return await this.solicitarOrcamentoUseCase.input(request);
  }

  @Post("fornecer")
  public async fornecerOrcamento(
    @Body() request: FornecerOrcamentoInput
  ): Promise<FornecerOrcamentoOutput> {
    return await this.fornecerOrcamentoUseCase.input(request);
  }

  @Post("aprovar")
  public async aprovarOrcamento(
    @Body() request: AprovarOrcamentoInput
  ): Promise<Orcamento> {
    return await this.aprovarOrcamentoUseCase.input(request);
  }
}
