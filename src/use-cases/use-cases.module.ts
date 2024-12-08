import { Module } from "@nestjs/common";
import { SolicitarOrcamentoUseCase } from "./solicitar-orcamento/solicitar-orcamento.use-case";
import { UsuariosUseCase } from "./usuarios/usuarios.use-case";
import { FornecerOrcamentoUseCase } from "./fornecer-orcamento/fornecer-orcamento.use-case";

@Module({
  providers: [
    SolicitarOrcamentoUseCase,
    UsuariosUseCase,
    FornecerOrcamentoUseCase,
  ],
  exports: [
    SolicitarOrcamentoUseCase,
    UsuariosUseCase,
    FornecerOrcamentoUseCase,
  ],
})
export class UseCaseModule {}
