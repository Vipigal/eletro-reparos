import { Module } from "@nestjs/common";
import { SolicitarOrcamentoUseCase } from "./solicitar-orcamento/solicitar-orcamento.use-case";
import { UsuariosUseCase } from "./usuarios/usuarios.use-case";

@Module({
  providers: [SolicitarOrcamentoUseCase, UsuariosUseCase],
  exports: [SolicitarOrcamentoUseCase, UsuariosUseCase],
})
export class UseCaseModule {}
