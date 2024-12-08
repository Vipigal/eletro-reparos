import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsuarioModel } from "../../adaptadores/models/usuario.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: getOrThrow("POSTGRES_HOST"),
      port: parseInt(getOrThrow("POSTGRES_PORT"), 10),
      username: getOrThrow("POSTGRES_USER"),
      password: getOrThrow("POSTGRES_PASSWORD"),
      database: getOrThrow("POSTGRES_DB"),
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      models: [UsuarioModel],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}

function getOrThrow(env: string): string {
  const value = process.env[env];
  if (!value) {
    throw new Error(`Missing environment variable ${env}`);
  }
  return value;
}
