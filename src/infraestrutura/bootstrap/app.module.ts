import { Module } from "@nestjs/common";
import { AdaptadoresModule } from "../../adaptadores/adaptadores.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../database/database.module";
import { UseCaseModule } from "../../use-cases/use-cases.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    UseCaseModule,
    AdaptadoresModule,
    DatabaseModule,
  ],
})
export class AppModule {}
