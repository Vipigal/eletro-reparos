import { Global, Module, Provider } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UseCaseModule } from "../use-cases/use-cases.module";
import { OrcamentoController } from "./controllers/orcamentos/orcamento.controller";
import { UsuariosController } from "./controllers/usuarios/usuarios.controller";
import { AparelhoModel } from "./models/aparelho.model";
import { OrcamentoModel } from "./models/orcamento.model";
import { PecaModel } from "./models/peca.model";
import { PedidoModel } from "./models/pedido.model";
import { ReparoModel } from "./models/reparo.model";
import { UsuarioModel } from "./models/usuario.model";
import { repositoryProviders } from "./repositorios/repository.providers";

@Global()
@Module({
  imports: [
    UseCaseModule,
    SequelizeModule.forFeature([
      UsuarioModel,
      AparelhoModel,
      OrcamentoModel,
      PedidoModel,
      PecaModel,
      ReparoModel,
    ]),
  ],
  controllers: [OrcamentoController, UsuariosController],
  providers: repositoryProviders as Provider[],
  exports: [...repositoryProviders.map((r) => r.provide), SequelizeModule],
})
export class AdaptadoresModule {}
