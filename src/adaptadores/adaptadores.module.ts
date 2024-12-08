import { Global, Module } from "@nestjs/common";
import { UseCaseModule } from "../use-cases/use-cases.module";
import { OrcamentoController } from "./controllers/orcamentos/orcamento.controller";
import { RepositorioClientes } from "./repositorios/cliente.repositorio";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsuarioModel } from "./models/usuario.model";

@Global()
@Module({
  imports: [UseCaseModule, SequelizeModule.forFeature([UsuarioModel])],
  controllers: [OrcamentoController],
  providers: [
    {
      provide: "IRepositorioClientes",
      useClass: RepositorioClientes,
    },
  ],
  exports: ["IRepositorioClientes", SequelizeModule],
})
export class AdaptadoresModule {}
