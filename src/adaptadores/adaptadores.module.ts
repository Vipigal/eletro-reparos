import { Global, Module, Provider } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UseCaseModule } from "../use-cases/use-cases.module";
import { OrcamentoController } from "./controllers/orcamento.controller";
import { UsuariosController } from "./controllers/usuarios.controller";
import { models } from "./models/models";
import { repositoryProviders } from "./repositorios/repository.providers";
import { serviceProviders } from "./services/service.providers";

@Global()
@Module({
  imports: [UseCaseModule, SequelizeModule.forFeature(models)],
  controllers: [OrcamentoController, UsuariosController],
  providers: [
    ...(repositoryProviders as Provider[]),
    ...(serviceProviders as Provider[]),
  ],
  exports: [
    ...repositoryProviders.map((r) => r.provide),
    ...serviceProviders.map((s) => s.provide),
    SequelizeModule,
  ],
})
export class AdaptadoresModule {}
