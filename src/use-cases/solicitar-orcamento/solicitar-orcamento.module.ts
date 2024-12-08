import { Module } from "@nestjs/common";
import { SolicitarOrcamentoUseCase } from "./solicitar-orcamento.use-case";

@Module({
  imports: [],
  providers: [SolicitarOrcamentoUseCase],
  exports: [SolicitarOrcamentoUseCase],
})
export class SolicitarOrcamentoModule {}
