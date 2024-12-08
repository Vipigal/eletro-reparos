import { Global, Module, Provider } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UseCaseModule } from "../use-cases/use-cases.module";
import { OrcamentoController } from "./controllers/orcamentos/orcamento.controller";
import { UsuariosController } from "./controllers/usuarios/usuarios.controller";
import { models } from "./models/models";
import { repositoryProviders } from "./repositorios/repository.providers";

@Global()
@Module({
  imports: [UseCaseModule, SequelizeModule.forFeature(models)],
  controllers: [OrcamentoController, UsuariosController],
  providers: repositoryProviders as Provider[],
  exports: [...repositoryProviders.map((r) => r.provide), SequelizeModule],
})
export class AdaptadoresModule {}
