import { Module } from "@nestjs/common";
import { Cliente } from "./entidades/cliente/cliente.entidade";

@Module({
  imports: [],
  providers: [Cliente],
  exports: [Cliente],
})
export class DomainModule {}
