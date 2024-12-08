import { Module } from "@nestjs/common";
import { Cliente } from "./cliente/cliente.entidade";

@Module({
  imports: [],
  providers: [Cliente],
  exports: [Cliente],
})
export class DomainModule {}
