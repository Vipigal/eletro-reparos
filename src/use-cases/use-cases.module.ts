import { Module } from "@nestjs/common";
import { SolicitarOrcamentoModule } from "./solicitar-orcamento/solicitar-orcamento.module";

@Module({
  imports: [SolicitarOrcamentoModule],
  exports: [SolicitarOrcamentoModule],
})
export class UseCaseModule {}
