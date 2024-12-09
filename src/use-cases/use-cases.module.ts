import { Module } from "@nestjs/common";
import { SolicitarOrcamentoUseCase } from "./orcamentos/solicitar-orcamento/solicitar-orcamento.use-case";
import { UsuariosUseCase } from "./usuarios/usuarios.use-case";
import { FornecerOrcamentoUseCase } from "./orcamentos/fornecer-orcamento/fornecer-orcamento.use-case";
import { AprovarOrcamentoUseCase } from "./orcamentos/aprovar-orcamento/aprovar-orcamento.use-case";

@Module({
  providers: [
    SolicitarOrcamentoUseCase,
    AprovarOrcamentoUseCase,
    UsuariosUseCase,
    FornecerOrcamentoUseCase,
  ],
  exports: [
    SolicitarOrcamentoUseCase,
    AprovarOrcamentoUseCase,
    UsuariosUseCase,
    FornecerOrcamentoUseCase,
  ],
})
export class UseCaseModule {}
