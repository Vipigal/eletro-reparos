import { Module } from "@nestjs/common";
import { Cliente } from "./entidades/cliente.entidade";

@Module({
  imports: [],
  providers: [Cliente],
  exports: [Cliente],
})
export class DomainModule {}
